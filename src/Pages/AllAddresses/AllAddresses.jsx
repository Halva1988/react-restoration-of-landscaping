import { useState, useEffect } from "react";
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
					</tr>
				</thead>
				<tbody>
					{addressee.map((address) => (
						<tr key={address.id}>
							<td>{address.address}</td>
							<td>{address.startDate}</td>
							<td>{address.workArea}</td>
						</tr>
					))}
				</tbody>
			</table>
			<ul></ul>
		</Wrapper>
	);
};

export default AllAddresses;
