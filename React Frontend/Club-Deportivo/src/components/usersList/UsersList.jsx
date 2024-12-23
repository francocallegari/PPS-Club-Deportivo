import React, { useContext, useEffect, useState } from 'react';
import './UsersList.css';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const UsersList = ({ option, sportId }) => {
  const [response, setResponse] = useState([]);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (option !== "sportMembers") {
      const fetchUsers = async () => {
        try {
          const response = await fetch("https://localhost:7081/api/User", {
            method: "GET",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            filterUsers(data, option);
          } else {
            throw new Error(`Error al obtener los usuarios: ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchUsers();
    }
  }, [option]);

  const filterUsers = (usersList, option) => {
    switch (option) {
      case "admins":
        setResponse(usersList.filter((u) => u.userType === "Admin"));
        break;
      case "members":
        setResponse(usersList.filter((u) => u.userType === "Member"));
        break;
      case "directors":
        setResponse(usersList.filter((u) => u.userType === "Director"));
        break;
      case "coaches":
        setResponse(usersList.filter((u) => u.userType === "Coach"));
        break;
      default:
        setResponse(usersList);
    }
  };

  useEffect(() => {
    if (option === "sportMembers" && sportId) {
      const fetchMembersBySport = async () => {
        try {
          const response = await fetch(
            `https://localhost:7081/api/Sports/GetMembers/${sportId}`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
              setResponse(data);  // Si hay miembros, actualiza el estado
            } else {
              setResponse([]);  // Si no hay miembros, establece el estado vacío
            }
          } else {
            const errorDetail = await response.text();
            throw new Error(
              `Error al obtener los miembros por deporte: ${response.statusText}. Detalle: ${errorDetail}`
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchMembersBySport();
    }
  }, [option, sportId]);

  return (
    <div className="users-list">
      {response.length > 0 ? (
        response.map((u) => (
          <p key={u.id} className="list-item">
            <i className="fas fa-user"></i>DNI: {u.dni} -- Nombre: {u.name} -- Email: {u.email}
          </p>
        ))
      ) : (
        <p style={{ margin: "40px" }}>No hay miembros registrados para este deporte.</p>

      )}
    </div>
  );
};

export default UsersList;
