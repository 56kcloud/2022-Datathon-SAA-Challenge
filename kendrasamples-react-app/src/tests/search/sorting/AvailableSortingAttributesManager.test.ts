import { AvailableSortingAttributesManager } from "../../../search/sorting/AvailableSortingAttributesManager";
import {
  mockAvailableSrotingAttributes,
  mockDescribeIndexResponseWithSortable,
} from "../../mock/mock";

describe("AvailableSortingAttributesManager", () => {
  it("is created from sorting attributes list correctly", () => {
    let manager = AvailableSortingAttributesManager.empty();

    manager = manager.set(mockAvailableSrotingAttributes);

    expect(manager.get()).toEqual(["_created_at", "_file_type"]);
  });

  it("get sorting attributes list from index meta data correctly", () => {
    let manager = AvailableSortingAttributesManager.empty();

    manager = manager.fromIndexMetadata(
      mockDescribeIndexResponseWithSortable.DocumentMetadataConfigurations!
    );

    expect(manager.get()).toEqual([
      "_created_at",
      "_last_updated_at",
      "_data_source_id",
      "_file_type",
      "_source_uri",
    ]);
  });

  it("implements set immutably", () => {
    const manager = AvailableSortingAttributesManager.empty();

    let updated = manager.set(mockAvailableSrotingAttributes);

    expect(manager.get()).toEqual([]);
    expect(updated.get()).toEqual(["_created_at", "_file_type"]);
  });
});
