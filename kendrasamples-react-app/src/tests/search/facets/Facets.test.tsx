import { mount, shallow } from "enzyme";
import _ from "lodash";
import React from "react";
import { Form } from "react-bootstrap";
import { DocumentAttributeKeys } from "../../../search/constants";
import { AvailableFacetManager } from "../../../search/facets/AvailableFacetManager";
import { AvailableFacetRetriever } from "../../../search/facets/AvailableFacetRetriever";
import { DateFacet } from "../../../search/facets/components/DateFacet";
import { Facet } from "../../../search/facets/components/Facet";
import { FacetCheckbox } from "../../../search/facets/components/FacetCheckbox";
import { Facets } from "../../../search/facets/Facets";
import { SelectedFacetManager } from "../../../search/facets/SelectedFacetManager";
import {
  mockAttributeTypeLookup,
  mockDataSourceIdValueCountPairs,
  mockDataSourceNameLookup,
  mockDateDocumentAttributeValueCountPairs,
  mockDocumentAttributeValueCountPairs,
  mockDocumentAttributeValue,
} from "../../mock/mock";

const mockNoopProps = {
  selectedFacets: SelectedFacetManager.empty(),
  onSelectedFacetsChanged: _.noop,
  onExpand: _.noop,
};

describe("A <Facets />", () => {
  it("renders correctly when doesn't have index", () => {
    const component = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={undefined}
        availableFacets={AvailableFacetManager.empty()}
        open={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders correctly when doesn't have query result", () => {
    const component = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={AvailableFacetManager.empty()}
        open={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders string value correctly", () => {
    const mockAttributeName = "mockAttributeName";

    const mockAvailableFacets: AvailableFacetRetriever = {
      get: (attributeName: string) => mockDocumentAttributeValueCountPairs,
      getAvailableAttributeNames: () => [mockAttributeName],
    };

    const mockAttributeTypeLookup = {
      [mockAttributeName]: "STRING_VALUE",
    };

    const component = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={mockAvailableFacets}
        open={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders date value correctly", () => {
    const mockAttributeName = "mockDateAttributeName";

    const mockAvailableFacets: AvailableFacetRetriever = {
      get: (attributeName: string) => mockDateDocumentAttributeValueCountPairs,
      getAvailableAttributeNames: () => [mockAttributeName],
    };

    const mockAttributeTypeLookup = {
      [mockAttributeName]: "DATE_VALUE",
    };

    const component = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={mockAvailableFacets}
        open={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders data source id correctly when data source lookup provided", () => {
    const mockAvailableFacets: AvailableFacetRetriever = {
      get: (attributeName: string) => mockDataSourceIdValueCountPairs,
      getAvailableAttributeNames: () => [DocumentAttributeKeys.DataSourceId],
    };

    const mockAttributeTypeLookup = {
      [DocumentAttributeKeys.DataSourceId]: "STRING_VALUE",
    };

    const component = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={mockAvailableFacets}
        dataSourceNameLookup={mockDataSourceNameLookup}
        open={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders data source id correctly when data source lookup not provided", () => {
    const mockAvailableFacets: AvailableFacetRetriever = {
      get: (attributeName: string) => mockDataSourceIdValueCountPairs,
      getAvailableAttributeNames: () => [DocumentAttributeKeys.DataSourceId],
    };

    const mockAttributeTypeLookup = {
      [DocumentAttributeKeys.DataSourceId]: "STRING_VALUE",
    };

    const component = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={mockAvailableFacets}
        open={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders multiple values correctly", () => {
    const mockStringAttribute1Name = "mockString1AttributeName";
    const mockStringAttribute2Name = "mockStringAttribute2Name";
    const mockDateAttributeName = "mockDateAttributeName";

    const mockAvailableFacets: AvailableFacetRetriever = {
      get: (attributeName: string) => {
        switch (attributeName) {
          case mockStringAttribute1Name:
          case mockStringAttribute2Name:
            return mockDocumentAttributeValueCountPairs;
          case mockDateAttributeName:
            return mockDateDocumentAttributeValueCountPairs;
          default:
            return [];
        }
      },
      getAvailableAttributeNames: () => [
        mockStringAttribute1Name,
        mockStringAttribute2Name,
        mockDateAttributeName,
      ],
    };

    const mockAttributeTypeLookup = {
      [mockStringAttribute1Name]: "STRING_VALUE",
      [mockStringAttribute2Name]: "STRING_VALUE",
      [mockDateAttributeName]: "DATE_VALUE",
    };

    const component = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={mockAvailableFacets}
        open={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("Renders correctly when no available facets, but some facet is selected", () => {
    const mockSelectedFacets = SelectedFacetManager.empty().setIsSelected(
      "mockAttributeKey",
      mockDocumentAttributeValue,
      true
    );

    const facets = shallow(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={{}}
        availableFacets={AvailableFacetManager.empty()}
        selectedFacets={mockSelectedFacets}
        open={true}
      />
    );

    expect(facets).toMatchSnapshot();
  });

  it("Integration test", () => {
    const mockStringAttribute1Name = "mockStringAttribute1Name";
    const mockStringAttribute2Name = "mockStringAttribute2Name";
    const mockDateAttributeName = "mockDateAttributeName";

    let availableFacetManager = AvailableFacetManager.empty().setAll({
      [mockStringAttribute1Name]: mockDocumentAttributeValueCountPairs,
      [mockStringAttribute2Name]: mockDocumentAttributeValueCountPairs,
      [mockDateAttributeName]: mockDateDocumentAttributeValueCountPairs,
    });

    const mockAttributeTypeLookup = {
      [mockStringAttribute1Name]: "STRING_VALUE",
      [mockStringAttribute2Name]: "STRING_VALUE",
      [mockDateAttributeName]: "DATE_VALUE",
    };

    const facets = mount(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={availableFacetManager}
        open={true}
      />
    );

    const firstFacetName = mockStringAttribute1Name;

    // Check correct facet is first
    expect(
      facets
        .find(Facet)
        .first()
        .find(".facet-title")
        .text()
        .startsWith(firstFacetName)
    ).toBeTruthy();

    // Check the value of the first facet is rendered correctly
    expect(
      shallow(
        facets
          .find(Facet)
          .first()
          .find(FacetCheckbox)
          .first()
          .find(Form.Check)
          .prop("label") as React.ReactElement
      ).html()
    ).toMatch(/mockStringValue1/);

    // Change the values of the first facet
    availableFacetManager = availableFacetManager.set(firstFacetName, [
      {
        DocumentAttributeValue: {
          StringValue: "mockUpdatedValue",
        },
        Count: 10,
      },
    ]);

    facets.setProps({
      attributeTypeLookup: mockAttributeTypeLookup,
      availableFacets: availableFacetManager,
    });

    // Check correct facet is first
    expect(
      facets
        .find(Facet)
        .first()
        .find(".facet-title")
        .text()
        .startsWith(firstFacetName)
    ).toBeTruthy();

    // Check the value of the first facet is rendered correctly
    expect(
      shallow(
        facets
          .find(Facet)
          .first()
          .find(FacetCheckbox)
          .first()
          .find(Form.Check)
          .prop("label") as React.ReactElement
      ).html()
    ).toMatch(/mockUpdatedValue/);
  });

  it("Integration test date facet handles changes to available facets correctly", () => {
    const mockStringAttribute1Name = "mockStringAttribute1Name";
    const mockDateAttributeName = "mockDateAttributeName";

    let availableFacetManager = AvailableFacetManager.empty().setAll({
      [mockStringAttribute1Name]: mockDocumentAttributeValueCountPairs,
      [mockDateAttributeName]: mockDateDocumentAttributeValueCountPairs,
    });

    const mockAttributeTypeLookup = {
      [mockStringAttribute1Name]: "STRING_VALUE",
      [mockDateAttributeName]: "DATE_VALUE",
    };

    const facets = mount(
      <Facets
        {...mockNoopProps}
        attributeTypeLookup={mockAttributeTypeLookup}
        availableFacets={availableFacetManager}
        open={true}
      />
    );

    const dateFacet = facets.find<DateFacet>(DateFacet);
    expect(dateFacet.instance().state.slider.value).toBeUndefined();

    // Change the values of the date facet
    const mockSliderValue: [number, number] = [2019, 2020];
    dateFacet.instance().handleChange(mockSliderValue);
    expect(dateFacet.instance().state.slider.value).toEqual(mockSliderValue);

    // Change the values of the string facet
    availableFacetManager = availableFacetManager.set(
      mockStringAttribute1Name,
      [
        {
          DocumentAttributeValue: {
            StringValue: "mockUpdatedValue",
          },
          Count: 10,
        },
      ]
    );

    facets.setProps({
      attributeTypeLookup: mockAttributeTypeLookup,
      availableFacets: availableFacetManager,
    });

    // Ensure slider value didn't change
    expect(dateFacet.instance().state.slider.value).toEqual(mockSliderValue);

    // Change the value of the date facet
    availableFacetManager = availableFacetManager.set(mockDateAttributeName, [
      {
        DocumentAttributeValue: {
          StringValue: "2019-03-26T14:33:14.000Z",
        },
        Count: 10,
      },
    ]);

    facets.setProps({
      attributeTypeLookup: mockAttributeTypeLookup,
      availableFacets: availableFacetManager,
    });

    // Ensure slider value did change
    expect(dateFacet.instance().state.slider.value).toBeUndefined();
  });
});
