import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAddresses } from "../../DB/indexedDB";
import style from "./NewAddresses.module.css";
import AddButton from "../../Components/AddButton/AddButton";
import WorkArea from "../../Components/WorkArea/WorkArea";

const NewAddresses = () => {
	const [address, setAddress] = useState("");
	const [startDate, setStartDate] = useState("");
	const [workArea, setWorkArea] = useState("");
	const [inProgress, setInProgress] = useState(false);
	const navigate = useNavigate();

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
				await addAddresses({ address, startDate, workArea, inProgress });
				setAddress("");
				setStartDate("");
				setWorkArea("");
				setInProgress(false);
				navigate("/")
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
				<WorkArea value={workArea} onChange={(e) => setWorkArea(e.target.value)}/>
				<AddButton onClick={handleSubmit}>Добавить адрес</AddButton>
			</form>
		</div>
	);
};

export default NewAddresses;
