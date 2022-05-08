import { mount, shallow } from "enzyme";
import React from "react";
import { DateFacet } from "../../search/facets/components/DateFacet";
import { DateFacetHeuristicChart } from "../../search/facets/components/DateFacetHeuristicChart";
import Search from "../../search/Search";
import {
  createMockRequest,
  createMockRequestFailure,
  mockIndex,
} from "../mock/mockResources";
import SearchBar from "../../search/searchBar/SearchBar";
import { mockDocumentAttributeValue, mockQueryFacetResult } from "../mock/mock";
import { AvailableFacetManager } from "../../search/facets/AvailableFacetManager";
import { sleep } from "../testUtils";
import { StringFacet } from "../../search/facets/components/StringFacet";
import { FacetCheckbox } from "../../search/facets/components/FacetCheckbox";
import { facetConfiguration } from "../../search/configuration";
import Pagination from "../../search/pagination/Pagination";

describe("A <Search />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders mock correctly", () => {
    const component = shallow(<Search indexId={""} />);

    expect(component).toMatchSnapshot();
  });

  it("renders linked correctly", () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
    };

    const component = mount(
      <Search kendra={mockKendra} indexId={"mock-index-id"} />
    );

    expect(component.find(SearchBar).exists()).toBeTruthy();
  });

  it("submits query correctly", () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const component = mount(
      <Search kendra={mockKendra} indexId={"mock-index-id"} />
    );

    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);

    expect(mockKendra.query).toHaveBeenLastCalledWith({
      IndexId: "mock-index-id",
      QueryText: "test",
      PageNumber: 1,
      AttributeFilter: undefined,
    });
  });

  it("submits string value query correctly", async () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const component = mount(
      <Search kendra={mockKendra} indexId={"mock-index-id"} />
    );

    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);

    // Ensure dataReady updates correctly
    expect(component.state("dataReady")).toBeFalsy();
    await sleep(0); // yield
    expect(component.state("dataReady")).toBeTruthy();

    // Ensure avilable facets updated correctly
    expect(component.state("availableFacets")).toEqual(
      AvailableFacetManager.fromQueryResult(mockQueryFacetResult)
    );

    component.update();

    // Open facet section
    component.setState({ facetsOpen: true });
    expect(component.find(StringFacet).exists()).toBeTruthy();

    // Find one facet checkbox
    const mockStringValue2Checkbox = component
      .findWhere(
        (node) =>
          node.is(FacetCheckbox) &&
          node.prop("attributeName") === "mockStringAttribute" &&
          node.prop("valueLabel") === "mockStringValue2"
      )
      .instance() as FacetCheckbox;

    // Check the checkbox
    expect(mockStringValue2Checkbox.props.selected).toBeFalsy();
    mockStringValue2Checkbox.handleChange();

    // Ensure did re-submit correct query
    expect(mockKendra.query).toHaveBeenLastCalledWith({
      IndexId: "mock-index-id",
      QueryText: "test",
      PageNumber: 1,
      AttributeFilter: {
        AndAllFilters: [
          {
            OrAllFilters: [
              {
                EqualsTo: {
                  Key: "mockStringAttribute",
                  Value: { StringValue: "mockStringValue2" },
                },
              },
            ],
          },
        ],
      },
    });

    component.update();

    // Uncheck the checkbox
    expect(mockStringValue2Checkbox.props.selected).toBeTruthy();
    mockStringValue2Checkbox.handleChange();

    // Ensure did re-submit correct query
    expect(mockKendra.query).toHaveBeenLastCalledWith({
      IndexId: "mock-index-id",
      QueryText: "test",
      PageNumber: 1,
      AttributeFilter: undefined,
    });
  });

  it("submits date value query correctly", async () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const component = mount(
      <Search kendra={mockKendra} indexId={"mock-index-id"} />
    );

    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);
    await sleep(0); // yield

    // Ensure avilable facets updated correctly
    expect(component.state("availableFacets")).toEqual(
      AvailableFacetManager.fromQueryResult(mockQueryFacetResult)
    );

    // Force re-render
    component.update();

    // Open facet section
    component.setState({ facetsOpen: true });
    expect(component.find(DateFacet).exists()).toBeTruthy();

    // Find one date facet
    const mockDateFacetComponent = component.findWhere(
      (node) =>
        node.is(DateFacet) && node.prop("attributeName") === "mockDateAttribute"
    );
    const mockDateFacetHeuristic = mockDateFacetComponent
      .find<DateFacetHeuristicChart>(DateFacetHeuristicChart)
      .instance();

    // Validate heuristic chart
    const mockDateFacet = mockDateFacetComponent.instance() as DateFacet;
    expect(mockDateFacetHeuristic.props.displaySelectionRange).toEqual([
      2019,
      2020,
    ]);
    expect(mockDateFacetHeuristic.props.fullRange).toEqual([2019, 2020]);
    expect(mockDateFacetHeuristic.props.availableDateFacet).toEqual({
      minYear: 2019,
      maxYear: 2020,
      yearHeuristic: {
        2019: 20,
        2020: 10,
      },
    });

    // Update slider (exclusive)
    mockDateFacet.handleChange([2019, 2020]);
    expect(mockDateFacetHeuristic.props.displaySelectionRange).toEqual([
      2020,
      2020,
    ]);
    expect(mockDateFacetHeuristic.props.fullRange).toEqual([2019, 2020]);

    mockDateFacet.applyChangedRangeFilter();
    
    // Ensure updated selection correctly
    expect(mockDateFacet.props.selections?.min.format()).toEqual("2019-12-31T23:59:59Z");
    expect(mockDateFacet.props.selections?.max.format()).toEqual("2020-12-31T23:59:59Z");
    expect(mockDateFacetHeuristic.props.displaySelectionRange).toEqual([
      2020,
      2020,
    ]);
    expect(mockDateFacetHeuristic.props.fullRange).toEqual([2019, 2020]);

    // Ensure did re-submit correct query
    expect(mockKendra.query).toHaveBeenLastCalledWith({
      IndexId: "mock-index-id",
      QueryText: "test",
      PageNumber: 1,
      AttributeFilter: {
        AndAllFilters: [
          {
            AndAllFilters: [
              {
                GreaterThanOrEquals: {
                  Key: "mockDateAttribute",
                  Value: { DateValue: new Date("2019-12-31T23:59:59.000Z") },
                },
              },
              {
                LessThanOrEquals: {
                  Key: "mockDateAttribute",
                  Value: {
                    DateValue: new Date("2020-12-31T23:59:59.000Z"),
                  },
                },
              },
            ],
          },
        ],
      },
    });
  });

  it("submits date value query correctly when a previous value is already selected", async () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const component = mount(
      <Search kendra={mockKendra} indexId={"mock-index-id"} />
    );

    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);
    await sleep(0); // yield

    // Force re-render
    component.update();

    // Open facet section
    component.setState({ facetsOpen: true });

    // Find date facet
    let mockDateFacet = component.findWhere(
      (node) =>
        node.is(DateFacet) && node.prop("attributeName") === "mockDateAttribute"
    ).instance() as DateFacet;

    // Update slider
    mockDateFacet.handleChange([2019, 2020]);
    mockDateFacet.applyChangedRangeFilter();
    await sleep(0); // yield
    component.update();

    // Find updated date facet instance
    mockDateFacet = component.findWhere(
      (node) =>
        node.is(DateFacet) && node.prop("attributeName") === "mockDateAttribute"
    ).instance() as DateFacet;

    // Change back
    mockDateFacet.handleChange([2018, 2020]);
    mockDateFacet.applyChangedRangeFilter();
    await sleep(0); // yield

    // Ensure did re-submit correct query
    expect(mockKendra.query).toHaveBeenLastCalledWith({
      IndexId: "mock-index-id",
      QueryText: "test",
      PageNumber: 1,
      AttributeFilter: {
        AndAllFilters: [
          {
            AndAllFilters: [
              {
                GreaterThanOrEquals: {
                  Key: "mockDateAttribute",
                  Value: { DateValue: new Date("2018-12-31T23:59:59.000Z") },
                },
              },
              {
                LessThanOrEquals: {
                  Key: "mockDateAttribute",
                  Value: {
                    DateValue: new Date("2020-12-31T23:59:59.000Z"),
                  },
                },
              },
            ],
          },
        ],
      },
    });
  });

  it("correctly setState of selectedFacets when selections changing", () => {
    const component = shallow<Search>(<Search indexId="test-index-id" />);
    const instance = component.instance();

    instance.componentDidMount();
    expect(instance.state.selectedFacets.getAllSelected()).toEqual({});

    instance.onSelectedFacetsChanged(
      instance.state.selectedFacets.setIsSelected(
        "mock-attribute-key",
        mockDocumentAttributeValue,
        true
      )
    );

    expect(instance.state.selectedFacets.getAllSelected()).toEqual({
      "mock-attribute-key": [{ StringValue: "mockStringValue1" }],
    });
  });

  it("submits query correctly on page change", async () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const component = mount(
      <Search kendra={mockKendra} indexId={"mock-index-id"} />
    );

    // Submit query to get query result and avalable facets
    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);

    expect(mockKendra.query).toHaveBeenCalledTimes(1);

    // Yield
    await sleep(0);

    // Ensure avilable facets updated correctly
    expect(component.state("availableFacets")).toEqual(
      AvailableFacetManager.fromQueryResult(mockQueryFacetResult)
    );

    // Force re-render
    component.update();

    // Open facet section
    component.setState({ facetsOpen: true });

    expect(component.find(StringFacet).exists()).toBeTruthy();

    // Find one facet checkbox
    const mockStringValue2Checkbox = component
      .findWhere(
        (node) =>
          node.is(FacetCheckbox) &&
          node.prop("attributeName") === "mockStringAttribute" &&
          node.prop("valueLabel") === "mockStringValue2"
      )
      .instance() as FacetCheckbox;

    expect(mockStringValue2Checkbox.props.selected).toBeFalsy();

    // Check the checkbox
    mockStringValue2Checkbox.handleChange();

    // Now with filter, we change the page
    component.find<Pagination>(Pagination).props().onSubmit("test", 2);

    // Check if the query submitted contains correct page and filter as expected
    expect(mockKendra.query).toHaveBeenLastCalledWith({
      AttributeFilter: {
        AndAllFilters: [
          {
            OrAllFilters: [
              {
                EqualsTo: {
                  Key: "mockStringAttribute",
                  Value: {
                    StringValue: "mockStringValue2",
                  },
                },
              },
            ],
          },
        ],
      },
      IndexId: "mock-index-id",
      PageNumber: 2,
      QueryText: "test",
    });
  });

  it("updates available facets correctly after each query (flag on)", async () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const component = mount(
      <Search
        kendra={mockKendra}
        indexId={"mock-index-id"}
        facetConfiguration={facetConfiguration}
      />
    );

    // Spy on the fromQueryResult function of AvailableFacetManager
    const spy = jest.spyOn(AvailableFacetManager, "fromQueryResult");

    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);

    expect(mockKendra.query).toHaveBeenCalledTimes(1);

    // Yield
    await sleep(0);

    // Ensure avilable facets updated correctly
    expect(component.state("availableFacets")).toEqual(
      AvailableFacetManager.fromQueryResult(mockQueryFacetResult)
    );

    // Force re-render
    component.update();

    // Open facet section
    component.setState({ facetsOpen: true });

    expect(component.find(StringFacet).exists()).toBeTruthy();

    // Find one facet checkbox
    const mockStringValue2Checkbox = component
      .findWhere(
        (node) =>
          node.is(FacetCheckbox) &&
          node.prop("attributeName") === "mockStringAttribute" &&
          node.prop("valueLabel") === "mockStringValue2"
      )
      .instance() as FacetCheckbox;

    expect(mockStringValue2Checkbox.props.selected).toBeFalsy();

    // Check the checkbox
    mockStringValue2Checkbox.handleChange();

    // Yield
    await sleep(0);

    expect(mockKendra.query).toHaveBeenCalledTimes(2);

    expect(component.state("availableFacets")).toEqual(
      AvailableFacetManager.fromQueryResult(mockQueryFacetResult)
    );

    // 4 times been called: first query before yield; first query after yield; second query before yield; second query after yield
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("updates available facets correctly after each query (flag off)", async () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const mockFacetConfiguration = {
      facetsToShowWhenUncollapsed: 5,
      maxSelectedFacets: 5,
      showCount: true,
      updateAvailableFacetsWhenFilterChange: false,
      facetPanelDefaultOpen: false,
    };

    const component = mount(
      <Search
        kendra={mockKendra}
        indexId={"mock-index-id"}
        facetConfiguration={mockFacetConfiguration}
      />
    );

    const spy = jest.spyOn(AvailableFacetManager, "fromQueryResult");

    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);

    expect(mockKendra.query).toHaveBeenCalledTimes(1);

    await sleep(0); // yield

    // Ensure avilable facets updated correctly
    expect(component.state("availableFacets")).toEqual(
      AvailableFacetManager.fromQueryResult(mockQueryFacetResult)
    );

    // Force re-render
    component.update();

    // Open the facet section
    component.setState({ facetsOpen: true });

    expect(component.find(StringFacet).exists()).toBeTruthy();

    // Find one facet checkbox
    const mockStringValue2Checkbox = component
      .findWhere(
        (node) =>
          node.is(FacetCheckbox) &&
          node.prop("attributeName") === "mockStringAttribute" &&
          node.prop("valueLabel") === "mockStringValue2"
      )
      .instance() as FacetCheckbox;

    expect(mockStringValue2Checkbox.props.selected).toBeFalsy();

    // Check the checkbox
    mockStringValue2Checkbox.handleChange();

    // Yield
    await sleep(0);

    expect(mockKendra.query).toHaveBeenCalledTimes(2);

    expect(component.state("availableFacets")).toEqual(
      AvailableFacetManager.fromQueryResult(mockQueryFacetResult)
    );

    // 3 times been called: first query before yield; first query after yield; second query before yield
    // second query after yield won't enter the condition since the flag is off
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it("sets the default facet panel expansion state according to the configuration", async () => {
    const mockKendra: any = {
      describeIndex: createMockRequest(mockIndex),
      listDataSources: createMockRequestFailure(),
      query: createMockRequest(mockQueryFacetResult),
    };

    const mockFacetConfiguration = {
      facetsToShowWhenUncollapsed: 5,
      maxSelectedFacets: 5,
      showCount: true,
      updateAvailableFacetsWhenFilterChange: false,
      facetPanelDefaultOpen: true,
    };

    const component = mount(
      <Search
        kendra={mockKendra}
        indexId={"mock-index-id"}
        facetConfiguration={mockFacetConfiguration}
      />
    );

    component.find<SearchBar>(SearchBar).props().onSubmit("test", 1);

    // Check the default state of facetsOpen
    expect(component.state("facetsOpen")).toEqual(true);
  });
});
