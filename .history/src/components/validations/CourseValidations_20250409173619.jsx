import { useState, useEffect } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';

function CourseValidations() {
  const [validations, setValidations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchValidations();
  }, []);

  const fetchValidations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/validations');
      if (!response.ok) throw new Error("Erreur lors de la récupération des validations");
      const data = await response.json();
      setValidations(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const response = await fetch(`/validations/${id}/${action}`, { method: 'PUT' });
      if (!response.ok) throw new Error(`Erreur lors de l'${action === 'approve' ? 'approbation' : 'rejet'} du cours`);
      fetchValidations();
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Validation des cours</h1>
      {validations.length === 0 ? (
        <EmptyMessage message="Aucun cours en attente de validation." />
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du cours</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID du formateur</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {validations.map(({ id, coursNom, formateurId, status }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{id}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{coursNom}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formateurId}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => handleAction(id, 'approve')}
                          className="text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center justify-center px-2 py-1 text-xs sm:text-sm transition-colors"
                        >
                          <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Approuver
                        </button>
                        <button
                          onClick={() => handleAction(id, 'reject')}
                          className="text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center px-2 py-1 text-xs sm:text-sm transition-colors"
                        >
                          <XIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Rejeter
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Erreur!</strong>
    <span className="block sm:inline ml-1">{error}</span>
  </div>
);

const EmptyMessage = ({ message }) => (
  <div className="bg-white shadow rounded-lg p-6 text-center">
    <p className="text-gray-600">{message}</p>
  </div>
);

export default CourseValidations;