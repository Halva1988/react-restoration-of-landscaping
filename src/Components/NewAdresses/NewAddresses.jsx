import { useState } from "react";
import { addAddresses } from "../../DB/indexedDB";
import style from "./NewAddresses.module.css";
import AddButton from "../AddButton/AddButton";

const NewAddresses = () => {
	const [address, setAddress] = useState("");
	const [startDate, setStartDate] = useState("");
	const [workArea, setWorkArea] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const selectedDate = new Date(startDate);
		const currentDate = new Date();

		if (selectedDate > currentDate) {
			alert("Дата начала работ не может быть больше текущей даты");
			return;
		}

		if (address && startDate) {
			try {
				await addAddresses({ address, startDate, workArea });
				setAddress("");
				setStartDate("");
				setWorkArea("");
			} catch (error) {
				console.error(error); //!TODO Add error component
			}
		} else {
			alert("Заполните поля: адрес и дата начала работ");
		}
	};

	return (
		<div className={style.formAddAddress}>
			<h1>Добавь новый адрес</h1>
			<form className={style.form}>
				<label>
					<p>Адрес:</p>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
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
				<label>
					<p>Площадь работ (м<sup>2</sup>):</p>
					<input
						type="text"
						value={workArea}
						onChange={(e) => setWorkArea(e.target.value)}
					/>
				</label>
				<AddButton onClick={handleSubmit}>Добавить адрес</AddButton>
			</form>
		</div>
	);
};

export default NewAddresses;
