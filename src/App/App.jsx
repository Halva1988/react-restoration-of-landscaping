import { Routes, Route, NavLink } from "react-router-dom";

import NewAddresses from "../Pages/NewAddresses/NewAddresses";
import style from "./App.module.css";
import btn from "../Components/AddButton/AddButton.module.css";
import AllAddresses from "../Pages/AllAddresses/AllAddresses";
import InProgress from "../Pages/InProgress/InProgress";



const App = () => {
	
	const setActive = ({ isActive }) => (isActive ? style.activeLink : "");

	return (
		<>
			<nav>
				<ul className={style.ul}>
					<NavLink
						to="/add"
						className={({ isActive }) =>
							`${setActive({ isActive })} ${btn.btn} ${btn.btn__Nav}`
						}
					>
						Добавить адрес
					</NavLink>
					<NavLink
						to="/"
						className={({ isActive }) =>
							`${setActive({ isActive })} ${btn.btn} ${btn.btn__Nav}`
						}
					>
						В работе
					</NavLink>
					<NavLink
						to="/all"
						className={({ isActive }) =>
							`${setActive({ isActive })} ${btn.btn} ${btn.btn__Nav}`
						}
					>
						Все адреса
					</NavLink>
				</ul>
			</nav>
			<Routes>
				<Route path="/add" element={<NewAddresses />} />
				<Route path="/" element={<InProgress />} />
				<Route path="/all" element={<AllAddresses />} />
			</Routes>
		</>
	);
};

export default App;
