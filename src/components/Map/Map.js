import "./Map.scss";
import map from "../../assets/images/travel-map.png";
import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function Map() {
  const [tooltip, setTooltip] = useState("");
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((response) => {
        setMarkers(response.data);
      })
      .catch((error) => {
        console.error(
          "We are having a problem accessing the posts API: " + error
        );
      });
  }, []);

  if (!markers) {
    return <h3 className="loading">Loading...</h3>;
  }

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
            {markers.map(({ name, long, lat }) => (
              <Marker key={name} coordinates={[long, lat]}>
                <circle
                  className="map-section__circle"
                  r={6}
                  strokeWidth={1.5}
                />
                <text
                  className="map-section__text"
                  textAnchor="end"
                  y={-12}
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
