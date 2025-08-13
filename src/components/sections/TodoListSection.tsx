import { ItemType, type TodoItem } from '@/types';
import { useRef, useState } from 'react';

const initialList: TodoItem[] = [
  {
    type: ItemType.Fruit,
    name: 'Apple',
  },
  {
    type: ItemType.Vegetable,
    name: 'Broccoli',
  },
  {
    type: ItemType.Vegetable,
    name: 'Mushroom',
  },
  {
    type: ItemType.Fruit,
    name: 'Banana',
  },
  {
    type: ItemType.Vegetable,
    name: 'Tomato',
  },
  {
    type: ItemType.Fruit,
    name: 'Orange',
  },
  {
    type: ItemType.Fruit,
    name: 'Mango',
  },
  {
    type: ItemType.Fruit,
    name: 'Pineapple',
  },
  {
    type: ItemType.Vegetable,
    name: 'Cucumber',
  },
  {
    type: ItemType.Fruit,
    name: 'Watermelon',
  },
  {
    type: ItemType.Vegetable,
    name: 'Carrot',
  },
];

export const TodoListSection = () => {
  const [mainList, setMainList] = useState<TodoItem[]>(initialList);
  const [fruitList, setFruitList] = useState<TodoItem[]>([]);
  const [vegetableList, setVegetableList] = useState<TodoItem[]>([]);

  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const moveToTypeList = (item: TodoItem) => {
    setMainList((prev) => prev.filter((i) => i.name !== item.name));

    if (item.type === 'Fruit') {
      setFruitList((prev) => [...prev, item]);
    } else {
      setVegetableList((prev) => [...prev, item]);
    }

    const timerId = setTimeout(() => {
      returnToMainList(item);
    }, 5000);

    timers.current.set(item.name, timerId);
  };

  const returnToMainList = (item: TodoItem) => {
    setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
    setMainList((prev) => [...prev, item]);

    const timerId = timers.current.get(item.name);
    if (timerId) {
      clearTimeout(timerId);
    }
    timers.current.delete(item.name);
  };

  return (
    <section>
      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          1. Auto Delete Todo List
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main Column */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b pb-2 text-xl font-bold text-gray-700">
            Main List
          </h3>
          <div className="space-y-2">
            {mainList.map((item) => (
              <button
                key={item.name}
                className="w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-left transition-colors duration-200 hover:bg-gray-200"
                onClick={() => moveToTypeList(item)}
              >
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({item.type})
                </span>
              </button>
            ))}
            {mainList.length === 0 && (
              <p className="py-4 text-center text-gray-500">
                No items in main list
              </p>
            )}
          </div>
        </div>

        {/* Fruit Column */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b border-red-200 pb-2 text-xl font-bold text-red-600">
            🍎 Fruits
          </h3>
          <div className="space-y-2">
            {fruitList.map((item) => (
              <button
                key={item.name}
                className="w-full rounded-md border border-red-200 bg-red-50 p-3 text-left transition-colors duration-200 hover:bg-red-100"
                onClick={() => returnToMainList(item)}
              >
                <span className="font-medium text-red-700">{item.name}</span>
              </button>
            ))}
            {fruitList.length === 0 && (
              <p className="py-4 text-center text-red-400">No fruits here</p>
            )}
          </div>
        </div>

        {/* Vegetable Column */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b border-green-200 pb-2 text-xl font-bold text-green-600">
            🥬 Vegetables
          </h3>
          <div className="space-y-2">
            {vegetableList.map((item) => (
              <button
                key={item.name}
                className="w-full rounded-md border border-green-200 bg-green-50 p-3 text-left transition-colors duration-200 hover:bg-green-100"
                onClick={() => returnToMainList(item)}
              >
                <span className="font-medium text-green-700">{item.name}</span>
              </button>
            ))}
            {vegetableList.length === 0 && (
              <p className="py-4 text-center text-green-400">
                No vegetables here
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 font-semibold text-blue-800">💡 How it works:</h3>
        <ul className="list-disc space-y-1 pl-6 text-sm text-blue-700">
          <li>Click any item in the main list to move it to its type column</li>
          <li>
            Items automatically return to the bottom of the main list after 5
            seconds
          </li>
          <li>
            Click items in Fruit/Vegetable columns to return them immediately
          </li>
        </ul>
      </div>
    </section>
  );
};
