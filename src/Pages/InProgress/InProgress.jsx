import { useEffect, useState, useCallback } from "react";
import Wrapper from "../../Components/Wrapper/Wrapper";
import style from "../AllAddresses/AllAddresses.module.css";
import { getAddresses } from "../../DB/indexedDB";
import CheckingDeadline from "../../Components/CheckingDeadline/CheckingDeadline";
import plug from "/nothing.png";

const InProgress = () => {
	const [progress, setProgress] = useState([]);

	const fetchInProgressAddresses = useCallback(async () => {
		const progress = (await getAddresses()).filter((el) => !el.inProgress);
		setProgress(progress);
	}, []);

	useEffect(() => {
		fetchInProgressAddresses();
	}, [fetchInProgressAddresses]);

	return (
		<Wrapper>
			<h1>Все адреса</h1>
			<table className={style.table}>
				<thead>
					<tr>
						<th>Адрес</th>
						<th>Дата начала работ</th>
						<th>
							Площадь работ (м<sup>2</sup>)
						</th>
						<th>Выполнение</th>
					</tr>
				</thead>
				<tbody>
					<CheckingDeadline
						addresses={progress}
						onComplete={fetchInProgressAddresses}
					/>
				</tbody>
			</table>
			{progress.length === 0 && <img src={plug} alt="nothing" />}
		</Wrapper>
	);
};

export default InProgress;
