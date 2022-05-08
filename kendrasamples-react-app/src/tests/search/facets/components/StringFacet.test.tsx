import React from "react";
import { shallow } from "enzyme";
import { StringFacet } from "../../../../search/facets/components/StringFacet";
import { mockDocumentAttributeValueCountPairs } from "../../../mock/mock";
import _ from "lodash";

const facetConfiguration = {
  facetsToShowWhenUncollapsed: 5,
  showCount: true,
};

describe("A <StringFacet />", () => {
  it("renders correctly", () => {
    const component = shallow(
      <StringFacet
        attributeName="mockAttributeName"
        valueCountPairs={mockDocumentAttributeValueCountPairs}
        disableAdd={false}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
