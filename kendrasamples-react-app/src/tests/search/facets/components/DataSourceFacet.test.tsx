import { shallow } from "enzyme";
import React from "react";
import { DataSourceFacet } from "../../../../search/facets/components/DataSourceFacet";
import {
  mockDataSourceIdValueCountPairs,
  mockDataSourceNameLookup,
} from "../../../mock/mock";
import _ from "lodash";

const facetConfiguration = {
  facetsToShowWhenUncollapsed: 5,
  showCount: true,
};

describe("A <DataSourceFacet />", () => {
  it("renders correctly when data source lookup not provided", () => {
    const component = shallow(
      <DataSourceFacet
        valueCountPairs={mockDataSourceIdValueCountPairs}
        dataSourceNameLookup={undefined}
        disableAdd={false}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders correctly when data source lookup provided", () => {
    const component = shallow(
      <DataSourceFacet
        valueCountPairs={mockDataSourceIdValueCountPairs}
        dataSourceNameLookup={mockDataSourceNameLookup}
        disableAdd={false}
        facetConfiguration={facetConfiguration}
        onSelectionChange={_.noop}
        onClear={_.noop}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
