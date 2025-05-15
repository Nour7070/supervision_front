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

const InscriptionDomaine = () =>
{
  const [activeYear] = useState(new Date().getFullYear());

  
  const data = [
    { mois: 'Jan', Fiqh: 65, Ahkam: 45, History: 100, Quran: 25, Sira: 50 },
    { mois: 'Fév', Fiqh: 70, Ahkam: 50, History: 71, Quran: 40, Sira: 25 },
    { mois: 'Mar', Fiqh: 90, Ahkam: 100, History: 60, Quran: 50, Sira: 30 },
    { mois: 'Avr', Fiqh: 50, Ahkam: 70, History: 47, Quran: 10, Sira: 40 },
    { mois: 'Mai', Fiqh: 102, Ahkam: 120, History: 70, Quran: 20, Sira: 70 },
    { mois: 'Juin', Fiqh: 80, Ahkam: 50, History: 80, Quran: 25, Sira: 50 },
    { mois: 'Juil', Fiqh: 100, Ahkam: 75, History: 30, Quran: 55, Sira: 54 },
    { mois: 'Août', Fiqh: 90, Ahkam: 65, History: 50, Quran: 70, Sira: 44 },
    { mois: 'Sep', Fiqh: 120, Ahkam: 90, History: 65, Quran: 100, Sira: 70 },
    { mois: 'Oct', Fiqh: 70, Ahkam: 65, History: 90, Quran: 50, Sira: 10 },
    { mois: 'Nov', Fiqh: 90, Ahkam: 45, History: 100, Quran: 70, Sira: 40 },
    { mois: 'Déc', Fiqh: 50, Ahkam: 90, History: 75, Quran: 55, Sira: 30 },
  ];

  const colors = {
    Fiqh: '#06895F',
    Ahkam: '#14F5AE',
    History: '#046244',
    Quran: '#FDEEAF',
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
              formatter={(value, name) =>
              {
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