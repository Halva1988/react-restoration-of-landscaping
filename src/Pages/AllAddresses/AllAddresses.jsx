import { useState, useEffect, useCallback } from "react";
import { getAddresses } from "../../DB/indexedDB";
import Wrapper from "../../Components/Wrapper/Wrapper";
import style from "./AllAddresses.module.css";
import CheckingDeadline from "../../Components/CheckingDeadline/CheckingDeadline";

const AllAddresses = () => {
	const [addresses, setAddresses] = useState([]);

	const fetchAddresses = useCallback(async () => {
		const addresses = await getAddresses();
		setAddresses(addresses);
	}, [])

	useEffect(() => {
		fetchAddresses()
	}, [fetchAddresses]);

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
					<CheckingDeadline addresses={addresses} onComplete={fetchAddresses}/>
				</tbody>
			</table>
		</Wrapper>
	);
};

export default AllAddresses;
