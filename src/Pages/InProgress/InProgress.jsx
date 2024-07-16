import { useEffect, useState } from "react";
import { getAddresses } from "../../DB/indexedDB";
import Wrapper from "../../Components/Wrapper/Wrapper";
import style from "../AllAddresses/AllAddresses.module.css";

const InProgress = () => {
	const [progress, setProgress] = useState([]);

	useEffect(() => {
		const fetchAddresses = async () => {
			const progress = (await getAddresses()).filter((el) => !el.inProgress);
			setProgress(progress);
		};
		fetchAddresses();
	}, []);

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
					{progress.map((address) => (
						<tr key={address.id}>
							<td>{address.address}</td>
							<td>{address.startDate}</td>
							<td>{address.workArea}</td>
							<td>{address.inProgress ? "Завершено" : "В процессе"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Wrapper>
	);
};

export default InProgress;
