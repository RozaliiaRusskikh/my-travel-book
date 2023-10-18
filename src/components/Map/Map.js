import "./Map.scss";
import map from "../../assets/images/travel-map.png";
import { getData } from "../../utils/api-utils";
import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Link } from "react-router-dom";

const geoUrl = "/world-50m.json";

function Map() {
  const [tooltip, setTooltip] = useState("");
  const [markers, setMarkers] = useState(null);
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getData(`${baseURL}/posts`, setMarkers);
  }, [baseURL]);

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
          {markers.map(({ name, long, lat, id }) => (
            <Marker key={name} coordinates={[long, lat]}>
              <Link to={`/travel-notes/${id}`}>
                <circle
                  className="map-section__circle"
                  r={7}
                  strokeWidth={1.5}
                />
              </Link>
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
        </ComposableMap>
      </div>
    </section>
  );
}
export default Map;
