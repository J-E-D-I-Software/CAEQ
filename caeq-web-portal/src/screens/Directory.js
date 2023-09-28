import React, { useState, useEffect } from "react";
import InteractiveTable from "../components/table/InteractiveTable";
import { getAllArchitectUsers } from "../client/ArchitectUser/ArchitectUser.GET";

const Directory = () => {
  const [architectUsers, setArchitectUsers] = useState([]);

  useEffect(() => {
    (async () => {
        try {
            const architects = await getAllArchitectUsers();
            
            setArchitectUsers(architects);
        } catch (error) {
            
        }
    })();
  }, []);

  useEffect(() => {
    console.log("Datos de arquitectos:", architectUsers);
  }, [architectUsers]);

  return (
    <div>
      <center>
        <h1>Directorio de Colegiados</h1>
      </center>
      <p>
        Los datos se han impreso en la consola del navegador. Abre la consola
        para verlos.
      </p>
      <InteractiveTable architectUsers={architectUsers} />
    </div>
  );
};

export default Directory;
