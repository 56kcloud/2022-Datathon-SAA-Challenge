import Kendra from "aws-sdk/clients/kendra";

export function createMockRequest<T>(result: T): any {
  return jest.fn().mockImplementation(() => ({
    promise: jest.fn().mockResolvedValue(result),
  }));
}

export function createMockRequestFailure(): any {
  return jest.fn().mockImplementation(() => ({
    promise: jest.fn().mockRejectedValue(new Error()),
  }));
}

export const mockIndex: Kendra.Types.DescribeIndexResponse = {
  ServerSideEncryptionConfiguration: {
    KmsKeyId: "arn:aws:kms::123412341234:key/mock-key",
  },
  DocumentMetadataConfigurations: [
    {
      Name: "title",
      Type: "STRING_VALUE",
      Search: {
        Facetable: true,
        Searchable: true,
        Displayable: true,
      },
    },
    {
      Name: "rating",
      Type: "LONG_VALUE",
      Search: {
        Facetable: true,
        Searchable: true,
        Displayable: true,
      },
    },
    {
      Name: "author",
      Type: "STRING_VALUE",
      Search: {
        Facetable: true,
        Searchable: true,
        Displayable: true,
      },
    },
    {
      Name: "mockDateAttribute",
      Type: "DATE_VALUE",
      Search: {
        Facetable: true,
        Searchable: true,
        Displayable: true,
      },
    }
  ],
  Description: "index",
  Name: "index-name",
  Id: "mock-index-id",
  RoleArn: "arn:aws:iam::123412341234:role/mock-role",
  Status: "ACTIVE",
};
