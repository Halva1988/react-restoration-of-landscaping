import { Link } from "react-router-dom";
import style from "./CheckingDeadline.module.css";
import CompletedButton from "../CompletedButton/CompletedButton";

export default function CheckingDeadline({ addresses, onComplete }) {
	const currentDate = new Date();

	const checkStyle = (address) => {
		const deadline = new Date(address.startDate);
		const diffTime = currentDate.getTime() - deadline.getTime();
		const diffDays = diffTime / (1000 * 60 * 60 * 24);

		if (address.inProgress) {
			return "completed";
		} else if (!address.inProgress && diffDays >= 5) {
			return "urgently";
		} else if (!address.inProgress && diffDays >= 3) {
			return "faster";
		} else {
      return ""
    }
	};

	return (
		<>
			{addresses &&
				addresses.map((address) => {
          const alarmStyle = checkStyle(address);

					return (
            <tr key={address.id} className={`${style[alarmStyle]}`}>
							<td>
								<Link
									state={{ address: address }}
									to={`/addresses/${address.id}`}
								>
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
							<td>
								{address.inProgress ? "Завершено" : "В процессе"}
								{!address.inProgress && <CompletedButton address={address} onComplete={onComplete}/>}
							</td>
						</tr>
					);
				})}
		</>
	);
}
