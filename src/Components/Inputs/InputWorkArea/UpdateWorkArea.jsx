// import { useState } from "react";

// const UpdateWorkArea = ({ id, currentWorkArea, onUpdate }) => {
// 	const [workArea, setWorkArea] = useState(currentWorkArea);

// 	const handleChange = (e) => {
// 		setWorkArea(e.target.value < 1 ? '' :e.target.value);
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		onUpdate(id, workArea);
// 	};

// 	return (
// 		<>
// 			<form>
// 				<input type="number" value={workArea} onChange={handleChange} min="1" />
// 				<button onClick={handleSubmit}>Обновить</button>
// 			</form>
// 		</>
// 	);
// };

// export default UpdateWorkArea;
