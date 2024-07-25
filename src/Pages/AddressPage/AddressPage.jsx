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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function AddressPage() {
	const location = useLocation();
	const { address } = location.state;

	const detailed = address.detailedScopeOfWork;
	const [asphalt, setAsphalt] = useState(detailed.asphalt);
	const [soil, setSoil] = useState(detailed.soil);
	const [tiles, setTiles] = useState(detailed.tiles);
	const [curb, setCurb] = useState(detailed.curb);
	const [photos, setPhotos] = useState([]);

	const pRef = useRef();

	const option = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const date = new Date(address.startDate).toLocaleString("ru", option);

	const handleInputChange = (key) => (e) => {
		console.log("5");
		const stateSetter = {
			asphalt: setAsphalt,
			soil: setSoil,
			tiles: setTiles,
			curb: setCurb,
		}[key];

		stateSetter(e.target.value);
	};

	const handleChange = useCallback(async () => {
		console.log("6");
		const asphaltValue = parseInt(asphalt) || 0;
		const soilValue = parseInt(soil) || 0;
		const tilesValue = parseInt(tiles) || 0;
		const totalArea = asphaltValue + soilValue + tilesValue;
		pRef.current.innerText = totalArea;
		await updateWorkArea(address.id, pRef.current.innerText);
		await updateDetailedScopeOfWork(address.id, asphalt, soil, tiles, curb);
	}, [asphalt, soil, tiles, curb, address.id, pRef]);

	const handlePhotosChange = useCallback(
		async (photos) => {
			const photosArray = [];
			for (let i = 0; i < photos.length; i++) {
				const file = photos[i];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function () {
					photosArray.push(reader.result);
					if (photosArray.length === photos.length) {
						addPhotos(address.id, photosArray).then(() => {
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

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Wrapper className={style.wrapper}>
			<Title title={address.locationAddress} />
			<h3 className={style.dateWork}>Дата начала работ: {date}</h3>
			<h4>
				Общая площадь работ: <span ref={pRef}>{address.workArea}</span> м
				<sup>2</sup>
			</h4>
			<div className={style.detailed}>
				<ul>
					<li className={style.li}>
						Асфальт <div className={style.wrapDiv}> 
							=
							<input
								type="number"
								value={asphalt}
								onChange={handleInputChange("asphalt")}
							/>
							м<sup>2</sup>
						</div>
					</li>
					{/* асфальт */}
					<li className={style.li}>
						Грунт <div className={style.wrapDiv}> 
							=
							<input
								type="number"
								value={soil}
								onChange={handleInputChange("soil")}
							/>
							м<sup>2</sup>
						</div>
					</li>
					{/* грунт */}
					<li className={style.li}>
						Плитка <div className={style.wrapDiv}> 
							=
							<input
								type="number"
								value={tiles}
								onChange={handleInputChange("tiles")}
							/>
							м<sup>2</sup>
						</div>
					</li>
					{/* плитка */}
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
					{/* бордюр */}
				</ul>
				<ButtonChangeDetailed onClick={handleChange} />
				<InputPhoto onChange={handlePhotosChange} />
			</div>
			{address.mapLink && (
				<h4 className={style.linkMap}>
					<a className={style.link} href={address.mapLink} target="_blank">
						Показать на карте
					</a>
				</h4>
			)}

			{photos.length > 1 ? (
				<Slider {...sliderSettings} className={style.slider}>
					{photos.map((photo, index) => (
						<div key={index}>
							<img src={photo} alt={`photo-${index}`} />
						</div>
					))}
				</Slider>
			) : (photos.length === 1 &&
				<div className={style.slider}>
					<img src={photos} alt={"photo"} />
				</div>
			)}
		</Wrapper>
	);
}
