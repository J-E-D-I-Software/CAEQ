import NavbarButton from "../buttons/NavbarButton";
import BaseButton from "../buttons/BaseButton";
import "./Navbar.scss";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (

    <div className="navbar">
      <div className="navbar-button">
        <BaseButton label="Cerrar sesión" type="fail" />
      </div>
      <div className="navbar-center">
        {routes
          .filter((route) => route.inNavbar)
          .map((route) => (
            <NavbarButton
              label={route.name} 
              key={route.path}
              className='button-navbar'
              id='inicio_btn'
              icon={route.icon}
              action={() => navigate(route.path)}/>
              
        ))}
      </div>
    </div>

  );
};

export default Navbar;