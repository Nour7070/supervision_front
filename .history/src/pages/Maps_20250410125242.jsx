import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolateGreens } from "d3-scale-chromatic";

const countryData = {
  USA: 4200, FRA: 2500, MAR: 1800, EGY: 3100, SAU: 2700,
  ALG: 1500, IND: 2200, BEL: 1300, GUI: 1900, KEN: 1600,
  CAN: 1400, AUS: 1100, BRA: 950, UK: 850, TUN: 2000,
};

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const countryNames = {
  USA: "États-Unis", FRA: "France", MAR: "Maroc", 
  EGY: "Égypte", SAU: "Arabie Saoudite", IND: "Inde",
  CAN: "Canada", AUS: "Australie", BRA: "Brésil",
  UK: "Royaume-Uni", TUN: "Tunisie", ALG: "Algérie",
  BEL: "Belgique", GUI: "Guinée", KEN: "Kenya"
};

const Maps = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  
  const colorScale = scaleSequential()
    .domain([0, 5000])
    .interpolator(interpolateGreens);

  const handleMouseEnter = (geo) => {
    const countryCode = geo.properties.ISO_A2;
    if (countryData[countryCode]) {
      setHoveredCountry({
        name: countryNames[countryCode] || geo.properties.NAME,
        value: countryData[countryCode],
        code: countryCode
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  const topCountries = Object.entries(countryData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Répartition mondiale des utilisateurs</h2>
          <p className="text-sm text-gray-500">Nombre d'utilisateurs par pays</p>
        </div>
      </div>
      
      <div className="h-96 relative bg-gray-50 rounded overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [10, 30]
          }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.properties.ISO_A2;
                  const users = countryData[countryCode] || 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={users > 0 ? colorScale(users) : "#EEEEEE"}
                      stroke="#D6D6DA"
                      strokeWidth={0.5}
                      onMouseEnter={() => handleMouseEnter(geo)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#3B82F6" },
                        pressed: { outline: "none" }
                      }}
                    />
                  );
                })
              }
            </Geographies>
            
            {hoveredCountry && (
              <Marker coordinates={[0, 0]}>
                <foreignObject x={20} y={-40} width={150} height={60}>
                  <div className="bg-white p-2 rounded shadow-md text-sm">
                    <p className="font-bold">{hoveredCountry.name}</p>
                    <p>{hoveredCountry.value} utilisateurs</p>
                  </div>
                </foreignObject>
              </Marker>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      
      <div className="mt-4">
        <h3 className="text-md font-medium text-gray-700">Top 5 pays</h3>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {topCountries.map(([countryCode, value], index) => (
            <div key={index} className="text-center">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-1" 
                style={{ backgroundColor: colorScale(value) }}
              ></div>
              <p className="text-sm font-medium">{countryNames[countryCode] || countryCode}</p>
              <p className="text-xs text-gray-500">{value} utilisateurs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;