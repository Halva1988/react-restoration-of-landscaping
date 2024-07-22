import { useLocation } from "react-router-dom";
import { useState } from "react";
import Wrapper from "../../Components/Wrapper/Wrapper";
import ButtonChangeDetailed from "../../Components/ButtonChangeDetailed/ButtonChangeDetailed";
import { updateDetailedScopeOfWork } from "../../DB/indexedDB";

export default function AddressPage() {
	const location = useLocation();
	const { address } = location.state;

	const detailed = address.detailedScopeOfWork
	const [asphalt, setAsphalt] = useState(detailed.asphalt)
	const [soil, setSoil] = useState(detailed.soil)
	const [tiles, setTiles] = useState(detailed.tiles)
	const [curb, setCurb] = useState(detailed.curb)

	const option = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const date = new Date(address.startDate).toLocaleString("ru", option);

	const onChangeAsphalt = (e) => setAsphalt(e.target.value)
	const onChangeSoil = (e) => setSoil(e.target.value)
	const onChangeTiles = (e) => setTiles(e.target.value)
	const onChangeCurb = (e) => setCurb(e.target.value)

	const handleChange = async () => {
		await updateDetailedScopeOfWork(address.id, asphalt, soil, tiles, curb )
	}


	return (
		<Wrapper>
			<div>{address.locationAddress}</div>
			<p>Дата начала работ: {date}</p>
			<p>
				Общая площадь работ: {address.workArea} м<sup>2</sup>
			</p>
			<ul>
				<li>Асфальт = <input type="number" value={asphalt} onChange={onChangeAsphalt} />м<sup>2</sup></li>  {/* асфальт */}
				<li>Грунт = <input type="number" value={soil} onChange={onChangeSoil} />м<sup>2</sup></li>          {/* грунт */}
				<li>Плитка = <input type="number" value={tiles} onChange={onChangeTiles} />м<sup>2</sup></li>       {/* плитка */}
				<li>Бордюр = <input type="number" value={curb} onChange={onChangeCurb} />шт.</li>                   {/* бордюр */}
			</ul>

			<ButtonChangeDetailed onClick={handleChange}/>
			<p><a href={address.mapLink} target="_blank">Показать на карте</a></p>
		</Wrapper>
	);
}
