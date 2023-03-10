import { openDB } from 'idb';

const dbPromise = openDB('Foods', 1, {
  upgrade(db) {
    const store = db.createObjectStore('todaysFood', { autoIncrement: true });
    store.createIndex('timestamp', 'timestamp', { unique: false });
  }
});

const addFood = async (food) => {
  const db = await dbPromise;
  const tx = db.transaction('todaysFood', 'readwrite');
  const foodsStore = tx.objectStore('todaysFood');
  console.log(food);
  const res = await foodsStore.add(food);
  console.log(res);
  await tx.complete;
  await deleteOldRecords();
  return 'Food added successfully';
};

async function updateFood(timestamp, newValue) {
  const db = await dbPromise;
  const tx = db.transaction('todaysFood', 'readwrite');
  const store = tx.objectStore('todaysFood');
  const timestampIndex = store.index('timestamp');
  const cursor = await timestampIndex.openCursor(IDBKeyRange.only(timestamp));
  if (cursor) {
    const foodItem = cursor.value;
    const updatedValue = { ...foodItem, ...newValue };
    cursor.update(updatedValue);
    console.log('Item updated successfully:', updatedValue);
  } else {
    console.error('Item not found');
  }
  await tx.complete;
}

const getFoods = async () => {
  const db = await dbPromise;
  const tx = db.transaction('todaysFood', 'readonly');
  const foodsStore = tx.objectStore('todaysFood');
  return await foodsStore.getAll();
};

async function deleteOldRecords() {
  const db = await dbPromise;
  const dateThreshold = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days ago
  const tx = db.transaction('todaysFood', 'readwrite');
  const store = tx.objectStore('todaysFood');
  const oldRecords = await store.index('timestamp').openCursor(IDBKeyRange.upperBound(dateThreshold));
  oldRecords?.advance(100); // delete records in batches of 100
  while (oldRecords?.value) {
    store.delete(oldRecords.value.id);
    oldRecords?.continue();
  }
  await tx.complete;
}


export { addFood, getFoods, updateFood };