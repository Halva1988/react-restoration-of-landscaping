import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAddresses } from "../../DB/indexedDB";
import style from "./NewAddresses.module.css";
import AddButton from "../../Components/AddButton/AddButton";
import Map from "../../Components/Map/Map";
import InputNewAddress from "../../Components/Inputs/InputNewAddress/InputNewAddress";
import InputStartDate from "../../Components/Inputs/InputStartDate/InputStartDate";
import InputWorkArea from "../../Components/Inputs/InputWorkArea/InputWorkArea";

const NewAddresses = () => {
	const [startDate, setStartDate] = useState("");
	const [workArea, setWorkArea] = useState(1);
	const [locationAddress, setLocationAddress] = useState("");
	const inProgress = false;
	const [mapLink, setMapLink] = useState("");
	const navigate = useNavigate();

	const handleLocationSelect = ({
		address: { road, house_number, city_district },
		lat,
		lon,
	}) => {
		const handleLocationAddress = [road, house_number, city_district].join(", ");
		setMapLink(`https://www.google.com/maps?q=${lat},${lon}&z=14`);
		setLocationAddress(handleLocationAddress);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const selectedDate = new Date(startDate);
		const currentDate = new Date();

		if (selectedDate > currentDate) {
			alert("Дата начала работ не может быть больше текущей даты");
			return;
		}

		if (locationAddress && startDate) {
			try {
				await addAddresses({
					locationAddress,
					mapLink,
					startDate,
					workArea,
					inProgress,
				});
				navigate("/");
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("Заполните поля: адрес и дата начала работ");
		}
	};
	
	const onChangeLocationAddress = (e) => setLocationAddress(e.target.value);
	const onChangeStartDate = (e) => setStartDate(e.target.value);
	const onChangeWorkArea = (e) => setWorkArea(e.target.value);


	return (
		<div className={style.formAddAddress}>
			<h1>Добавь новый адрес</h1>
			<form className={style.form}>
				<Map onLocationSelect={handleLocationSelect} />
				<InputNewAddress
					onChange={onChangeLocationAddress}
					value={locationAddress}
				/>
				<InputStartDate
					onChange={onChangeStartDate}
					value={startDate}
				/>
				<InputWorkArea
					onChange={onChangeWorkArea}
					value={workArea}
				/>
				<AddButton onClick={handleSubmit}>Добавить адрес</AddButton>
			</form>
		</div>
	);
};

export default NewAddresses;
