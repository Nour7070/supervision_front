import { useState, useEffect } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';

function FormateurValidations() {
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingFormateurs();
  }, []);

  const fetchPendingFormateurs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/supervision/formateurs/pending');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des formateurs');
      }
      const data = await response.json();
      setFormateurs(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/supervision/formateurs/${id}/approve`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'approbation du formateur');
      }
      
      // Mettre à jour l'interface après l'approbation
      fetchPendingFormateurs();
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`/supervision/formateurs/${id}/reject`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du rejet du formateur');
      }
      
      // Mettre à jour l'interface après le rejet
      fetchPendingFormateurs();
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Validation des formateurs</h1>
      
      {formateurs.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-600">Aucun formateur en attente de validation.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spécialité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formateurs.map((formateur) => (
                <tr key={formateur.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formateur.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formateur.nom}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formateur.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formateur.specialite}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {formateur.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(formateur.id)}
                        className="text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center px-3 py-1.5 transition-colors"
                      >
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Approuver
                      </button>
                      <button
                        onClick={() => handleReject(formateur.id)}
                        className="text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center px-3 py-1.5 transition-colors"
                      >
                        <XIcon className="w-4 h-4 mr-1" />
                        Rejeter
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FormateurValidations;