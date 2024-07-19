
import style from "./TableAddresses.module.css";

export default function TableAddress({ children, handleSort }) {

	return (
		<table className={style.table}>
			<thead>
				<tr>
					<th onClick={() => handleSort("locationAddress")}>Адрес</th>
					<th onClick={() => handleSort("startDate")}>Дата начала работ</th>
					<th onClick={() => handleSort("workArea")}>
						Площадь работ (м<sup>2</sup>)
					</th>
					<th onClick={() => handleSort("inProgress")}>Выполнение</th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
}
