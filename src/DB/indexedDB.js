import { openDB } from "idb";

const dbPromise = openDB("addresses-db", 1, {
	upgrade(db) {
		if (!db.objectStoreNames.contains("addresses")) {
			db.createObjectStore("addresses", { keyPath: "id", autoIncrement: true });
		}
	},
});

export const addAddresses = async (address) => {
	const db = await dbPromise;
	await db.add("addresses", address);
};

export const getAddresses = async () => {
	const db = await dbPromise;
	return db.getAll("addresses");
};

export const updateWorkArea = async (id, newWorkArea) => {
	const db = await dbPromise;
	const tx = db.transaction('addresses', 'readwrite');
	const store = tx.objectStore('addresses');

	const address = await store.get(id);
	if (address) {
		address.workArea = newWorkArea;
		await store.put(address)
	}

	await tx.done;
}

export const updateInProgress = async (id) => {
	const db = await dbPromise;
	const tx = db.transaction('addresses', 'readwrite');
	const store = tx.objectStore('addresses');

	const address = await store.get(id);
	if (address) {
		address.inProgress = true;
		await store.put(address)
	}

	await tx.done;
}

export const updateDetailedScopeOfWork = async (id, asphalt, soil, tiles, curb) => {
	const db = await dbPromise;
	const tx = db.transaction('addresses', 'readwrite');
	const store = tx.objectStore('addresses');

	const address = await store.get(id);
	if (address) {
		address.detailedScopeOfWork.asphalt = asphalt;
		address.detailedScopeOfWork.soil = soil;
		address.detailedScopeOfWork.tiles = tiles;
		address.detailedScopeOfWork.curb = curb;
		await store.put(address)
	}

	await tx.done;
}