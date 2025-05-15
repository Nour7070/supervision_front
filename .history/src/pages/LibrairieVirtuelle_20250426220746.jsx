import { useState, useEffect } from "react";
import { BookOpen, Users, Layers } from "lucide-react";
import axios from '../axios';

const VirtualLibrary = () => {
  const [libraryData, setLibraryData] = useState({
    domaineStats: [],
    popularityStats: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/courses/library-stats")
      .then(response => {
        setLibraryData(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message || "Une erreur est survenue lors de la récupération des données");
        setIsLoading(false);
      });
  }, []);

  // Définir des couleurs pour chaque domaine
  const domainColors = {
    "Fiqh": "#2A9D8F",
    "Ahkam": "#E9C46A",
    "History": "#F4A261",
    "Quran": "#E76F51",
    "Sira": "#264653",
    "Non spécifié": "#aaaaaa",
  };

  // Fonction pour calculer la hauteur du livre
  const getBookHeight = (studentCount) => {
    const min = 60;
    const max = 150;
    if (!studentCount) return min;
    return Math.min(Math.max(min, studentCount * 5 + min), max);
  };

  // Fonction pour diviser les cours en groupes de 3
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement de la bibliothèque...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bibliothèque Virtuelle</h2>
      
      {/* Conteneur principal par domaine */}
      <div className="space-y-8">
        {Object.keys(domainColors).map((domain) => {
          const coursesInDomain = libraryData.popularityStats.filter(
            course => course.domaine === domain
          );
          
          if (coursesInDomain.length === 0) return null;

          // Diviser les cours en groupes de 3
          const courseGroups = chunkArray(coursesInDomain, 3);

          return (
            <div key={domain} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">{domain}</h3>
              
              {/* Conteneur horizontal avec scroll */}
              <div className="overflow-x-auto pb-4">
                <div className="flex flex-nowrap gap-6">
                  {courseGroups.map((group, groupIndex) => (
                    <div 
                      key={groupIndex} 
                      className="flex-shrink-0 w-full sm:w-auto bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex gap-4">
                        {group.map((course) => {
                          const height = getBookHeight(course.studentCount);
                          return (
                            <div 
                              key={course.courseId} 
                              className="flex flex-col items-center group relative"
                              title={`${course.titre}\n${course.studentCount || 0} étudiants\n${course.chapterCount || 0} chapitres`}
                            >
                              {/* Livre */}
                              <div 
                                className="rounded-t-sm transition-all duration-200 group-hover:scale-105"
                                style={{
                                  height: `${height}px`,
                                  width: "36px",
                                  backgroundColor: domainColors[domain],
                                  boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
                                }}
                              >
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                                  <div className="bg-white h-1 w-4/5 opacity-50 rounded-full"></div>
                                </div>
                              </div>
                              
                              {/* Infos sous le livre */}
                              <div className="mt-2 text-center">
                                <div className="text-xs font-medium truncate w-20">{course.titre}</div>
                                <div className="flex justify-center space-x-2 mt-1 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <Users size={10} className="mr-1" />
                                    {course.studentCount || 0}
                                  </span>
                                  <span className="flex items-center">
                                    <Layers size={10} className="mr-1" />
                                    {course.chapterCount || 0}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Légende */}
      <div className="mt-8 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center">
          <BookOpen size={16} className="mr-2 text-amber-600" />
          <span>Chaque rectangle contient 3 livres maximum</span>
        </div>
        <div className="flex items-center mt-2">
          <Users size={16} className="mr-2 text-amber-600" />
          <span>Hauteur des livres proportionnelle au nombre d'étudiants</span>
        </div>
        <div className="flex items-center mt-2">
          <Layers size={16} className="mr-2 text-amber-600" />
          <span>Chiffres sous les livres : étudiants / chapitres</span>
        </div>
      </div>
    </div>
  );
};

export default VirtualLibrary;