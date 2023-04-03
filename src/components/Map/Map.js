import "./Map.scss";
import map from "../../assets/images/travel-map.png";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const markers = [
  {
    name: "Amman",
    coordinates: [35.9336, 31.9632],
  },
  {
    name: "Tbilisi",
    coordinates: [44.793, 41.7151],
  },
  {
    name: "Cancun",
    coordinates: [-86.8475, 21.1619],
  },
  {
    name: "Rome",
    coordinates: [12.4964, 41.9028],
  },
  {
    name: "Minsk",
    coordinates: [27.5615, 53.9045],
  },
  {
    name: "Saint Petersburg",
    coordinates: [30.3351, 59.9343],
  },
  {
    name: "Kazan",
    coordinates: [49.1221, 55.7878],
  },
  {
    name: "Vancouver",
    coordinates: [-123.1207, 49.2827],
  },
  {
    name: "Calgary",
    coordinates: [-114.0719, 51.0447],
  },
  {
    name: "Toronto",
    coordinates: [-79.3832, 43.6532],
  },
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function Map() {
  const [tooltip, setTooltip] = useState("");

  return (
    <section className="map-section">
      <div className="map-section__title-image-container">
        <h1 className="map-section__title"> Map of My Favorite Places</h1>
        <img className="map-section__image" src={map} alt="travel map" />
      </div>
      <ReactTooltip anchorSelect="#anchor-element-id" place="bottom">
        {tooltip}
      </ReactTooltip>
      <div className="map-section__map-container">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 150 }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    className="map-section__geography"
                    id="anchor-element-id"
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setTooltip(name);
                    }}
                    onMouseLeave={() => {
                      setTooltip("");
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle className="map-section__circle" r={5} strokeWidth={1.5} />
                <text
                  className="map-section__text"
                  textAnchor="end"
                  y={-10}
                  alignmentBaseline="middle"
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </section>
  );
}
export default Map;
