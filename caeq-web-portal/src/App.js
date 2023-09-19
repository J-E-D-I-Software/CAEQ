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
import { useState } from "react";
import BaseButton from "./components/buttons/BaseButton";
import NavbarButton from "./components/buttons/NavbarButton";
import Navbar from "./components/navbar/Navbar";
import ToggleSlider from "./components/ToggleSlider/ToggleSlider";

function App() {
  const [inputVal, setVal] = useState("");
  const [inputVal1, setVal2] = useState("");
  const [inputVal2, setVal3] = useState("");
  const options = ["Hombre", "Mujer", "Prefiero no decirlo"];

  return (
    <div className="App">
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
      />
      <LargeTextInput
        label="Large Text"
        getVal={inputVal}
        setVal={setVal}
        placeholder="Escibe aqui tu nombre"
      />
      <DateInput label="Date" getVal={inputVal1} setVal={setVal2} />
      <HiddenTextInput
        label="Password"
        placeholder="Contraseña de 8 a 16 caracteres"
      />
      <DropdownInput label="Select an option:" options={options} />
      <FileInput label="File" getVal={inputVal2} setVal={setVal3} />
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
