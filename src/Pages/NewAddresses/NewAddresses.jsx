import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAddresses } from "../../DB/indexedDB";
import style from "./NewAddresses.module.css";
import AddButton from "../../Components/AddButton/AddButton";
import WorkArea from "../../Components/WorkArea/WorkArea";
import Map from "../../Components/Map/Map";

const NewAddresses = () => {
	const [startDate, setStartDate] = useState("");
	const [workArea, setWorkArea] = useState(1);
	const [inProgress, setInProgress] = useState(false);
	const [locationAddress, setLocationAddress] = useState("");
	const [mapLink, setMapLink] = useState("");
	const navigate = useNavigate();

	const handleLocationSelect = ({ address: { road, house_number, city_district }, lat, lon }) => {
		const locationAddress = [road, house_number, city_district].filter(Boolean).join(', ');
		setMapLink(`https://www.google.com/maps?q=${lat},${lon}&z=14`);
		setLocationAddress(locationAddress);
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
				setLocationAddress("");
				setMapLink("");
				setStartDate("");
				setWorkArea(1);
				setInProgress(false);
				navigate("/");
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("Заполните поля: адрес и дата начала работ"); //!TODO Add error component
		}
	};

	return (
		<div className={style.formAddAddress}>
			<h1>Добавь новый адрес</h1>
			<form className={style.form}>
				<Map onLocationSelect={handleLocationSelect} />
				<label>
					<p>Адрес:</p>
					<input
						type="text"
						value={locationAddress}
						onChange={(e) => setLocationAddress(e.target.value)}
						required
					/>
				</label>
				<label>
					<p>Дата начала работ:</p>
					<input
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						required
					/>
				</label>
				<WorkArea
					value={workArea}
					onChange={(e) => setWorkArea(e.target.value)}
				/>
				<AddButton onClick={handleSubmit}>Добавить адрес</AddButton>
			</form>
		</div>
	);
};

export default NewAddresses;
