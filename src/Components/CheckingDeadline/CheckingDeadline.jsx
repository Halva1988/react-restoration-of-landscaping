import { Link } from "react-router-dom";
import style from "./CheckingDeadline.module.css";

export default function CheckingDeadline({ addresses }) {
	const currentDate = new Date();
	let alarmStyle = "";

	return (
		<>
			{addresses &&
				addresses.map((address) => {
					const deadline = new Date(address.startDate);
					const diffTime = currentDate.getTime() - deadline.getTime();
					const diffDays = diffTime / (1000 * 60 * 60 * 24);

					if (!address.inProgress && diffDays >= 5) {
						alarmStyle = "urgently";
					} else if (!address.inProgress && diffDays >= 3) {
						alarmStyle = "faster";
					} else if (address.inProgress) {
						alarmStyle = "completed";
					}

					return (
						<tr key={address.id} className={`${style[alarmStyle]}`}>
							<td>
                <Link state={{address: address}} to={`/addresses/${address.id}`}>
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
					);
				})}
		</>
	);
}
