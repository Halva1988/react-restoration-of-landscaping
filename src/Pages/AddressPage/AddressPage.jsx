import { useLocation } from "react-router-dom";
import Wrapper from "../../Components/Wrapper/Wrapper";

export default function AddressPage() {
	const location = useLocation();
	const { address } = location.state;

	const option = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const date = new Date(address.startDate).toLocaleString("ru", option);

	return (
		<Wrapper>
			<div>{address.locationAddress}</div>
			<p>Дата начала работ: {date}</p>
			<p>
				Общая площадь работ: {address.workArea} м<sup>2</sup>
			</p>
			<p><a href={address.mapLink} target="_blank">Показать на карте</a></p>
		</Wrapper>
	);
}
