import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () =>
{
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-white-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Accès interdit</h1>
                <p className="text-lg text-white-700 mb-6">
                    Vous n'avez pas l'autorisation d'accéder à cette page.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
