import { useEffect, useState, useCallback } from "react";
import Wrapper from "../../Components/Wrapper/Wrapper";
import { getAddresses } from "../../DB/indexedDB";
import CheckingDeadline from "../../Components/CheckingDeadline/CheckingDeadline";
import plug from "/nothing.png";
import TableAddress from "../../Components/Table/TableAddresses";
import sortAddresses from "../../Sort/Sort";

const InProgress = () => {
	const [progress, setProgress] = useState([]);
	const [sortBy, setSortBy] = useState("startDate");

	const fetchInProgressAddresses = useCallback(async () => {
		const progress = (await getAddresses()).filter((el) => !el.inProgress);
		const newSortAddresses = sortAddresses(progress, sortBy);
		setProgress(newSortAddresses);
	}, [sortBy]);

	const handleSort = (key) => {
		setSortBy(key);
	};

	useEffect(() => {
		fetchInProgressAddresses();
	}, [fetchInProgressAddresses]);

	return (
		<Wrapper>
			<h1>Все адреса</h1>
			<TableAddress handleSort={handleSort}>
				<CheckingDeadline
					addresses={progress}
					onComplete={fetchInProgressAddresses}
				/>
			</TableAddress>
			{progress.length === 0 && <img src={plug} alt="nothing" />}
		</Wrapper>
	);
};

export default InProgress;
