import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAddresses } from "../../DB/indexedDB";
import Wrapper from "../../Components/Wrapper/Wrapper";
import style from "./AllAddresses.module.css";

const AllAddresses = () => {
	const [addressee, setAddresses] = useState([]);

	useEffect(() => {
		const fetchAddresses = async () => {
			const addresses = await getAddresses();
			setAddresses(addresses);
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
					{addressee.map((address) => (
						<tr key={address.id}>
							<td>
								<Link to={`/addresses/${address.id}`}>
									{address.locationAddress}
								</Link>
								{address.mapLink && (
									<a href={address.mapLink} target="_blank">
										Открыть на карте
									</a>
								)}
							</td>
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

export default AllAddresses;
