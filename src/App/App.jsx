import { Routes, Route, NavLink } from "react-router-dom";

import NewAddresses from "../Pages/NewAddresses/NewAddresses";
import style from "./App.module.css";
import btn from "../Components/AddButton/AddButton.module.css";
import AllAddresses from "../Pages/AllAddresses/AllAddresses";
import InProgress from "../Pages/InProgress/InProgress";

const App = () => {
	return (
		<>
			<nav>
				<ul className={style.nav}>
					<NavLink
						to="/add"
						className={({ isActive }) =>
							`${btn.btn} ${btn.btn__Nav} ${isActive ? style.activeLink : ""}`
						}
					>
						Добавить адрес
					</NavLink>
					<NavLink
						to="/"
						className={({ isActive }) =>
							`${btn.btn} ${btn.btn__Nav} ${isActive ? style.activeLink : ""}`
						}
					>
						В работе
					</NavLink>
					<NavLink
						to="/all"
						className={({ isActive }) =>
							`${btn.btn} ${btn.btn__Nav} ${isActive ? style.activeLink : ""}`
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
