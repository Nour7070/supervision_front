import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiX, FiFileText, FiDownload, FiBook } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from '../axios';
import InscriptionDomaine from "./InscriptionDomaine";
import Maps from "./Maps";
import { formatDistanceToNow } from 'date-fns';

axios.defaults.timeout = 30000;

const Dashboard = ({ userType }) => {
    const [previewFile, setPreviewFile] = useState(null);
    const [selectedRegistrations, setSelectedRegistrations] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectAllRegistrations, setSelectAllRegistrations] = useState(false);
    const [selectAllCourses, setSelectAllCourses] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [previewContent, setPreviewContent] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isBatchDeleteMode, setIsBatchDeleteMode] = useState(false);
    const [recentActivities, setRecentActivities] = useState([]);
    const visibleActivities = showAll ? recentActivities : recentActivities.slice(0, 2);

    const animationProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 }
    };

    const [stats, setStats] = useState({
        totalFormateurs: 0,
        totalApprenants: 0,
        totalModerateurs: 0,
        averageCoursesPerTrainer: 0,
        pendingRegistrations: [],
        pendingCourseSubmissions: []
    });
const formatTimeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};
   
 const maxValue = Math.max(
        stats.totalFormateurs,
        stats.totalApprenants,
        userType?.toUpperCase() === 'SUPERVISEUR' ? stats.totalModerateurs : 0
    );

    const calculatePercentage = (value) => {
        return (value / maxValue) * 100;
    };

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const statsResponse = await axios.get('/api/dashboard/stats');
                const { formateurs, apprenants, moderateurs , averageCoursesPerTrainer } = statsResponse.data;
                
                
                const pendingFormateursResponse = await axios.get('/supervision/formateurs/pending');
      const pendingFormateurs = pendingFormateursResponse.data;

      const pendingFormateursWithDocs = await Promise.all(
        pendingFormateurs.map(async f => {
          const docsResponse = await axios.get(`/api/users/${f.id}/documents`);
          return {
            ...f,
            documents: docsResponse.data
          };
        })
      );

                let pendingCourses = [];
                try {
                    const response = await axios.get('/supervision/formateurs/attente');
                    console.log("Réponse complète de l'API:", response.data);
                    pendingCourses = response.data;
                    console.log("Cours en attente reçus:", pendingCourses);
                } catch (error) {
                    console.error("Erreur API cours:", error);
                    if (error.response) {
                        console.error("Réponse erreur:", error.response.data);
                    }
                }

                console.log("Données reçues - Formateurs:", pendingFormateurs);
                console.log("Données reçues - Cours:", pendingCourses);

                setStats({
                    totalFormateurs: formateurs,
                    totalApprenants: apprenants,
                    totalModerateurs: moderateurs,
                    averageCoursesPerTrainer: averageCoursesPerTrainer,
                    pendingRegistrations: pendingFormateursWithDocs.map(f => ({
                        id: f.id,
                        name: `${f.prenom} ${f.nom}`,
                        email: f.email,
                        phone: f.phoneNumber || "N/A",
                        documents: f.documents || [], 
                        experience: f.experience || "Non spécifiée",
                        date: new Date().toISOString().split('T')[0]
                      })),
                    pendingCourseSubmissions: pendingCourses.map(c => ({
                        id: c.id || c.courseId,
                        formateur: `Formateur ID ${c.formateurId}`,
                        formateurId: c.formateurId,
                        title: c.titre || "Sans titre",
                        description: c.description || "Description non fournie",
                        files: c.chapters?.flatMap(chapter => [chapter.fileUrl, ...(chapter.additionalFiles || [])]) || [] ,
                        date: new Date().toISOString().split('T')[0],
                        domaine: c.domaine || "Non spécifié",
                        langue: c.langue || "Non spécifiée"
                    }))
                });

            } catch (error) {
                console.error("Erreur globale:", error);
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('/api/activities/recent');
                console.log("Réponse brute de l'API des activités :", response.data);
    
                setRecentActivities(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des activités :", err);
                setError('Error fetching recent activities');
            }
        };
    
        fetchActivities();
    }, []);
    const handleApproveRegistration = async (email) => {
        try {
            await axios.put(`/supervision/formateurs/${email}/approve`);
            setStats(prev => ({
                ...prev,
                pendingRegistrations: prev.pendingRegistrations.filter(req => req.email !== email),
                totalFormateurs: prev.totalFormateurs + 1
            }));
        } catch (error) {
            console.error("Approbation échouée:", error);
            alert(`Erreur: ${error.response?.data?.message || "Échec de l'approbation"}`);
        }
        setSelectedRegistration(null);
    };

    const handleRejectRegistration = async (email) => {
        try {
            await axios.put(`/supervision/formateurs/${email}/reject`);
            setStats(prev => ({
                ...prev,
                pendingRegistrations: prev.pendingRegistrations.filter(req => req.email !== email)
            }));
        } catch (error) {
            console.error("Rejet échoué:", error);
            alert(`Erreur: ${error.response?.data?.message || "Échec du rejet"}`);
        }
        setSelectedRegistration(null);
    };

    const handleApproveCourse = async (id) => {
        try {
            await axios.put(`/api/moderateurs/${id}/approve`);
            setStats(prev => ({
                ...prev,
                pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id),
            }));
        } catch (error) {
            console.error("Approbation échouée:", error);
            alert(`Erreur: ${error.response?.data?.message || "Échec de l'approbation"}`);
        }
        setSelectedCourse(null);
    };

    const handleRejectCourse = async (id) => {
        console.log("ID du cours à rejeter:", id);
        try {
            await axios.put(`/api/moderateurs/${id}/reject`);
            setStats(prev => ({
                ...prev,
                pendingCourseSubmissions: prev.pendingCourseSubmissions.filter(course => course.id !== id)
            }));
        } catch (error) {
            console.error("Rejet échoué:", error);
            alert(`Erreur: ${error.response?.data?.message || "Échec du rejet"}`);
        }
        setSelectedCourse(null);
    };
    const handlePreviewFile = (filePath) => {
        const extension = filePath.split('.').pop().toLowerCase();
        
        if (['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
          window.open(`http://localhost:8081/api/file-content/${encodeURIComponent(filePath)}`, '_blank');
        } else {
          const link = document.createElement('a');
          link.href = `http://localhost:8081/api/file-content/${encodeURIComponent(filePath)}`;
          link.download = filePath.split('/').pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

    const fetchFormateurDocuments = async (formateurId) => {
        try {
          const response = await axios.get(`/api/users/${formateurId}/documents`);
          console.log("Données documents:", selectedRegistration.documents);

          return response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des documents:", error);
          return [];
        }
      };
    const FilePreviewModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">File preview</h3>
                    <button
                        onClick={() => setPreviewFile(null)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {previewFile?.endsWith('.pdf') ? (
                        <iframe
                            src={previewFile}
                            className="w-full h-full min-h-[70vh]"
                            frameBorder="0"
                            title="Prévisualisation PDF"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <FiFileText className="h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-4">Preview not available for this format</p>
                            <a
                                href={previewFile}
                                download
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <FiDownload className="mr-2" /> Download the file
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const toggleRegistrationSelection = (id) => {
        setSelectedRegistrations(prev =>
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };
    
    const toggleAllRegistrations = () => {
        if (selectAllRegistrations) {
          setSelectedRegistrations([]);
          setIsBatchDeleteMode(false);
        } else {
          setSelectedRegistrations(stats.pendingRegistrations.map(r => r.id));
          setIsBatchDeleteMode(true);
        }
        setSelectAllRegistrations(!selectAllRegistrations);
      };
    
    const toggleCourseSelection = (id) => {
        setSelectedCourses(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };
    
    const toggleAllCourses = () => {
        if (selectAllCourses) {
            setSelectedCourses([]);
            setIsBatchDeleteMode(false);
        } else {
            setSelectedCourses(stats.pendingCourseSubmissions.map(c => c.id));
            setIsBatchDeleteMode(true);
        }
        setSelectAllCourses(!selectAllCourses);
    };
    const handleBatchDeleteRegistrations = async () => {
        try {
          await Promise.all(
            selectedRegistrations.map(id => 
              axios.delete(`/api/formateurs/${id}`)
            )
          );
          
          setStats(prev => ({
            ...prev,
            pendingRegistrations: prev.pendingRegistrations.filter(
              r => !selectedRegistrations.includes(r.id)
            )
          }));
          
          setSelectedRegistrations([]);
          setIsBatchDeleteMode(false);
          setSelectAllRegistrations(false);
          
        } catch (error) {
          console.error("Batch delete failed:", error);
          alert("Some deletions failed");
        }
      };
      
    if (loading) return <div className="text-center text-xl">Loading statistics...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <i className="fas fa-user-check text-blue-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Trainers</p>
                            <p className="text-2xl font-bold">{stats.totalFormateurs}</p>
                            <p className="text-green-900 text-sm mt-1">+20% vs last week</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                            <i className="fas fa-graduation-cap text-green-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Students</p>
                            <p className="text-2xl font-bold">{stats.totalApprenants}</p>
                            <p className="text-green-900 text-sm mt-1">+10% vs last week</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-start">
                        <div className="bg-orange-100 p-3 rounded-full mr-4">
                            <i className="fas fa-user-shield text-purple-500 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Moderators</p>
                            <p className="text-2xl font-bold">{stats.totalModerateurs}</p>
                            <p className="text-green-900 text-sm mt-1">+30% vs last week</p>
                        </div>
                    </div>
    
                        <div className="bg-white rounded-lg shadow p-6 flex items-start">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <i className="fas fa-shield-alt text-purple-500 text-xl"></i>
                            </div>
                            <div>
                               <p className="text-gray-500 text-sm">Average courses per trainer</p>
                               <p className="text-2xl font-bold">
                               {parseFloat(stats.averageCoursesPerTrainer).toFixed(2)}
                               </p>
                               <p className="text-green-900 text-sm mt-1">+15% vs last week</p>
                     </div>
                        </div>
                   
                </div>

                         <div className="flex flex-col lg:flex-row gap-6">
                           <div className="lg:w-[60%] space-y-4">
                           <div className="bg-white p-4 rounded-lg shadow-sm">
    <h2 className="text-base font-semibold mb-3">Recent Activities</h2>
    <div className="space-y-4">
      {visibleActivities.map((activity, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className={`w-6 h-6 rounded-full mr-4 flex justify-center items-center ${
              activity.type === 'NEW_TRAINER_TO_VALIDATE' ? 'bg-green-500' :
              activity.type === 'NEW_COURSE_TO_VALIDATE' ? 'bg-blue-500' : 'bg-gray-400'
          }`}>
            <i className={`fas ${
                activity.type === 'NEW_TRAINER_TO_VALIDATE' ? 'fa-user-check' :
                activity.type === 'NEW_COURSE_TO_VALIDATE' ? 'fa-book' : 'fa-info-circle'
            } text-white`} />
          </div>
          <div>
            <p>{activity.description}</p>
            <span className="text-gray-500 text-sm">
              {formatTimeAgo(activity.timestamp)}
            </span>
          </div>
        </div>
      ))}

      {recentActivities.length > 2 && (
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center text-black hover:underline text-sm"
          >
            {showAll ? 'See less' : 'See more'}
            <svg
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {recentActivities.length === 0 && (
        <p className="text-gray-500 text-sm text-center">No recent activities</p>
      )}
    </div>
    </div>
    
    <div className="mt-6">
                         <InscriptionDomaine />
                    </div>
                    </div>
                    <div className="lg:w-[40%] space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
    <h2 className="text-base font-semibold mb-3">Users by type</h2>
    <div className="space-y-4">
        <div className="flex items-center">
            <div className="w-1/4 text-sm text-gray-600 pr-3">Trainers</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${calculatePercentage(stats.totalFormateurs)}%` }}
                ></div>
            </div>
            <div className="ml-4 font-medium">{stats.totalFormateurs}</div>
        </div>

        <div className="flex items-center">
            <div className="w-1/4 text-sm text-gray-600 pr-3">Students</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${calculatePercentage(stats.totalApprenants)}%` }}
                ></div>
            </div>
            <div className="ml-4 font-medium">{stats.totalApprenants}</div>
        </div>

        {userType?.toUpperCase() === 'SUPERVISEUR' && (
            <div className="flex items-center">
                <div className="w-1/4 text-sm text-gray-600 pr-3">Moderators</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-purple-600 h-3 rounded-full"
                        style={{ width: `${calculatePercentage(stats.totalModerateurs)}%` }}
                    ></div>
                </div>
                <div className="ml-4 font-medium">{stats.totalModerateurs}</div>
            </div>
        )}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-4">
                            <Maps className="h-[200px] w-full" />
                            <div className="mt-4">
                                <h3 className="text-md font-medium mb-2">Top 5 countries</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>🇩🇿 Algeria</li>
                                    <li>🇲🇦 Morocco</li>
                                    <li>🇹🇳 Tunisia</li>
                                    <li>🇸🇦 Saudi Arabia</li>
                                    <li>🇫🇷 France</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-base font-semibold">Trainer registration requests</h2>
    <div className="flex items-center space-x-4">
      {isBatchDeleteMode && (
        <button
          onClick={handleBatchDeleteRegistrations}
          className="px-3 py-1 text-[#034732] rounded hover:bg-[#07885F] text-sm"
        >
          Delete Selected
        </button>
      )}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Select all</span>
        <input
          type="checkbox"
          checked={selectAllRegistrations}
          onChange={toggleAllRegistrations}
          className="form-checkbox h-4 w-4 border border-[#FACC15] rounded bg-white text-[#FACC15] focus:ring-1 focus:ring-[#FACC15] checked:bg-[#FACC15]"
        />
      </div>
    </div>
  </div>
                        <AnimatePresence>
                            <motion.div className="space-y-3" {...animationProps}>
                                {(showAll ? stats.pendingRegistrations : stats.pendingRegistrations.slice(0, 2)).map((request) => (
                                    <div key={request.id} className="border-b pb-3 last:border-0 flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={selectedRegistrations.includes(request.id)}
                                      onChange={() => toggleRegistrationSelection(request.id)}
                                      className="form-checkbox h-4 w-4 border-2 border-[#FACC15] bg-white text-[#FACC15] rounded focus:ring-[#FACC15] focus:ring-offset-0 focus:ring-2 checked:bg-[#FACC15] checked:border-[#FACC15] mr-3"
                                    />
                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{request.name}</p>
                                                <p className="text-gray-500 text-sm">{request.email}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedRegistration(request)}
                                                className="px-3 py-1 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                            >
                                                View request
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                        {stats.pendingRegistrations.length > 2 && (
                            <div
                                className="mt-4 text-sm text-center text-black hover:underline cursor-pointer flex justify-center items-center gap-1"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? <><FiChevronUp size={16} /> See less</> : <><FiChevronDown size={16} /> See full list</>}
                            </div>
                        )}
                    </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-base font-semibold">Course publication requests</h2>
    <div className="flex items-center space-x-4">
      {isBatchDeleteMode && (
        <button
          onClick={handleBatchDeleteRegistrations}
          className="px-3 py-1 text-[#034732] rounded hover:bg-[#07885F] text-sm"
        >
          Delete Selected
        </button>
      )}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Select all</span>
        <input
          type="checkbox"
          checked={selectAllCourses}
          onChange={toggleAllCourses}
          className="form-checkbox h-4 w-4 border border-[#FACC15] rounded bg-white text-[#FACC15] focus:ring-1 focus:ring-[#FACC15] checked:bg-[#FACC15]"
        />
      </div>
    </div>
  </div>
                        <AnimatePresence>
                            <motion.div className="space-y-3" {...animationProps}>
                                {(showAllCourses ? stats.pendingCourseSubmissions : stats.pendingCourseSubmissions.slice(0, 2)).map((course) => (
                                    <div key={course.id} className="border-b pb-3 last:border-0 flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={selectedCourses.includes(course.id)}
                                      onChange={() => toggleCourseSelection(course.id)}
                                      className="form-checkbox h-4 w-4 border-2 border-[#FACC15] bg-white text-[#FACC15] rounded focus:ring-[#FACC15] focus:ring-offset-0 focus:ring-1 checked:bg-[#FACC15] checked:border-[#FACC15] mr-3"
                                    />
                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{course.title}</p>
                                                <p className="text-gray-500 text-sm">By {course.formateur}</p>
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
                        {stats.pendingCourseSubmissions.length > 2 && (
                            <div
                                className="mt-4 text-sm text-center text-black hover:underline cursor-pointer flex justify-center items-center gap-1"
                                onClick={() => setShowAllCourses(!showAllCourses)}
                            >
                                {showAllCourses ? <><FiChevronUp size={16} /> See less</> : <><FiChevronDown size={16} /> See full list</>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedRegistration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
    
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Trainer details</h3>
                                <button onClick={() => setSelectedRegistration(null)} className="text-gray-500">
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Personal information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Full name:</p>
                                            <p className="font-medium">{selectedRegistration.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Email:</p>
                                            <p className="font-medium">{selectedRegistration.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Phone Number :</p>
                                            <p className="font-medium">{selectedRegistration.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
  <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
  <div className="flex flex-wrap gap-3">
  
    {selectedRegistration.documents?.map((doc, index) => (
      doc?.fileUrl && (  
        <button
          key={index}
          onClick={() => handlePreviewFile(doc.fileUrl)}
          className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
        >
          <FiFileText className="mr-2" /> 
          {doc.documentType === 'CERTIFICAT' ? 'Certificat' : 'Expérience'} #{index + 1}
        </button>
      )
    ))}
  </div>
</div>
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => handleRejectRegistration(selectedRegistration.email)}
                                        className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleApproveRegistration(selectedRegistration.email)}
                                        className="px-4 py-2 bg-[#06895F] text-white rounded hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Course details</h3>
                                <button onClick={() => setSelectedCourse(null)} className="text-gray-500">
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
                                        <p className="font-medium">{selectedCourse.formateur}</p>
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
                        {/* Afficher tous les fichiers */}
                        {selectedCourse.files?.map((file, index) => (
                            <button 
                                key={index}
                                onClick={() => handlePreviewFile(file)}
                                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center"
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
                                        className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleApproveCourse(selectedCourse.id)}
                                        className="px-4 py-2 bg-[#06895F] text-white rounded hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {previewFile && <FilePreviewModal />}
        </div>
    );
};

export default Dashboard;