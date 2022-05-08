import Kendra from "aws-sdk/clients/kendra";
import moment from "moment";
import {
  DocumentAttributeDateRangeSelections,
  DocumentAttributeStringSelections,
} from "../../search/facets/SelectedFacetManager";

export const mockDescribeIndexResponse: Kendra.DescribeIndexResponse = {
  DocumentMetadataConfigurations: [
    { Name: "_created_at", Type: "DATE_VALUE" },
    { Name: "_data_source_id", Type: "STRING_VALUE" },
    { Name: "_last_updated_at", Type: "DATE_VALUE" },
    { Name: "_file_type", Type: "STRING_VALUE" },
    { Name: "_source_uri", Type: "STRING_VALUE" },
    { Name: "subcategories", Type: "STRING_LIST_VALUE" },
  ],
};

export const mockDescribeIndexResponseWithSortable: Kendra.DescribeIndexResponse = {
  DocumentMetadataConfigurations: [
    { Name: "_created_at", Type: "DATE_VALUE", Search: { Sortable: true } },
    {
      Name: "_data_source_id",
      Type: "STRING_VALUE",
      Search: { Sortable: true },
    },
    {
      Name: "_last_updated_at",
      Type: "DATE_VALUE",
      Search: { Sortable: true },
    },
    { Name: "_file_type", Type: "STRING_VALUE", Search: { Sortable: true } },
    { Name: "_source_uri", Type: "STRING_VALUE", Search: { Sortable: true } },
    {
      Name: "subcategories",
      Type: "STRING_LIST_VALUE",
      Search: { Sortable: false },
    },
  ],
};

export const mockAvailableSrotingAttributes = ["_created_at", "_file_type"];

export const mockAttributeTypeLookup = {
  _created_at: "DATE_VALUE",
  _data_source_id: "STRING_VALUE",
  _file_type: "STRING_VALUE",
  _last_updated_at: "DATE_VALUE",
  _source_uri: "STRING_VALUE",
  subcategories: "STRING_LIST_VALUE",
};

export const mockDocumentAttributeValue: Kendra.DocumentAttributeValue = {
  StringValue: "mockStringValue1",
};

export const mockDocumentAttributeValueList: Kendra.DocumentAttributeValue[] = [
  {
    StringValue: "mockStringValue1",
  },
  {
    StringValue: "mockStringValue2",
  },
  {
    StringValue: "mockStringValue3",
  },
  {
    StringValue: "mockStringValue4",
  },
  {
    StringValue: "mockStringValue5",
  },
];

export const mockDocumentAttributeValueCountPair = {
  DocumentAttributeValue: {
    StringValue: "mockStringValue1",
  },
  Count: 10,
};

export const mockDocumentAttributeValueCountPairs = [
  {
    DocumentAttributeValue: {
      StringValue: "mockStringValue1",
    },
    Count: 10,
  },
  {
    DocumentAttributeValue: {
      StringValue: "mockStringValue2",
    },
    Count: 20,
  },
];

export const mockDateDocumentAttributeValueCountPairs = [
  {
    DocumentAttributeValue: {
      StringValue: "2020-03-27T14:33:14.000Z",
    },
    Count: 10,
  },
  {
    DocumentAttributeValue: {
      StringValue: "2019-03-26T14:33:14.000Z",
    },
    Count: 20,
  },
];

