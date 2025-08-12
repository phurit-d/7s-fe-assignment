export enum ItemType {
  Fruit = 'Fruit',
  Vegetable = 'Vegetable',
}

export interface TodoItem {
  type: ItemType;
  name: string;
}
