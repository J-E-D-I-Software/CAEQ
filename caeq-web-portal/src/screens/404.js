import '../styles/Page404.scss';
import { Link } from 'react-router-dom';
import LogoImage from '../components/images/caeqLogo.png';

const Page404 = () => {
    return (
        <div className="page-404">
            <div>
                <div>
                    <img src={LogoImage} width={300} />
                </div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <Link to="/Principal">Regresar el inicio</Link>
            </div>
        </div>
    );
}

export default Page404;
