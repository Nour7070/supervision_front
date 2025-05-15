/*
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const InscriptionDomaine   = () =>
{
function InscriptionsByDomaineChart({ data, colors }) {
  const [activeYear] = useState(new Date().getFullYear());

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Inscriptions par Domaine</h2>
          <p className="text-sm text-gray-500">Évolution annuelle {activeYear}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Janvier - Décembre {activeYear}</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                return [`${value} inscriptions`, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="Fiqh" 
              name="Fiqh"
              stroke={colors.Fiqh} 
              fill={colors.Fiqh} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Ahkam" 
              name="Ahkam"
              stroke={colors.Ahkam} 
              fill={colors.Ahkam} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="History" 
              name="History"
              stroke={colors.History} 
              fill={colors.History} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Quran" 
              name="Quran"
              stroke={colors.Quran} 
              fill={colors.Quran} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Sira" 
              name="Sira"
              stroke={colors.Sira} 
              fill={colors.Sira} 
              fillOpacity={0.5} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
}
export default InscriptionDomaine;
*/
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InscriptionDomaine = () => {
  const [activeYear] = useState(new Date().getFullYear());
  
  // Données d'exemple - à remplacer par vos données réelles
  const data = [
    { mois: 'Jan', Fiqh: 140, Ahkam: 80, History: 100, Quran: 120, Sira: 60 },
    { mois: 'Fév', Fiqh: 120, Ahkam: 90, History: 110, Quran: 140, Sira: 70 },
    { mois: 'Mar', Fiqh: 160, Ahkam: 100, History: 120, Quran: 150, Sira: 80 },
    { mois: 'Avr', Fiqh: 180, Ahkam: 110, History: 130, Quran: 170, Sira: 90 },
    { mois: 'Mai', Fiqh: 200, Ahkam: 120, History: 140, Quran: 190, Sira: 100 },
    { mois: 'Juin', Fiqh: 220, Ahkam: 130, History: 150, Quran: 210, Sira: 110 },
    { mois: 'Juil', Fiqh: 240, Ahkam: 140, History: 160, Quran: 230, Sira: 120 },
    { mois: 'Août', Fiqh: 260, Ahkam: 150, History: 170, Quran: 250, Sira: 130 },
    { mois: 'Sept', Fiqh: 280, Ahkam: 160, History: 180, Quran: 270, Sira: 140 },
    { mois: 'Oct', Fiqh: 300, Ahkam: 170, History: 190, Quran: 290, Sira: 150 },
    { mois: 'Nov', Fiqh: 320, Ahkam: 180, History: 200, Quran: 310, Sira: 160 },
    { mois: 'Déc', Fiqh: 340, Ahkam: 190, History: 210, Quran: 330, Sira: 170 }
  ];
  
  // Couleurs pour chaque domaine
  const colors = {
    Fiqh: '#8884d8',
    Ahkam: '#82ca9d',
    History: '#ffc658',
    Quran: '#ff8042',
    Sira: '#0088fe'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Inscriptions par Domaine</h2>
          <p className="text-sm text-gray-500">Évolution annuelle {activeYear}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Janvier - Décembre {activeYear}</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                return [`${value} inscriptions`, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="Fiqh" 
              name="Fiqh"
              stroke={colors.Fiqh} 
              fill={colors.Fiqh} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Ahkam" 
              name="Ahkam"
              stroke={colors.Ahkam} 
              fill={colors.Ahkam} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="History" 
              name="History"
              stroke={colors.History} 
              fill={colors.History} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Quran" 
              name="Quran"
              stroke={colors.Quran} 
              fill={colors.Quran} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Sira" 
              name="Sira"
              stroke={colors.Sira} 
              fill={colors.Sira} 
              fillOpacity={0.5} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InscriptionDomaine;