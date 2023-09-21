import { useState, useEffect } from "react";
import { getCaeqUsers } from './client/CaeqUser/CaeqUser.GET';
import { FireError, FireQuestion, FireSucess } from './utils/alertHandler';

import "./styles/styles.scss";
import WhiteContainer from "./components/containers/WhiteCard/WhiteCard";
import TextInput from "./components/inputs/TextInput/TextInput";
import LargeTextInput from "./components/inputs/TextInput/LargeTextInput";
import DateInput from "./components/inputs/DateInput/DateInput";
import HiddenTextInput from "./components/inputs/TextInput/HiddenTextInput";
import InfoBox from "./components/cards/InfoBox";
import Table from "./components/table/Table";
import InteractiveTable from "./components/table/InteractiveTable";
import DropdownInput from "./components/inputs/DropdownInput/DropdownInput";
import FileInput from "./components/inputs/FileInput/FileInput";
import BaseButton from "./components/buttons/BaseButton";
import NavbarButton from "./components/buttons/NavbarButton";
import Navbar from "./components/navbar/Navbar";
import ToggleSlider from "./components/ToggleSlider/ToggleSlider";

function App() {
  const [admins, setAdmins] = useState([]);
  const [response, setResponse] = useState(true);
  const [inputVal, setVal] = useState("");
  const [inputVal1, setVal2] = useState("");
  const [inputVal2, setVal3] = useState("");
  const options = ["Hombre", "Mujer", "Prefiero no decirlo"];
  
    useEffect(() => {
        (async () => {
            try {
                const confirmation = await FireQuestion(
                    '¿Está seguro de que desea obtener a los administradores?',
                    'Podrás ver todos los datos.'
                );
                setResponse(confirmation.isConfirmed);

                if (confirmation.isConfirmed) {
                    const caeqUsers = await getCaeqUsers();
                    setAdmins(caeqUsers);

                    FireSucess('Los administradores fueorn obtenidos con éxito.');
                }
            } catch (error) {
                FireError(error.response.data.message);
            }
        })();
    }, []);

  return (
    <div className="App">
      <p>
                {response
                    ? 'Se quieren ver a los admins'
                    : 'No se quiere evr a los admins'}
            </p>
            {admins.length === 0 ? (
                <WhiteContainer>
                    <h1>Sin admins</h1>
                </WhiteContainer>
            ) : (
                admins.map((admin) => (
                    <WhiteContainer>
                        <h1>{admin.fullName}</h1>
                        <h1>{admin.email}</h1>
                    </WhiteContainer>
                ))
            )}
      <p>Bienvenido al CAEQ:</p>
      <WhiteContainer>
        <h1>Componentes</h1>
        <p>{inputVal}</p>
        <p>{inputVal1}</p>
        <p>{inputVal2}</p>
      </WhiteContainer>
      <TextInput
        label="Text"
        getVal={inputVal}
        setVal={setVal}
        placeholder="Escibe aqui tu nombre"
        require={true}
      />
      <LargeTextInput
        label="Large Text"
        getVal={inputVal}
        setVal={setVal}
        placeholder="Escibe aqui tu nombre"
        require={true}
      />
      <DateInput 
        label="Date" 
        getVal={inputVal1} 
        setVal={setVal2} 
        require={true}
      />
      <HiddenTextInput
        label="Password"
        placeholder="Contraseña de 8 a 16 caracteres"
        require={true}
      />
      <DropdownInput 
        label="Select an option:" 
        options={options} 
        require={true}
      />
      <FileInput 
        label="File" 
        getVal={inputVal2} 
        setVal={setVal3}
        require={true} 
      />
      <InfoBox />
      <Table />
      <InteractiveTable />
      <BaseButton label="Botón" />
      <BaseButton label="Botón" type="primary" />
      <BaseButton label="Botón" type="success" />
      <BaseButton label="Botón" type="fail" />
      <BaseButton label="Botón" type="disabled" />
      {/* <NavbarButton label="Botón" type="navbar" /> */}
      <Navbar />
      <ToggleSlider />
    </div>
  );    
}

export default App;
