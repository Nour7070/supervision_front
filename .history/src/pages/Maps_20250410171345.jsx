/*import { useState, useEffect } from 'react';

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
/*
import React from 'react';
import worldGeoJson from '../assets/world-110m.json';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolate } from "d3-interpolate";
import { Tooltip } from 'react-tooltip';

const countryData = {
    USA: 4200, FRA: 2500, MAR: 1800, EGY: 3100, SAU: 2700,
    ALG: 1500, IND: 2200, BEL: 1300, GUI: 1900, KEN: 1600,
    CAN: 1400, AUS: 1100, BRA: 950, UK: 850, TUN: 2000,
    DZA: 1500, NGA: 1200, TUR: 1800, IDN: 900, PAK: 800,
    DEU: 2000, ESP: 1700, ITA: 1600, NLD: 900, SWE: 700
};

const Maps = () => {
    // Création d'une échelle de couleurs avec la couleur de base #034732
    const colorScale = scaleSequential()
        .domain([0, 5000])
        .interpolator(interpolate)
        .range(['#f0f9e8', '#034732']);

    // Trouver les coordonnées des pays pour les marqueurs
    const getCountryCoordinates = (code) => {
        const country = worldGeoJson.features.find(f => f.properties.ISO_A2 === code);
        if (!country) return null;
        return country.properties.center || [0, 0];
    };

    return (
        <div className="w-full bg-white rounded-lg shadow overflow-hidden p-4">
            <div className="w-full" style={{ aspectRatio: '2 / 1' }}>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 120,
                        center: [10, 30]
                    }}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <Geographies geography={worldGeoJson}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryCode = geo.properties.ISO_A2;
                                const countryName = geo.properties.NAME;
                                const users = countryData[countryCode] || 0;
                                
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={users > 0 ? colorScale(users) : '#F5F5F5'}
                                        stroke="#FFFFFF"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: 'none' },
                                            hover: { 
                                                fill: '#3B82F6', 
                                                outline: 'none',
                                                cursor: 'pointer'
                                            },
                                            pressed: { outline: 'none' }
                                        }}
                                        data-tooltip-id="country-tooltip"
                                        data-tooltip-content={`${countryName}: ${users} utilisateurs`}
                                    />
                                );
                            })
                        }
                    </Geographies>

                   
                    {Object.entries(countryData)
                        .filter(([_, users]) => users > 2000)
                        .map(([code, users]) => {
                            const coordinates = getCountryCoordinates(code);
                            if (!coordinates) return null;
                            
                            return (
                                <Marker key={code} coordinates={coordinates}>
                                    <circle
                                        r={Math.sqrt(users) / 20}
                                        fill="#034732"
                                        fillOpacity={0.8}
                                        stroke="#FFF"
                                        strokeWidth={1}
                                    />
                                    <text
                                        x={4}
                                        y={4}
                                        fontSize={10}
                                        fill="#FFF"
                                        textAnchor="middle"
                                        fontWeight="bold"
                                    >
                                        {users}
                                    </text>
                                </Marker>
                            );
                        })}
                </ComposableMap>
                <Tooltip id="country-tooltip" />
            </div>

            {/* Légende */}
            <div className="mt-4 flex flex-col items-center">
                <h3 className="text-sm font-medium mb-2">Nombre d'utilisateurs par pays</h3>
                <div className="flex items-center h-6 w-full max-w-md">
                    {[0, 1000, 2000, 3000, 4000, 5000].map((value, i, arr) => {
                        if (i === arr.length - 1) return null;
                        const color = colorScale(value);
                        const nextColor = colorScale(arr[i + 1]);
                        return (
                            <div 
                                key={i}
                                className="h-full"
                                style={{
                                    width: `${100 / (arr.length - 1)}%`,
                                    background: `linear-gradient(to right, ${color}, ${nextColor})`
                                }}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-between w-full max-w-md mt-1 text-xs">
                    {[0, 1000, 2000, 3000, 4000, 5000].map((value) => (
                        <span key={value}>{value}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Maps;