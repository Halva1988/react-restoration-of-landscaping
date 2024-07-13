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
