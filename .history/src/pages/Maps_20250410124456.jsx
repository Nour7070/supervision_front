import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const countryData = {
  USA: 4200, FRA: 2500, MAR: 1800, EGY: 3100, SAU: 2700,
  ALG: 1500, IND: 2200, BEL: 1300, GUI: 1900, KEN: 1600,
  CAN: 1400, AUS: 1100, BRA: 950, UK: 850, TUN: 2000,
};


const Maps  = () =>
{
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [worldData, setWorldData] = useState(null);
  
  const colorScale = d3.scaleSequential()
    .domain([0, 5000])
    .interpolator(d3.interpolateGreens);
    
  const handleMouseOver = (event, d) => {
    setHoveredCountry({
      name: d.properties.name,
      value: countryData[d.id] || 0,
      x: event.pageX,
      y: event.pageY
    });
  };
  
  const handleMouseOut = () => {
    setHoveredCountry(null);
  };

  // Note: Dans un environnement réel, vous importeriez les données GeoJSON
  // pour l'exemple, nous utilisons un placeholder simplifié
  useEffect(() => {
    // Simulation du chargement des données géographiques
    setTimeout(() => {
      setWorldData({
        type: "FeatureCollection",
        features: [
          // Dans un vrai environnement, vous auriez ici des données GeoJSON complètes
          // Ces données définissent les frontières des pays
        ]
      });
    }, 100);
  }, []);

  // Rendu SVG stylisé pour représenter une carte mondiale sans les vraies données GeoJSON
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Répartition mondiale des utilisateurs</h2>
          <p className="text-sm text-gray-500">Nombre d'utilisateurs par pays</p>
        </div>
      </div>
      
      <div className="h-96 relative bg-gray-50 rounded overflow-hidden">
        {/* Carte stylisée pour simuler une carte choroplèthe */}
        <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
          {/* Océans */}
          <rect width="1000" height="500" fill="#f0f9ff" />
          
          {/* Exemple de continents stylisés avec différentes intensités de vert */}
          <path d="M200,100 Q400,50 500,150 T800,200 Q750,350 500,300 T200,250 Z" fill="#e6f5ef" stroke="#c5e8d6" strokeWidth="1" />
          <path d="M100,200 Q200,150 300,250 T500,350 Q400,400 300,350 T100,300 Z" fill="#c5e8d6" stroke="#a3daba" strokeWidth="1" />
          <path d="M650,100 Q750,80 800,120 T900,200 Q850,250 800,220 T700,180 Z" fill="#a3daba" stroke="#7fcba0" strokeWidth="1" />
          <path d="M300,80 Q350,60 400,90 T500,120 Q450,150 400,130 T350,100 Z" fill="#7fcba0" stroke="#5bb586" strokeWidth="1" />
          <path d="M600,300 Q650,280 700,310 T800,340 Q750,380 700,350 T650,320 Z" fill="#5bb586" stroke="#399a69" strokeWidth="1" />
          
          {/* Légende */}
          <g transform="translate(50, 420)">
            <text x="0" y="-10" fontSize="12" fill="#333">Légende (utilisateurs):</text>
            <rect x="0" y="0" width="20" height="10" fill="#e6f5ef" />
            <text x="25" y="9" fontSize="10" fill="#333">0-1000</text>
            
            <rect x="100" y="0" width="20" height="10" fill="#c5e8d6" />
            <text x="125" y="9" fontSize="10" fill="#333">1000-2000</text>
            
            <rect x="200" y="0" width="20" height="10" fill="#a3daba" />
            <text x="225" y="9" fontSize="10" fill="#333">2000-3000</text>
            
            <rect x="300" y="0" width="20" height="10" fill="#7fcba0" />
            <text x="325" y="9" fontSize="10" fill="#333">3000-4000</text>
            
            <rect x="400" y="0" width="20" height="10" fill="#5bb586" />
            <text x="425" y="9" fontSize="10" fill="#333">4000+</text>
          </g>
        </svg>
        
        {/* Info-bulle au survol */}
        {hoveredCountry && (
          <div 
            className="absolute bg-white p-2 rounded shadow-md text-sm"
            style={{
              left: hoveredCountry.x + 10,
              top: hoveredCountry.y - 40
            }}
          >
            <p className="font-bold">{hoveredCountry.name}</p>
            <p>{hoveredCountry.value} utilisateurs</p>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-md font-medium text-gray-700">Top 5 pays</h3>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {Object.entries(countryData)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([countryCode, value], index) => {
              const countryNames = {
                USA: "États-Unis", FRA: "France", MAR: "Maroc", 
                EGY: "Égypte", SAU: "Arabie Saoudite"
                // Ajouter plus de noms de pays au besoin
              };
              
              return (
                <div key={index} className="text-center">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-1" 
                    style={{ backgroundColor: colorScale(value) }}
                  ></div>
                  <p className="text-sm font-medium">{countryNames[countryCode] || countryCode}</p>
                  <p className="text-xs text-gray-500">{value} utilisateurs</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
export default Maps;