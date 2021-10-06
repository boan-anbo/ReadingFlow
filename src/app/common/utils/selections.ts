export class Selections<T> {
  selectedIds: Set<string> = new Set<string>();
  selectedItems: Set<T> = new Set<T>();

  selectManyIds(itemIds: string[]): void {
    itemIds.forEach(itemId => {
      this.selectId(itemId)
    })
  };

  // provide total set and return those who were not previously selected
  invertSelection(totalSetIds: string[]) {
    const unselected: string[] =  totalSetIds.filter(totalSetItemId => !this.isItemIdSelected(totalSetItemId));
    this.setManyIds(unselected);
  };


  selectId(itemId: string): void {
    this.selectedIds.add(itemId);
  }

  unselectId(itemId: string): void {
    this.selectedIds.delete(itemId);
  }

  unselectManyIds(itemIds: string []): void {
    itemIds.forEach(itemId => this.unselectId(itemId));
  }

  isItemIdSelected(itemId: string): boolean {
    return this.selectedIds.has(itemId);
  }

  areItemIdsSelected(itemIds: string[]): boolean {
    return itemIds.every(itemId => this.isItemIdSelected(itemId));
  }

  isAnySelected(): boolean {
    return this.selectedIds.size > 0;
  }

  count(): number {
    return this.selectedIds.size
  }

  toArray(): string[] {
    return Array.from(this.selectedIds);
  }

  // get selected items. default id field to 'id'.
  getSelectedItems(items: T[], idPropertyName = 'id'): T[] {
    return items.filter(item => this.isItemIdSelected(item[idPropertyName] as string));
  }

  isItemSelected(item: T, idPropertyName = 'id'): boolean {
    return this.isItemIdSelected(item[idPropertyName] as string);
  }

  areItemsSelected(items: T[], idPropertyName = 'id'): boolean {
    return this.areItemIdsSelected(items.map(item => item[idPropertyName] as string))
  }

  clear(): void {
    this.selectedIds.clear();
  }

  toggle(id: string) {
    if (this.isItemIdSelected(id)) {
      this.unselectId(id);
    } else {
      this.selectId(id);
    }
  }

  getSelectedIds(): string[] {
    return this.toArray();
  }

  // clear and set the selections equal to the input id array [].
  setManyIds(itemIds: string[]) {
    this.clear();
    this.selectManyIds(itemIds)
  }

  /**
   * Set and replace current ids.
   * @param id
   */
  setId(id: string) {
    this.clear();
    this.selectId(id)
  }
}
