import {
  attributeValueToDate,
  attributeValueToString,
  getAttributeTypeLookup,
  getDataSourceNameLookup,
  attributeValueListContains,
  attributeNameToFacetTitle,
  selectHasReachedMaxFiltersForFacet,
} from "../../../search/facets/utils";
import { mockDescribeIndexResponse, mockAttributeList, mockAttributeListWithFiveFacetGroups, mockAttributeListWithFiveValuesInOneFacet } from "../../mock/mock";
import { mockIndex } from "../../mock/mockResources";

const mockAttributeKey0 = "_created_at";
const mockAttributeKey1 = "_data_source_id";
const mockAttributeKey2 = "_last_updated_at";
const mockAttributeKey3 = "_file_type";
const mockAttributeKey4 = "_source_uri";
const mockAttributeKey5 = "subcategories";

test("getAttributeTypeLookup creates map correctly", () => {
  const input = mockDescribeIndexResponse;
  const output = {
    _created_at: "DATE_VALUE",
    _data_source_id: "STRING_VALUE",
    _file_type: "STRING_VALUE",
    _last_updated_at: "DATE_VALUE",
    _source_uri: "STRING_VALUE",
    subcategories: "STRING_LIST_VALUE",
  };
  expect(getAttributeTypeLookup(input)).toEqual(output);
  expect(output[mockAttributeKey0]).toEqual("DATE_VALUE");
  expect(output[mockAttributeKey1]).toEqual("STRING_VALUE");
  expect(output[mockAttributeKey2]).toEqual("DATE_VALUE");
  expect(output[mockAttributeKey3]).toEqual("STRING_VALUE");
  expect(output[mockAttributeKey4]).toEqual("STRING_VALUE");
  expect(output[mockAttributeKey5]).toEqual("STRING_LIST_VALUE");
});

test("getDataSourceNameLookup(...)", () => {
  const mockDataSources = [
    {
      Id: "mock-id",
      Name: "mock-name",
    },
  ];

  expect(getDataSourceNameLookup(mockDataSources)).toEqual({
    "mock-id": "mock-name",
  });
  expect(getDataSourceNameLookup(null)).toBeNull();
});

describe("Function attributeValueToString(...)", () => {
  it("correctly translates string value", () => {
    expect(
      attributeValueToString({
        StringValue: "value",
      })
    ).toEqual("value");
  });

  it("correctly translates string list value", () => {
    expect(
      attributeValueToString({
        StringListValue: ["value1", "value2"],
      })
    ).toEqual("value1 value2");
  });

  it("correctly translates long value", () => {
    expect(
      attributeValueToString({
        LongValue: 5,
      })
    ).toEqual("5");
  });

  it("correctly translates long value", () => {
    expect(
      attributeValueToString({
        DateValue: new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)),
      })
    ).toEqual("2019-01-01T00:00:00Z");
  });
});

describe("Function attributeValueToDate(...)", () => {
  it("correctly translates string value", () => {
    const translatedDate = attributeValueToDate({
      StringValue: "2019-01-01T00:00:00Z",
    });

    expect(translatedDate.format()).toEqual("2019-01-01T00:00:00Z");
  });

  it("correctly translates date value", () => {
    const translatedDate = attributeValueToDate({
      DateValue: new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)),
    });

    expect(translatedDate.format()).toEqual("2019-01-01T00:00:00Z");
  });

  it("correctly translate long value", () => {
    const translatedDate = attributeValueToDate({
      LongValue: ~~(Date.UTC(2019, 0, 1, 0, 0, 0, 0) / 1000),
    });

    expect(translatedDate.format()).toEqual("2019-01-01T00:00:00Z");
  });

  it("correctly check if has reached max filters limit", () => {
    const res = selectHasReachedMaxFiltersForFacet(mockIndex, mockAttributeList, "mockStringAttribute")

    expect(res).toEqual(false);
  })

  it("correctly check if has reached max filters limit (too many facet groups selected)", () => {
    const res = selectHasReachedMaxFiltersForFacet(mockIndex, mockAttributeListWithFiveFacetGroups, "mockStringAttribute1")

    expect(res).toEqual(true);
  })

  it("correctly check if has reached max filters limit (too many values selected in one facet)", () => {
    const res = selectHasReachedMaxFiltersForFacet(mockIndex, mockAttributeListWithFiveValuesInOneFacet, "mockStringAttribute")

    expect(res).toEqual(true);
  })
});

describe("Function attributeValueListContains(...)", () => {
  it("handles empty correctly", () => {
    expect(attributeValueListContains([], { StringValue: "test" })).toBeFalsy();
  });

  it("handles contains string correctly", () => {
    expect(
      attributeValueListContains([{ StringValue: "test" }], {
        StringValue: "test",
      })
    ).toBeTruthy();

    expect(
      attributeValueListContains(
        [{ StringValue: "test" }, { StringValue: "test2" }],
        {
          StringValue: "test",
        }
      )
    ).toBeTruthy();

    expect(
      attributeValueListContains([{ StringValue: "test" }], {
        StringValue: "test3",
      })
    ).toBeFalsy();
  });

  it("handles contains date correctly", () => {
    expect(
      attributeValueListContains(
        [{ DateValue: new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)) }],
        {
          DateValue: new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)),
        }
      )
    ).toBeTruthy();

    expect(
      attributeValueListContains(
        [
          { DateValue: new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)) },
          { DateValue: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0)) },
        ],
        {
          DateValue: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0)),
        }
      )
    ).toBeTruthy();

    expect(
      attributeValueListContains(
        [{ DateValue: new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)) }],
        {
          DateValue: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0)),
        }
      )
    ).toBeFalsy();
  });

  it("handles contains long correctly", () => {
    expect(
      attributeValueListContains([{ LongValue: 5 }], {
        LongValue: 5,
      })
    ).toBeTruthy();

    expect(
      attributeValueListContains([{ LongValue: 5 }, { LongValue: 6 }], {
        LongValue: 6,
      })
    ).toBeTruthy();

    expect(
      attributeValueListContains([{ LongValue: 5 }], {
        LongValue: 6,
      })
    ).toBeFalsy();
  });
});

describe("Function attributeNameToFacetTitle(...)", () => {
  it("Works for default Kendra attribute", () => {
    expect(attributeNameToFacetTitle("_source_uri")).toBe("Source URI");
  });

  it("Works for custom attribute", () => {
    expect(attributeNameToFacetTitle("test")).toBe("test");

    expect(attributeNameToFacetTitle("")).toBe("");
  });
});
