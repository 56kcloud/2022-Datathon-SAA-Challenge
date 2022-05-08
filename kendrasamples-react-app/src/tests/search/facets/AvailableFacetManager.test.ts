import { AvailableFacetManager } from "../../../search/facets/AvailableFacetManager";
import { mockQueryFacetResult, mockDocumentAttributeValueCountPairs } from "../../mock/mock";
import { AvailableFacetRetriever } from "../../../search/facets/AvailableFacetRetriever";

describe("AvailableFacetManager", () => {
  it("is created from query response correctly", () => {
    const manager = AvailableFacetManager.fromQueryResult(mockQueryFacetResult);

    expect(manager.get("mockStringAttribute")).toMatchObject(
      mockQueryFacetResult.FacetResults[0].DocumentAttributeValueCountPairs
    );
    expect(manager.get("mockStringListAttribute")).toMatchObject(
      mockQueryFacetResult.FacetResults[1].DocumentAttributeValueCountPairs
    );
    expect(manager.get("mockDateAttribute")).toMatchObject(
      mockQueryFacetResult.FacetResults[2].DocumentAttributeValueCountPairs
    );

    expect(manager.getAvailableAttributeNames()).toMatchObject([
      "mockDateAttribute",
      "mockStringAttribute",
      "mockStringListAttribute"
    ])
  });

  it("implements set immutably", () => {
    const manager = AvailableFacetManager.empty();

    const mockAttributeName = "mockAttribute";

    const updated = manager.set(mockAttributeName, mockDocumentAttributeValueCountPairs);

    expect(manager.get(mockAttributeName)).toEqual([]);
    expect(updated.get(mockAttributeName)).toEqual(mockDocumentAttributeValueCountPairs);
  });

  it("implements setAll immutably", () => {
    const manager = AvailableFacetManager.empty();

    const mockAttribute1Name = "mockAttribute1";

    const updated = manager.setAll({ 
      [mockAttribute1Name]: mockDocumentAttributeValueCountPairs
    });

    expect(manager.get(mockAttribute1Name)).toEqual([]);
    expect(updated.get(mockAttribute1Name)).toEqual(mockDocumentAttributeValueCountPairs);
  });

  it("implements get available attribute names", () => {
    const mockAttribute1Name = "mockAttribute1";
    const mockAttribute2Name = "mockAttribute2";

    const retriever1: AvailableFacetRetriever = AvailableFacetManager.empty().setAll({ 
      [mockAttribute1Name]: mockDocumentAttributeValueCountPairs,
      [mockAttribute2Name]: mockDocumentAttributeValueCountPairs,
    });

    const retriever2: AvailableFacetRetriever = AvailableFacetManager.empty().setAll({
      [mockAttribute2Name]: mockDocumentAttributeValueCountPairs,
      [mockAttribute1Name]: mockDocumentAttributeValueCountPairs,
    });

    const sortedNames = [
      mockAttribute1Name,
      mockAttribute2Name
    ];

    expect(retriever1.getAvailableAttributeNames()).toEqual(sortedNames);
    expect(retriever2.getAvailableAttributeNames()).toEqual(sortedNames);
  });
});
