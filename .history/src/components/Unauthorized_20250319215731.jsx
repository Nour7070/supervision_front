import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="unauthorized-container">
            <h1>Accès interdit</h1>
            <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
            <button onClick={() => navigate("/")}>Retour à l'accueil</button>
        </div>
    );
};

export default Unauthorized;
