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

  // Couleurs par domaine
  const domainColors = {
    "Fiqh": "#2A9D8F",
    "Ahkam": "#E9C46A", 
    "History": "#F4A261",
    "Quran": "#E76F51",
    "Sira": "#264653",
    "Non spécifié": "#aaaaaa",
  };

  // Calcul hauteur livre
  const getBookHeight = (studentCount) => {
    const min = 60;
    const max = 150;
    return Math.min(Math.max(min, (studentCount || 0) * 5 + min), max);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-500">Chargement...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-red-500">Erreur: {error}</div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Bibliothèque Virtuelle</h2>

      {/* Conteneur principal */}
      <div className="space-y-10">
        {Object.keys(domainColors).map((domain) => {
          const courses = libraryData.popularityStats
            .filter(course => course.domaine === domain);

          if (courses.length === 0) return null;

          return (
            <div key={domain} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4" style={{ color: domainColors[domain] }}>
                {domain}
              </h3>

              {/* Conteneur avec TOUS les livres en une seule ligne */}
              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-2" style={{ minWidth: `${courses.length * 100}px` }}>
                  {courses.map((course) => (
                    <div key={course.courseId} className="flex flex-col items-center flex-shrink-0 w-24">
                      {/* Livre */}
                      <div 
                        className="rounded-sm relative transition-transform hover:scale-105"
                        style={{
                          height: `${getBookHeight(course.studentCount)}px`,
                          width: "40px",
                          backgroundColor: domainColors[domain],
                          boxShadow: "2px 2px 8px rgba(0,0,0,0.1)"
                        }}
                      >
                        <div className="absolute bottom-2 inset-x-0 flex justify-center">
                          <div className="bg-white h-1 w-3/4 opacity-50 rounded-full"></div>
                        </div>
                      </div>

                      {/* Infos */}
                      <div className="mt-2 text-center w-full">
                        <p className="text-xs font-medium truncate">{course.titre}</p>
                        <div className="flex justify-center space-x-2 mt-1 text-xs">
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
          <BookOpen size={16} className="mr-2" />
          <span>Tous les livres affichés sur une seule ligne - Défilement horizontal</span>
        </div>
      </div>
    </div>
  );
};

export default VirtualLibrary;