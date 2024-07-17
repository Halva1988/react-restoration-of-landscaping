import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAddresses, updateWorkArea } from "../../DB/indexedDB";
import Wrapper from "../../Components/Wrapper/Wrapper";
import style from "../AllAddresses/AllAddresses.module.css";
import UpdateWorkArea from "../../Components/WorkArea/UpdateWorkArea";

const InProgress = () => {
	const [progress, setProgress] = useState([]);

	useEffect(() => {
		const fetchAddresses = async () => {
			const progress = (await getAddresses()).filter((el) => !el.inProgress);
			setProgress(progress);
		};
		fetchAddresses();
	}, []);

	const handleWorkArea = async (id, newWorkArea) => {
		await updateWorkArea(id, newWorkArea);
	};

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
							<td>
								<Link to={`/addresses/${address.id}`}>
									{address.locationAddress}
								</Link>
								{address.mapLink &&
								<a href={address.mapLink} target="_blank">
									Открыть на карте
								</a>
								}
							</td>
							<td>{address.startDate}</td>
							<td>
								<UpdateWorkArea
									id={address.id}
									currentWorkArea={address.workArea}
									onUpdate={handleWorkArea}
								/>
							</td>
							<td>
								<Link to={`/addresses/${address.id}`}>
									{address.inProgress ? "Завершено" : "В процессе"}
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Wrapper>
	);
};

export default InProgress;
