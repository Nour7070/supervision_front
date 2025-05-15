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

// Données fictives pour visualisation
const dummyData = {
    // Afrique du Nord et Moyen-Orient (valeurs plus élevées d'après votre capture d'écran)
    "MAR": 3800, "DZA": 3600, "TUN": 3400, "EGY": 3500, "SAU": 3700,
    // Europe
    "FRA": 2800, "ESP": 2600, "ITA": 2700, "DEU": 2500, "GBR": 2650,
    // Afrique subsaharienne
    "SEN": 1800, "MLI": 1600, "NER": 1500, "TCD": 1700, "SDN": 1900,
    // Amériques
    "USA": 2200, "CAN": 2100, "MEX": 2000, "BRA": 1900, "ARG": 1800,
    // Asie
    "IND": 2400, "CHN": 2300, "JPN": 2200, "IDN": 2100, "PAK": 2350,
    // Océanie
    "AUS": 1700, "NZL": 1600
};

const Maps = () =>
{
    // Fonction pour obtenir la couleur du pays
    const getCountryColor = (geo) =>
    {
        // Vérifier tous les codes possibles du pays
        const codes = [
            geo.properties.ISO_A3,
            geo.properties.ISO_A2,
            geo.properties.ADM0_A3
        ];

        // Chercher une correspondance dans les données
        let value = 0;
        for (const code of codes)
        {
            if (code && dummyData[code])
            {
                value = dummyData[code];
                break;
            }
        }

        // Donner une valeur minimale pour les pays sans données
        if (value === 0) value = 500;

        // Calculer l'opacité basée sur la valeur (0.1 à 1.0)
        const maxValue = 4000; // Valeur maximale dans les données
        const opacity = 0.1 + (value / maxValue) * 0.9;

        // Retourner la couleur avec l'opacité appropriée
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
                                fill={getCountryColor(geo)}
                                stroke="#D6D6DA"
                                strokeWidth={0.5}
                            />
                        ))
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
                                style={{ backgroundColor: `rgba(3, 71, 50, ${0.1 + (i / 10) * 0.9})` }}
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