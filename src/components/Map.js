import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import L, { LatLng, Layer } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import omnivore from "leaflet-omnivore";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: shadow,
});

const baseUrl = "http://localhost:3000/";
const url = [
  baseUrl + "/" + "20210523-093741.gpx",
  baseUrl + "/" + "20210523-114009.gpx",
];

const GpxLayer = (props) => {
  const context = useLeafletContext();

  useEffect(() => {
    const gj = L.geoJSON(null, {
      style: function (feature) {
        return { color: props.color };
      },
    });
    const gpx = omnivore.gpx(props.url, null, gj);
    const container = context.layerContainer || context.map;
    container.addLayer(gpx);

    return () => {
      container.removeLayer(gpx);
    };
  }, []);
  return null;
};

const appid = "69a7c858bbd98081b180a27d1efcf4b7";

const Map = () => {
  const p = [36.0295972109002, 140.05612749536903];
  return (
    <MapContainer center={p} zoom={16}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Ocean Basemap">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}"
            maxZoom={13}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Cloud">
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${appid}`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${appid}`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Pressure">
          <TileLayer
            url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${appid}`}
          />
        </LayersControl.Overlay>
        <TileLayer
          url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${appid}`}
        />
        <LayersControl.Overlay name="Temparature">
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${appid}`}
          />
        </LayersControl.Overlay>
      </LayersControl>
      <Marker position={p} />
      <GpxLayer url={url[0]} color={"#e60033"} />
      <GpxLayer url={url[1]} color={"#0095d9"} />
    </MapContainer>
  );
};

export default Map;
