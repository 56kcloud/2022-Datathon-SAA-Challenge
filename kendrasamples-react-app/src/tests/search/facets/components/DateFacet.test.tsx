import { shallow } from "enzyme";
import _ from "lodash";
import React from "react";
import { DateFacet } from "../../../../search/facets/components/DateFacet";
import { mockDateDocumentAttributeValueCountPairs } from "../../../mock/mock";

describe("A <DateFacet />", () => {
  it("Renders correctly", () => {
    const component = shallow(
      <DateFacet
        attributeName={"mockDateFacet"}
        valueCountPairs={mockDateDocumentAttributeValueCountPairs}
        disableAdd={false}
        onSelectionsChange={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
