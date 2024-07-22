import { useState, useEffect } from "react";
import { getAddresses } from "../../DB/indexedDB";
import Wrapper from "../../Components/Wrapper/Wrapper";
import CheckingDeadline from "../../Components/CheckingDeadline/CheckingDeadline";
import TableAddress from "../../Components/Table/TableAddresses";
import { sortAddresses } from "../../Sort/Sort";

const AllAddresses = () => {
	const [addresses, setAddresses] = useState([]);
	const [sortConfig, setSortConfig] = useState({
		key: "",
		direction: "",
	});
	const fetchAddresses = async () => {
		const fetchedAddresses = await getAddresses();
		setAddresses(fetchedAddresses);
	};

	const handleSort = (key) => {
		const { sortData, newSortConfig } = sortAddresses(addresses, key, sortConfig);
		setAddresses(sortData);
		setSortConfig(newSortConfig)
	};

	useEffect(() => {
	}, [addresses]);

	useEffect(() => {
		fetchAddresses();
	}, []);

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
