import React, { useState, useEffect } from 'react';
import { FiFileText, FiX } from 'react-icons/fi';
import axios from '../axios';
import { motion, AnimatePresence } from "framer-motion";

const CourseRequestsTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/supervision/formateurs/attente');
      const formattedCourses = response.data.map(c => ({
        id: c.id || c.courseId,
        formateurId: c.formateurId,
        formateurName: c.formateurNomComplet || `Formateur ${c.formateurId}`,
        title: c.titre || "Sans titre",
        description: c.description || "Description non fournie",
        files: c.chapters?.flatMap(chapter => [chapter.fileUrl, ...(chapter.additionalFiles || [])]) || [],
        domaine: c.domaine || "Non spécifié",
        langue: c.langue || "Non spécifiée"
      }));
      setCourses(formattedCourses);
    } catch (err) {
      console.error("Error fetching course requests:", err);
      setError("Failed to load course requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApproveCourse = async (id) => {
    try {
      await axios.put(`/api/moderateurs/${id}/approve`);
      setCourses(prev => prev.filter(course => course.id !== id));
      alert("Course approved successfully");
    } catch (error) {
      console.error("Approbation échouée:", error);
      alert(`Erreur: ${error.response?.data?.message || "Échec de l'approbation"}`);
    }
    setSelectedCourse(null);
  };

  const handleRejectCourse = async (id) => {
    try {
      await axios.put(`/api/moderateurs/${id}/reject`);
      setCourses(prev => prev.filter(course => course.id !== id));
      alert("Course rejected successfully");
    } catch (error) {
      console.error("Rejet échoué:", error);
      alert(`Erreur: ${error.response?.data?.message || "Échec du rejet"}`);
    }
    setSelectedCourse(null);
  };

  const handlePreviewFile = (fileUrl) => {
    const fileName = fileUrl.includes('/') ? fileUrl.split('/').pop() : fileUrl;
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      window.open(`http://localhost:8081/api/file-content/${encodeURIComponent(fileName)}`, '_blank');
    } else if (extension === 'pptx') {
      window.open(`http://localhost:8081/files/api/file-download/${encodeURIComponent(fileName)}`, '_blank');
    } else {
      axios({
        url: `/api/file-download/${encodeURIComponent(fileName)}`,
        method: 'GET',
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement du fichier:', error);
        alert('Une erreur est survenue lors du téléchargement du fichier.');
      });
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (courses.length === 0) return <div className="text-center p-4">No pending course requests</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Course publication requests</h2>
      </div>
      
      <div className="relative">
        <div className="h-[272px] overflow-y-auto scrollbar scrollbar-thumb-[#034732] scrollbar-track-gray-100 scrollbar-thumb-rounded-full pr-5">
          <AnimatePresence>
            <motion.div className="space-y-3" {...animationProps}>
              {courses.map((course) => (
                <div key={course.id} className="border-b pb-3 last:border-0 flex items-center min-h-[68px]">
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-gray-500 text-sm">By {course.formateurName}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                    >
                      View request
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Modal de détails du cours */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Course details</h3>
                <button 
                  onClick={() => setSelectedCourse(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Title:</p>
                    <p className="font-medium">{selectedCourse.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Trainer:</p>
                    <p className="font-medium">
                      {selectedCourse.formateurName} (ID: {selectedCourse.formateurId})
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-600">Description:</p>
                    <p className="font-medium">{selectedCourse.description}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Domain:</p>
                    <p className="font-medium">{selectedCourse.domaine}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Language:</p>
                    <p className="font-medium">{selectedCourse.langue}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Attached files</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedCourse.files?.map((file, index) => (
                      <button 
                        key={index}
                        onClick={() => handlePreviewFile(file)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded flex items-center"
                      >
                        <FiFileText className="mr-2" />
                        File {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => handleRejectCourse(selectedCourse.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApproveCourse(selectedCourse.id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRequestsTable;