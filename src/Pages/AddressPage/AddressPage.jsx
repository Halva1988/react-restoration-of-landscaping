import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import Wrapper from "../../Components/Wrapper/Wrapper";
import ButtonChangeDetailed from "../../Components/ButtonChangeDetailed/ButtonChangeDetailed";
import {
	addPhotos,
	getPhotos,
	updateDetailedScopeOfWork,
	updateWorkArea,
} from "../../DB/indexedDB";
import Title from "../../Components/Title/Title";
import style from "./AddressPage.module.css";
import InputPhoto from "../../Components/Inputs/InputPhoto/InputPhoto";
import LiWorkArea from "../../Components/LiWorkArea/LiWorkArea";
import ShowPhoto from "../../Components/ShowPhoto/ShowPhoto";
import TitleDateWork from "../../Components/TitleDateWork/TitleDateWork";
import ShowOnMap from "../../Components/ShowOnMap/ShowOnMap";

export default function AddressPage() {
	const location = useLocation();
	const { address } = location.state;

	const detailed = address.detailedScopeOfWork;
	const [asphalt, setAsphalt] = useState(detailed.asphalt);
	const [soil, setSoil] = useState(detailed.soil);
	const [tiles, setTiles] = useState(detailed.tiles);
	const [curb, setCurb] = useState(detailed.curb);
	const [photos, setPhotos] = useState([]);

	const spanRef = useRef();

	const handleInputChange = (key) => (e) => {
		const stateSetter = {
			asphalt: setAsphalt,
			soil: setSoil,
			tiles: setTiles,
			curb: setCurb,
		}[key];

		stateSetter(e.target.value);
	};


	const handleWorkAreaChange = useCallback(async () => {
		const asphaltValue = parseInt(asphalt) || 0;
		const soilValue = parseInt(soil) || 0;
		const tilesValue = parseInt(tiles) || 0;
		const totalArea = asphaltValue + soilValue + tilesValue;
		spanRef.current.innerText = totalArea;
		await updateWorkArea(address.id, spanRef.current.innerText);
		await updateDetailedScopeOfWork(address.id, asphalt, soil, tiles, curb);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [asphalt, soil, tiles, curb, spanRef]);

	const handlePhotosAdd = useCallback(
		async (photos) => {
			const photosArray = [];
			for (let i = 0; i < photos.length; i++) {
				const file = photos[i];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function () {
					photosArray.push(reader.result);
					if (photosArray.length === photos.length) {
						addPhotos(address.id, photosArray)
						.then(() => {
							fetchPhotos();
						});
					}
				};
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[photos]
	);

	const fetchPhotos = useCallback(async () => {
		const photos = await getPhotos(address.id);
		setPhotos(photos);
	}, [address.id]);

	useEffect(() => {
		fetchPhotos();
	}, [fetchPhotos]);

	return (
		<Wrapper className={style.wrapper}>
			<Title title={address.locationAddress} />
			<TitleDateWork style={style} startDate={address.startDate} />
			<h4>
				Общая площадь работ: <span ref={spanRef}>{address.workArea}</span> м
				<sup>2</sup>
			</h4>
			<div className={style.detailed}>
				<ul>
					{/* асфальт */}
					<LiWorkArea
						handleInputChange={handleInputChange}
						style={style}
						work={asphalt}
						title="asphalt"
					/>
					{/* грунт */}
					<LiWorkArea
						handleInputChange={handleInputChange}
						style={style}
						work={soil}
						title="soil"
					/>
					{/* плитка */}
					<LiWorkArea
						handleInputChange={handleInputChange}
						style={style}
						work={tiles}
						title="tiles"
					/>
					{/* бордюр */}
					<li className={style.li}>
						Бордюр
						<div className={style.wrapDiv}>
							=
							<input
								type="number"
								value={curb}
								onChange={handleInputChange("curb")}
							/>
							шт.
						</div>
					</li>
				</ul>
				<ButtonChangeDetailed onClick={handleWorkAreaChange} />
				<InputPhoto add={handlePhotosAdd} />
			</div>
			<ShowOnMap link={address.mapLink} style={style} />
			<ShowPhoto photos={photos} style={style} />
		</Wrapper>
	);
}
