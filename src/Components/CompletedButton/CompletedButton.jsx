import { useRef, useState } from "react";
import { updateInProgress } from "../../DB/indexedDB";
import Tooltip from "../Tooltip/Tooltip";
import style from "./CompletedButton.module.css";

export default function CompletedButton({ address, onComplete }) {
	const [isMouseEnter, setIsMouseEnter] = useState(false);
	const refSetTimeout = useRef();

	const handleInProgress = async () => {
		await updateInProgress(address.id);
		onComplete();
	};

	const handleMouseEnter = () => {
		refSetTimeout.current = setTimeout(() => setIsMouseEnter(true), 500);
	};

	const handleMouseLeave = () => {
		clearTimeout(refSetTimeout.current);
		setIsMouseEnter(false);
	};

	return (
		<>
			<button
				onClick={handleInProgress}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={style.btn}
			>
				&#9989;
			</button>
			{isMouseEnter && <Tooltip text="Завершить" />}
		</>
	);
}
