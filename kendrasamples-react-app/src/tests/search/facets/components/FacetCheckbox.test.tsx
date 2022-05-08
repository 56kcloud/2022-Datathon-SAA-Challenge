import { shallow } from "enzyme";
import _ from "lodash";
import React from "react";
import { FacetCheckbox } from "../../../../search/facets/components/FacetCheckbox";

const facetConfiguration = {
  showCount: true,
};

const mockDocumentAttributeValue = {
  StringValue: "mockStringValue1",
};

describe("A <FacetCheckbox />", () => {
  it("renders correctly", () => {
    const component = shallow(
      <FacetCheckbox
        value={mockDocumentAttributeValue}
        valueLabel={mockDocumentAttributeValue.StringValue}
        count={5}
        selected={false}
        disableAdd={false}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        attributeName={"mockAttributeName"}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders without count correctly", () => {
    const component = shallow(
      <FacetCheckbox
        value={mockDocumentAttributeValue}
        valueLabel={mockDocumentAttributeValue.StringValue}
        selected={false}
        disableAdd={false}
        facetConfiguration={{
          showCount: false,
        }}
        onSelectionChange={_.noop}
        attributeName={"mockAttributeName"}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders disableAdd selected correctly", () => {
    const component = shallow(
      <FacetCheckbox
        value={mockDocumentAttributeValue}
        valueLabel={mockDocumentAttributeValue.StringValue}
        count={5}
        selected={true}
        disableAdd={true}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        attributeName={"mockAttributeName"}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders disable not selected correctly", () => {
    const component = shallow(
      <FacetCheckbox
        value={mockDocumentAttributeValue}
        valueLabel={mockDocumentAttributeValue.StringValue}
        count={5}
        selected={false}
        disableAdd={true}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        attributeName={"mockAttributeName"}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
