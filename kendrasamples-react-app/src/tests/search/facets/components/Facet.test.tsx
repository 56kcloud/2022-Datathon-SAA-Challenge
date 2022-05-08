import React from "react";
import { Facet } from "../../../../search/facets/components/Facet";
import { shallow } from "enzyme";
import { mockDocumentAttributeValueCountPairs } from "../../../mock/mock";
import _ from "lodash";

const mockFacetValues = mockDocumentAttributeValueCountPairs.map(value => ({
  ...value,
  ValueLabel: value.DocumentAttributeValue.StringValue,
}));

const facetConfiguration = {
    facetsToShowWhenUncollapsed: 5,
    showCount: true,
};

describe("A <Facet />", () => {
  it("renders correctly", () => {
    const component = shallow(
      <Facet
        attributeName="mockAttributeName"
        values={mockFacetValues}
        disableAdd={false}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders _source_uri correctly", () => {
    const component = shallow(
      <Facet
        attributeName="_source_uri"
        values={mockFacetValues}
        disableAdd={false}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders collapsed correctly", () => {
    const component = shallow(
      <Facet
        attributeName="mockAttributeName"
        values={mockFacetValues}
        disableAdd={false}
        facetConfiguration={{
            ...facetConfiguration,
            facetsToShowWhenUncollapsed: 1,
        }}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders expanded correctly", () => {
    const component = shallow<Facet>(
      <Facet
        attributeName="mockAttributeName"
        values={mockFacetValues}
        disableAdd={false}
        facetConfiguration={{
            ...facetConfiguration,
            facetsToShowWhenUncollapsed: 1,
        }}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    component.instance().showMore();

    expect(component).toMatchSnapshot();
  });

  it("renders count hidden correctly", () => {
    const component = shallow(
      <Facet
        attributeName="mockAttributeName"
        values={mockFacetValues}
        disableAdd={false}
        facetConfiguration={{
            ...facetConfiguration,
            showCount: false,
        }}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders correctly if disableAdd", () => {
    const component = shallow(
      <Facet
        attributeName="mockAttributeName"
        values={mockFacetValues}
        disableAdd={true}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
