function ModeratorActivitiesTable({ moderators })
{
    if (!moderators || moderators.length === 0)
    {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-gray-600">Aucune activité de modérateur</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Activités des modérateurs</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Modérateur
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Approuvés
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rejetés
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                En attente
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {moderators.map(({ id, name, approved, rejected, pending }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{name}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                                    <div className="text-sm text-green-600 font-medium">{approved}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                                    <div className="text-sm text-red-600 font-medium">{rejected}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                                    <div className="text-sm text-amber-600 font-medium">{pending}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModeratorActivitiesTable;