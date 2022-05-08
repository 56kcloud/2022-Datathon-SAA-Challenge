import { SelectedSortingAttributeManager } from "../../../search/sorting/SelectedSortingAttributeManager";

describe("SelectedFacetManager", () => {
    it("gets correct default selection", () => {
        let manager = SelectedSortingAttributeManager.default();

        expect(manager.getSelectedSortingAttribute()).toEqual("Relevance");
        expect(manager.getSelectedSortingOrder()).toEqual(null);
    })

    it("gets correct selected sorting attribute", () => {
        let manager = SelectedSortingAttributeManager.default();

        manager = manager.setSelectedSortingAttribute("mockStringAttribute");

        expect(manager.getSelectedSortingAttribute()).toEqual("mockStringAttribute");
        expect(manager.getSelectedSortingOrder()).toEqual("DESC");
    })

    it("gets correct selected sorting order", () => {
        let manager = SelectedSortingAttributeManager.default();

        manager = manager.setSelectedSortingAttribute("mockStringAttribute");
        expect(manager.getSelectedSortingOrder()).toEqual("DESC");

        manager = manager.setSelectedSortingOrder("ASC");
        expect(manager.getSelectedSortingOrder()).toEqual("ASC");
    })

    it("sets selection immutably", () => {
        const manager = SelectedSortingAttributeManager.default();
        const updated = manager.setSelectedSortingAttribute("mockStringAttribute");

        expect(manager.getSelectedSortingAttribute()).toEqual("Relevance");
        expect(manager.getSelectedSortingOrder()).toEqual(null);
        expect(updated.getSelectedSortingAttribute()).toEqual("mockStringAttribute");
        expect(updated.getSelectedSortingOrder()).toEqual("DESC");
    })
})