/*import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InscriptionDomaine = () =>
{
  const [activeYear] = useState(new Date().getFullYear());

  
  const data = [
    { mois: 'Jan', Fiqh: 65, Ahkam: 45, History: 100, Quran: 25, Sira: 50 },
    { mois: 'Feb', Fiqh: 70, Ahkam: 50, History: 71, Quran: 40, Sira: 25 },
    { mois: 'Mar', Fiqh: 90, Ahkam: 100, History: 60, Quran: 50, Sira: 30 },
    { mois: 'Apr', Fiqh: 50, Ahkam: 70, History: 47, Quran: 10, Sira: 40 },
    { mois: 'May', Fiqh: 102, Ahkam: 120, History: 70, Quran: 20, Sira: 70 },
    { mois: 'Jun', Fiqh: 80, Ahkam: 50, History: 80, Quran: 25, Sira: 50 },
    { mois: 'July', Fiqh: 100, Ahkam: 75, History: 30, Quran: 55, Sira: 54 },
    { mois: 'Agst', Fiqh: 90, Ahkam: 65, History: 50, Quran: 70, Sira: 44 },
    { mois: 'Sep', Fiqh: 120, Ahkam: 90, History: 65, Quran: 100, Sira: 70 },
    { mois: 'Oct', Fiqh: 70, Ahkam: 65, History: 90, Quran: 50, Sira: 10 },
    { mois: 'Nov', Fiqh: 90, Ahkam: 45, History: 100, Quran: 70, Sira: 40 },
    { mois: 'Dec', Fiqh: 50, Ahkam: 90, History: 75, Quran: 55, Sira: 30 },
];

  const colors = {
    Fiqh: '#06895F',
    Ahkam: '#14F5AE',
    History: '#046244',
    Quran: '#FDEEAF',
    Sira: '#C4FDEB'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Registrations by Domain</h2>
          <p className="text-sm text-gray-500">Annual growth {activeYear}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">January - Decembre {activeYear}</span>
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
*/
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../axios';

const InscriptionDomaine = () => {
  const [activeYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get(`/courses/stats?year=${activeYear}`)
      .then((response) => {
        const rawData = response.data;
        console.log("Raw data received:", rawData);
  
        // Init par mois (1 à 12)
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
          mois: index + 1,
        }));
  
        // Injecte les domaines dans chaque mois
        if (Array.isArray(rawData)) {
          rawData.forEach(({ mois, domaine, count }) => {
            const domainKey = domaine || 'Non spécifié';
            monthlyData[mois - 1][domainKey] = count;
          });
        } else {
          console.error("Erreur : données inattendues, rawData n'est pas un tableau :", rawData);
        }
  
        setData(monthlyData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [activeYear]);

  const colors = {
    Fiqh: '#06895F',
    Ahkam: '#14F5AE',
    History: '#046244',
    Quran: '#FDEEAF',
    Sira: '#C4FDEB',
    'Non spécifié': '#CCCCCC'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Registrations by Domain</h2>
          <p className="text-sm text-gray-500">Annual growth {activeYear}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">January - December {activeYear}</span>
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
            {data.length > 0 && Object.keys(data[0]).filter(key => key !== "mois").map(domaine => (
              <Area
                key={domaine}
                type="monotone"
                dataKey={domaine}
                name={domaine}
                stroke={colors[domaine] || '#000000'}
                fill={colors[domaine] || '#000000'}
                fillOpacity={0.5}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InscriptionDomaine;
