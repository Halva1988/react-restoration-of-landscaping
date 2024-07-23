import { useState, useEffect } from "react";
import { getAddresses } from "../../DB/indexedDB";
import Wrapper from "../../Components/Wrapper/Wrapper";
import CheckingDeadline from "../../Components/CheckingDeadline/CheckingDeadline";
import TableAddress from "../../Components/Table/TableAddresses";
import { sortAddresses } from "../../Sort/Sort";
import Title from "../../Components/Title/Title";
import InputSearch from "../../Components/Inputs/InputSearch/InputSearch";

const AllAddresses = () => {
	const [addresses, setAddresses] = useState([]);
	const [filteredAddresses, setFilteredAddresses] = useState([]);
	const [sortConfig, setSortConfig] = useState({
		key: "",
		direction: "",
	});
	const [searchTerm, setSearchTerm] = useState("");

	const fetchAddresses = async () => {
		const fetchedAddresses = await getAddresses();
		setAddresses(fetchedAddresses);
		setFilteredAddresses(fetchedAddresses);
	};

	const handleSort = (key) => {
		const { sortData, newSortConfig } = sortAddresses(filteredAddresses, key, sortConfig);
		setFilteredAddresses(sortData);
		setSortConfig(newSortConfig);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		if (term.trim() === "") {
			setFilteredAddresses(addresses);
		} else {
			const filtered = addresses.filter(address =>
				address.locationAddress.toLowerCase().includes(term.toLowerCase())
			);
			setFilteredAddresses(filtered);
		}
	};

	useEffect(() => {
		fetchAddresses();
	}, []);

	useEffect(() => {
		handleSearch(searchTerm);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addresses, searchTerm]);

	return (
		<Wrapper>
			<Title title="Все адреса" />
			<InputSearch searchTerm={searchTerm} onSearch={handleSearch} />
			<TableAddress handleSort={handleSort}>
				<CheckingDeadline addresses={filteredAddresses} onComplete={fetchAddresses} />
			</TableAddress>
		</Wrapper>
	);
};

export default AllAddresses;
