import { openDB } from 'idb';
import { toRaw } from 'vue';

const dbPromise = openDB('Foods', 1, {
  upgrade(db) {
    db.createObjectStore('todaysFood', { autoIncrement: true });
  }
});

const addFood = async (food) => {
  const db = await dbPromise;
  const tx = db.transaction('todaysFood', 'readwrite');
  const foodsStore = tx.objectStore('todaysFood');
  const res = await foodsStore.add(food);
  console.log(res);
  await tx.complete;
  return 'Food added successfully';
};

const getFoods = async () => {
  const db = await dbPromise;
  const tx = db.transaction('todaysFood', 'readonly');
  const foodsStore = tx.objectStore('todaysFood');
  return await foodsStore.getAll();
};

export { addFood, getFoods };