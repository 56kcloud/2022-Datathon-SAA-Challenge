import { SelectedFacetManager } from "../../../search/facets/SelectedFacetManager";
import {
  mockDocumentAttributeStringSelections,
  mockDocumentAttributeDateRangeSelections,
} from "../../mock/mock";
import moment from "moment";

describe("SelectedFacetManager", () => {
  it("get correct selections", () => {
    const manager = new SelectedFacetManager(
      mockDocumentAttributeStringSelections,
      mockDocumentAttributeDateRangeSelections
    );
    expect(manager.getStringSelectionsOf("mockStringAttribute")).toEqual(
      mockDocumentAttributeStringSelections["mockStringAttribute"]
    );
  });

  it("get correct data range selections", () => {
    const manager = new SelectedFacetManager(
      mockDocumentAttributeStringSelections,
      mockDocumentAttributeDateRangeSelections
    );
    expect(manager.getDateRangeSelectionsOf("mockDateAttribute")).toEqual(
      mockDocumentAttributeDateRangeSelections["mockDateAttribute"]
    );
  });

  it("correctly clears all selections immutably", () => {
    const manager = new SelectedFacetManager(
      mockDocumentAttributeStringSelections,
      mockDocumentAttributeDateRangeSelections
    );
    const update = manager.clearAll();
    expect(manager.getDateRangeSelectionsOf("mockDateAttribute")).toEqual(
      mockDocumentAttributeDateRangeSelections["mockDateAttribute"]
    );
    expect(update.isEmpty()).toEqual(true);
  });

  it("correclty clears a string type selection immutably", () => {
    const manager = new SelectedFacetManager(
      mockDocumentAttributeStringSelections,
      mockDocumentAttributeDateRangeSelections
    );
    const update = manager.setIsSelected(
      "mockStringAttribute",
      {
        StringValue: "mockStringValue1",
      },
      false
    );
    expect(manager.getStringSelectionsOf("mockStringAttribute")).toEqual([
      {
        StringValue: "mockStringValue1",
      },
      {
        StringValue: "mockStringValue2",
      },
    ]);
    expect(update.getStringSelectionsOf("mockStringAttribute")).toEqual([
      {
        StringValue: "mockStringValue2",
      },
    ]);
  });

  it("correctly check if an attribute is selected", () => {
    const manager = new SelectedFacetManager(
      mockDocumentAttributeStringSelections,
      mockDocumentAttributeDateRangeSelections
    );

    const res = manager.isSelected("mockStringAttribute", {
      StringValue: "mockStringValue2",
    });

    expect(res).toEqual(true);
  });

  it("correctly set an attribute as selected immutably", () => {
    const manager = new SelectedFacetManager(
      mockDocumentAttributeStringSelections,
      mockDocumentAttributeDateRangeSelections
    );

    const update = manager.setIsSelected(
      "mockStringAttribute",
      { StringValue: "mockStringValue3" },
      true
    );

    expect(manager.getStringSelectionsOf("mockStringAttribute")).toEqual([
      {
        StringValue: "mockStringValue1",
      },
      {
        StringValue: "mockStringValue2",
      },
    ]);
    expect(update.getStringSelectionsOf("mockStringAttribute")).toEqual([
      {
        StringValue: "mockStringValue1",
      },
      {
        StringValue: "mockStringValue2",
      },
      {
        StringValue: "mockStringValue3",
      },
    ]);
  });

  it("correctly set date selected immutably", () => {
    const manager = new SelectedFacetManager(
      mockDocumentAttributeStringSelections,
      mockDocumentAttributeDateRangeSelections
    );

    const update = manager.setDateRange("mockDateAttribute", [
      2000,
      2001,
    ]);

    expect(manager.getDateRangeSelectionsOf("mockDateAttribute")?.min.format()).toEqual("2001-08-13T07:00:00Z");
    expect(manager.getDateRangeSelectionsOf("mockDateAttribute")?.max.format()).toEqual("2001-08-14T07:00:00Z");

    expect(update.getDateRangeSelectionsOf("mockDateAttribute")?.min.format()).toEqual("2000-12-31T23:59:59Z");
    expect(update.getDateRangeSelectionsOf("mockDateAttribute")?.max.format()).toEqual("2001-12-31T23:59:59Z");
  });
});