export const mockQueryFacetResult = {
  FacetResults: [
    {
      DocumentAttributeKey: "mockStringAttribute",
      DocumentAttributeValueCountPairs: mockDocumentAttributeValueCountPairs,
    },
    {
      DocumentAttributeKey: "mockStringListAttribute",
      DocumentAttributeValueCountPairs: mockDocumentAttributeValueCountPairs,
    },
    {
      DocumentAttributeKey: "mockDateAttribute",
      DocumentAttributeValueCountPairs: mockDateDocumentAttributeValueCountPairs,
    },
  ],
  ResultItems: [
    {
      AdditionalAttributes: [
        {
          Key: "AnswerText",
          Value: {
            TextWithHighlightsValue: {
              Highlights: [
                {
                  BeginOffset: 0,
                  EndOffset: 4,
                  TopAnswer: false,
                },
                {
                  BeginOffset: 92,
                  EndOffset: 96,
                  TopAnswer: false,
                },
                {
                  BeginOffset: 143,
                  EndOffset: 147,
                  TopAnswer: false,
                },
              ],
              Text:
                "Rome was the only major Mediterranean power left, but at this time her navy was reduced and Rome relied on hiring ships as necessity required. Rome only protected the Tyrrhenian and Adriatic seas, on account of their proximity, with expeditions sent against the pirate bases on the Ligurian and Illyrian coast. The Balearic Isles were cleared in 120 BC for the same purpose.  As a result, the pirates became consolidated and organized. The smaller communities of the Greek and African waters were left to make their own arrangements. Communities unable to fend off the pirate incursions were forced to come to an understanding with the pirates, and thus became havens.",
            },
          },
          ValueType: "TEXT_WITH_HIGHLIGHTS_VALUE",
        },
      ],
      DocumentAttributes: [],
      DocumentExcerpt: {
        Highlights: [
          {
            BeginOffset: 0,
            EndOffset: 300,
            TopAnswer: false,
          },
        ],
        Text:
          "Rome was the only major Mediterranean power left, but at this time her navy was reduced and Rome relied on hiring ships as necessity required. Rome only protected the Tyrrhenian and Adriatic seas, on account of their proximity, with expeditions sent against the pirate bases on the Ligurian and Illyr",
      },
      DocumentId: "",
      DocumentTitle: {
        Text: "",
      },
      DocumentURI: "",
      Id:
        "316827a3-ae5d-4b2d-a436-730243494970-0d0fd19b-2a6a-4794-baaa-66399c094fce",
      Type: "ANSWER",
      Score: 0.1488952338695526,
    },
  ],
};

export const mockDocumentAttributeStringSelections: DocumentAttributeStringSelections = {
  mockStringAttribute: [
    { StringValue: "mockStringValue1" },
    { StringValue: "mockStringValue2" },
  ],
  mockStringListAttribute: [
    { StringValue: "mockStringListValue1" },
    { StringValue: "mockStringListValue2" },
  ],
};

export const mockDocumentAttributeDateRangeSelections: DocumentAttributeDateRangeSelections = {
  mockDateAttribute: {
    min: moment.utc("2001-08-13T07:00:00.000Z"),
    max: moment.utc("2001-08-14T07:00:00.000Z"),
  },
};

export const mockDataSourceId = "mock-data-source-id";
export const mockDataSourceName = "MockDataSourceName";

export const mockDataSourceNameLookup = {
  [mockDataSourceId]: mockDataSourceName,
};

export const mockDataSourceIdValueCountPairs: Kendra.DocumentAttributeValueCountPair[] = [
  {
    DocumentAttributeValue: {
      StringValue: mockDataSourceId,
    },
    Count: 10,
  },
];

export const mockAttributeList: {
  [key: string]: Kendra.DocumentAttributeValue[];
} = {
  mockStringAttribute: [mockDocumentAttributeValue],
};

export const mockAttributeListWithFiveFacetGroups: {
  [key: string]: Kendra.DocumentAttributeValue[];
} = {
  mockStringAttribute1: [mockDocumentAttributeValue],
  mockStringAttribute2: [mockDocumentAttributeValue],
  mockStringAttribute3: [mockDocumentAttributeValue],
  mockStringAttribute4: [mockDocumentAttributeValue],
  mockStringAttribute5: [mockDocumentAttributeValue],
};

export const mockAttributeListWithFiveValuesInOneFacet: {
  [key: string]: Kendra.DocumentAttributeValue[];
} = {
  mockStringAttribute: mockDocumentAttributeValueList,
};
