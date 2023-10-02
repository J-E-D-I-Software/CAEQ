import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";

import TextInput from "../../components/inputs/TextInput/TextInput";


const ArchitectDetail = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});

    useEffect(() => {
        if (searchParams.id)
            getArchitectUserById(searchParams.id)
            .then(response => setData(response))
            .catch(error => navigate('/404'));
            console.log(data);
    }, []);

    return (
        <div className="architect-detail">
            <h1>ArchitectDetail</h1>
            <TextInput label="Nombre Completo" placeholder="Nombre" getVal={data.fullName} setVal={"nope"} />
        </div>
       

    );
}

export default ArchitectDetail;