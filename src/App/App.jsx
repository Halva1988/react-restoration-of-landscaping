import { Routes, Route, Link } from "react-router-dom";

import NewAddresses from "../Pages/NewAddresses/NewAddresses";
import style from "./App.module.css";
import btn from "../Components/AddButton/AddButton.module.css";
import AllAddresses from "../Pages/AllAddresses/AllAddresses";

function App() {
	return (
		<>
			<nav>
				<ul className={style.nav}>
					<li className={`${btn.btn} ${btn.btn__Nav}`}>
						<Link to="/">Добавить адрес</Link>
					</li>
					<li className={`${btn.btn} ${btn.btn__Nav}`}>
						<Link to='/all'>Все адреса</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/" element={<NewAddresses />} />
				<Route path="/all" element={<AllAddresses />} />
			</Routes>
		</>
	);
}

export default App;
