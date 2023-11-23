import { FireError } from "../../utils/alertHandler";
import { useState, useEffect } from "react";
import { getMyInscriptionswithSessions } from "../../client/Inscription/Inscription.GET";
import CourseAttendee from "../../components/table/courseAttendee";
import "./MyInscriptions.scss";

/**
 * Renders the InscriptionAsistance component.
 *
 * @component
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered InscriptionAsistance component.
 */
const InscriptionAsistance = (props) => {
  const [session, setSession] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [filterModality] = useState("");
  const [filterSearchByName] = useState("");
  const [paginationPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";
      if (filterSearchByName)
        filters = `courseName[regex]=${filterSearchByName}`;
      if (filterModality) filters += `&modality=${filterModality}`;

      const data = await getMyInscriptionswithSessions(paginationPage, filters);
      setSession(data.sessions);
      setInscriptions(data.document);
    };
    try {
      fetchData();
    } catch (error) {
      FireError(error.response.data.message);
    }
  }, [filterSearchByName, filterModality]);

  return (
    <div className="inscription">
      {" "}
      {/* Cambié "classname" a "className" */}
      <div className="inscription-row">
        <h1>Asistencias a cursos inscritos</h1>
      </div>
      {inscriptions.map((inscription) => (
        <div className="box-container">
          <div className="inscription-row">
            <CourseAttendee
              hours={inscription.course.numberHours}
              course={inscription.course.courseName}
              userId={inscription.user}
              data={session.filter(
                (session) => session.course == inscription.course._id
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InscriptionAsistance;
