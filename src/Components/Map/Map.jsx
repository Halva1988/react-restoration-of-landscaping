import { memo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import style from './Map.module.css';

export default memo(function Map({ onLocationSelect }) {
	const [markerPosition, setMarkerPosition] = useState(null);
	
	const LocationMarker = () => {
		useMapEvents({
			click(e) {
				setMarkerPosition(e.latlng);
				fetch(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
				)
					.then((res) => res.json())
					.then((data) => {
						onLocationSelect(data);
					})
					.catch((error) => console.error('Ошибка: ', error));
			},
		});

		return markerPosition === null ? null : (
			<Marker position={markerPosition}></Marker>
		);
	};

	return (
		<MapContainer className={style.map}
			center={[59.997280, 30.262751]}
			zoom={13}
			style={{ height: "400px", width: "100%", radius: "20px" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<LocationMarker />
		</MapContainer>
	);
}
)
