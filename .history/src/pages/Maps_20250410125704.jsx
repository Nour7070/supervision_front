import { useState, useEffect } from 'react';
import
    {
        ComposableMap,
        Geographies,
        Geography,
        Marker
    } from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolateGreens } from "d3-scale-chromatic";

// Import local
import worldGeoJson from './assets/world-110m.json';

const countryData = {
    USA: 4200, FRA: 2500, MAR: 1800, EGY: 3100, SAU: 2700,
    ALG: 1500, IND: 2200, BEL: 1300, GUI: 1900, KEN: 1600,
    CAN: 1400, AUS: 1100, BRA: 950, UK: 850, TUN: 2000,
};

const Maps = () =>
{
    const [hoveredCountry, setHoveredCountry] = useState(null);

    const colorScale = scaleSequential()
        .domain([0, 5000])
        .interpolator(interpolateGreens);

    const handleMouseEnter = (geo) =>
    {
        const countryCode = geo.properties.ISO_A2;
        if (countryData[countryCode])
        {
            setHoveredCountry({
                name: geo.properties.name,
                value: countryData[countryCode],
                x: 0, y: 0 // Position à adapter
            });
        }
    };

    return (
        <div className="h-96 relative">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 120,
                    center: [10, 30]
                }}
            >
                <Geographies geography={worldGeoJson}>
                    {({ geographies }) =>
                        geographies.map((geo) =>
                        {
                            const countryCode = geo.properties.ISO_A2;
                            const users = countryData[countryCode] || 0;
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={users > 0 ? colorScale(users) : "#EEEEEE"}
                                    stroke="#D6D6DA"
                                    onMouseEnter={() => handleMouseEnter(geo)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

            {hoveredCountry && (
                <div className="absolute bg-white p-2 shadow-lg">
                    <p>{hoveredCountry.name}: {hoveredCountry.value} utilisateurs</p>
                </div>
            )}
        </div>
    );
};

export default Maps;