/*
import { useState, useEffect } from 'react';

import worldGeoJson from '../assets/world-110m.json';
import
{
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolateGreens } from "d3-scale-chromatic";

const countryData = {
    USA: 4200, FRA: 2500, MAR: 1800, EGY: 3100, SAU: 2700,
    ALG: 1500, IND: 2200, BEL: 1300, GUI: 1900, KEN: 1600,
    CAN: 1400, AUS: 1100, BRA: 950, UK: 850, TUN: 2000,
};
const Maps = () =>
{
    const colorScale = scaleSequential()
        .domain([0, 5000])
        .interpolator(interpolateGreens);

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
                        geographies.map((geo) =>
                        {
                            const countryCode = geo.properties.ISO_A2;
                            const users = countryData[countryCode] || 0;
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={users > 0 ? colorScale(users) : '#EEEEEE'}
                                    stroke="#D6D6DA"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: 'none' },
                                        hover: { fill: '#3B82F6', outline: 'none' },
                                        pressed: { outline: 'none' }
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default Maps;
*/
import React from 'react';
import worldGeoJson from '../assets/world-110m.json';
import
    {
        ComposableMap,
        Geographies,
        Geography
    } from "react-simple-maps";

// Données de test pour chaque pays (ISO_A3 codes)
const countryData = {
    USA: 4200, FRA: 2500, MAR: 1800, EGY: 3100, SAU: 2700,
    ALG: 1500, IND: 2200, BEL: 1300, GUI: 1900, KEN: 1600,
    CAN: 1400, AUS: 1100, BRA: 950, UK: 850, TUN: 2000,
};

// Fonction pour convertir une valeur en nuance de vert #034732
function getGreenShade(value, max = 5000)
{
    // Calculer un pourcentage (0-100) basé sur la valeur
    const percent = Math.min(value / max, 1);

    // Pour la couleur #034732 (vert foncé)
    // Créons des nuances plus claires en ajustant la luminosité
    const r = Math.round(3 + (255 - 3) * (1 - percent));
    const g = Math.round(71 + (255 - 71) * (1 - percent));
    const b = Math.round(50 + (255 - 50) * (1 - percent));

    return `rgb(${r}, ${g}, ${b})`;
}

const Maps = () =>
{
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
                        geographies.map((geo) =>
                        {
                            // Obtenir le code du pays
                            const countryCode = geo.properties.ISO_A3 || geo.properties.ISO_A2;

                            // Obtenir les données d'utilisateurs pour ce pays ou utiliser 100 comme valeur par défaut
                            // pour qu'aucun pays ne soit complètement blanc
                            const users = countryData[countryCode] || 100;

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={getGreenShade(users)}
                                    stroke="#D6D6DA"
                                    strokeWidth={0.5}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

            {/* Légende */}
            <div className="flex justify-center mt-4">
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-1">Densité d'utilisateurs</span>
                    <div className="flex h-6 w-64">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="h-full flex-1"
                                style={{ backgroundColor: getGreenShade(i * 500) }}
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