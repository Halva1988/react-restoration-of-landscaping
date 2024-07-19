import { useState, useEffect, useCallback } from "react";
import { getAddresses } from "../../DB/indexedDB";
import Wrapper from "../../Components/Wrapper/Wrapper";
import CheckingDeadline from "../../Components/CheckingDeadline/CheckingDeadline";
import TableAddress from "../../Components/Table/TableAddresses";
import sortAddresses from "../../Sort/Sort";

const AllAddresses = () => {
	const [addresses, setAddresses] = useState([]);
	const [sortBy, setSortBy] = useState("startDate");

	const fetchAddresses = useCallback(async () => {
		const addresses = await getAddresses();
		const newSortAddresses = sortAddresses(addresses, sortBy);
		setAddresses(newSortAddresses);
	}, [sortBy]);

	const handleSort = (key) => {
		setSortBy(key);
	};

	useEffect(() => {
		fetchAddresses();
	}, [fetchAddresses]);

	return (
		<Wrapper>
			<h1>Все адреса</h1>
			<TableAddress handleSort={handleSort}>
				<CheckingDeadline addresses={addresses} onComplete={fetchAddresses} />
			</TableAddress>
		</Wrapper>
	);
};

export default AllAddresses;
