import React from 'react';
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import worldGeoJson from '../assets/world-110m.json';

const Maps = () => {
    const getCountryColor = (id) => {
        const seed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const opacity = 0.15 + (seed % 100) / 100 * 0.7;
    
        return `rgba(3, 71, 50, ${opacity})`;
    };

    return (
        <div className="w-full bg-white rounded-lg shadow overflow-hidden" style={{ aspectRatio: '3 / 1.7' }}>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 120,
                    center: [10, 30]
                }}
                width={800}
                height={400}
                style={{
                    width: "100%",
                    height: "auto"
                }}
            >
                <Geographies geography={worldGeoJson}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={getCountryColor(geo.rsmKey)}
                                stroke="#D6D6DA"
                                strokeWidth={0.5}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
          
            <div className="flex justify-center mt-4">
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-1">Densité d'utilisateurs</span>
                    <div className="flex h-6 w-64">
                        {[...Array(10)].map((_, i) => (
                            <div 
                                key={i} 
                                className="h-full flex-1" 
                                style={{ backgroundColor: `rgba(3, 71, 50, ${0.15 + (i/10) * 0.7})` }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between w-64">
                        <span className="text-xs">Faible</span>
                        <span className="text-xs">Élevée</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maps;