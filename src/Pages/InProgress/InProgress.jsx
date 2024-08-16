import { useEffect, useState } from "react";
import Wrapper from "../../Components/Wrapper/Wrapper";
import { getAddresses } from "../../DB/indexedDB";
import CheckingDeadline from "../../Components/CheckingDeadline/CheckingDeadline";
import plug from "/nothing.png";
import TableAddress from "../../Components/Table/TableAddresses";
import {sortAddresses} from "../../Sort/Sort";
import Title from "../../Components/Title/Title";

const InProgress = () => {
	const [progress, setProgress] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

	const fetchInProgressAddresses = async () => {
		const progress = (await getAddresses()).filter((el) => !el.inProgress);
		setProgress(progress);
	}

	const handleSort = (key) => {
    const { sortData, newSortConfig } = sortAddresses(progress, key, sortConfig);
    setProgress(sortData);
    setSortConfig(newSortConfig)
	};

	useEffect(() => {
	}, [progress]);

	useEffect(() => {
		fetchInProgressAddresses();
	}, []);

	return (
		<Wrapper>
			<Title title="Адреса в работе"/>
			<TableAddress handleSort={handleSort}>
				<CheckingDeadline
					addresses={progress}
					onComplete={fetchInProgressAddresses}
				/>
			</TableAddress>
			{progress.length === 0 && (
				<img src={plug} alt="nothing" style={{ marginTop: "10px" }} />
			)}
		</Wrapper>
	);
};

export default InProgress;
