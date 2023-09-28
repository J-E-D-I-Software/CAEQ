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

  return (
    <div>
      {architectUsers.length > 0 && ( // Verificar que architectUsers tenga datos
        <InteractiveTable data={architectUsers} />
      )}
    </div>
  );
};

export default Directory;
