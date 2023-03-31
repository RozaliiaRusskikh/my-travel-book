import "./Map.scss";
import map from "../../assets/images/travel-map.png";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function Map() {
  return (
    <section className="map-section">
      <div className="map-section__title-image-container">
        <h1 className="map-section__title"> My Travel World Map</h1>
        <img className="map-section__image" src={map} alt="travel map" />
      </div>
      <div className="map-section__map-container">
        <ComposableMap width="1200" style={{ width: "100%" }} data-tip="">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </section>
  );
}
export default Map;
