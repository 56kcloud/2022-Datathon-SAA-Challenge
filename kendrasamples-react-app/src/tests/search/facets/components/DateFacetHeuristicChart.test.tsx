import { shallow } from "enzyme";
import React from "react";
import { DateFacetHeuristicChart } from "../../../../search/facets/components/DateFacetHeuristicChart";

describe("A <DateFacetHeuristicChart />", () => {
  it("Renders correctly", () => {
    const component = shallow(
      <DateFacetHeuristicChart
        availableDateFacet={{
          minYear: 2018,
          maxYear: 2020,
          yearHeuristic: {
            2018: 5,
            2019: 0,
            2020: 10,
          },
        }}
        displaySelectionRange={[2019, 2020]}
        fullRange={[2018, 2020]}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
