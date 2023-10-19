import React, { useState, useEffect } from 'react';
import './landingArchitect.scss';
import Logo from '../../components/images/caeqLogo.png';
import PublicTable from '../../components/table/PublicTable';
import InputText from '../../components/inputs/TextInput/TextInput';
import Image1 from '../../components/images/imageCAEQhome.png';
import Image2 from '../../components/images/imageCAEQ2.png';
import Image3 from '../../components/images/imageCAEQ3.png';
import { Link } from 'react-router-dom';
import PaginationNav from '../../components/pagination/PaginationNav';
import { getAllPublicArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.GET';
import BaseButton from '../../components/buttons/BaseButton';
import PrevIcon from '../../components/icons/previous.png';

/**
 * LandingArchitect is a welcome screen for all architechts to get to know more about CAEQ and see public info
 * @returns Landing Architect page
 */
const LandingArchitect = () => {
    const [architectUsers, setArchitectUsers] = useState([]);
    const [getArchitect, setArchitect] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                let filters = '';
                const architects = await getAllPublicArchitectUsers(
                    paginationPage,
                    filters
                );
                setArchitectUsers(architects);
            } catch (error) {}
        })();
    }, [paginationPage]);
    /**
     * Function that filters architects based on the search text.
     * @param {Object[]} data - The complete list of architects.
     * @param {string} searchText - The serach text.
     * @returns {Object[]} - The filtered list of architects.
     */
    const filterArchitects = (data, searchText) => {
        // Filter architects based on search text
        return data.filter((architect) => {
            // Convert all architect values ​​to text strings
            const architectValues = Object.values(architect).map((value) =>
                String(value).toLowerCase()
            );
            // Check if any value contains the search text
            return architectValues.some((value) =>
                value.includes(searchText.toLowerCase())
            );
        });
    };

    // Filter architects based on search text
    const filteredArchitects = filterArchitects(architectUsers, getArchitect);

    /**
     * Maneja la acción de retroceder a la página anterior en la paginación.
     */

    const handlePreviousPage = () => {
        if (paginationPage > 1) {
            setPaginationPage(paginationPage - 1);
        }
    };

    /**
     * Maneja la acción de avanzar a la siguiente página en la paginación.
     */
    const handleNextPage = () => {
        setPaginationPage(paginationPage + 1);
    };

    return (
        <div className='containercaeq'>
            <div className='welcome'>
                <div className='column left-column'>
                    <img src={Logo} alt='Logo' className='logo' />
                    <div className='titlecaeq'>
                        Bienvenidos al portal de colegiados
                    </div>
                    <p className='subtitlecaeq'>
                        Consulta tu información, cursos, cotizaciones y
                        servicios que se ofrecen en el CAEQ.
                    </p>
                    <div className='button-container'>
                        <Link to='/LoginUser'>
                            <BaseButton>Iniciar sesión</BaseButton>
                        </Link>

                        <Link to='/SignupUser'>
                            <BaseButton type='primary'>Registrarse</BaseButton>
                        </Link>
                    </div>
                </div>
                <div className='column right-column'>
                    <div className='adminbutton'>
                        <Link to='/welcomeAdmin'>
                            <BaseButton type='disabled'>
                                Familia CAEQ
                            </BaseButton>
                        </Link>
                    </div>
                    <img src={Image1} alt='Image1' className='image1' />
                </div>
            </div>
            <div className='infocaeq'>
                <div className='column left-column'>
                    <img src={Image3} alt='Image3' className='image3' />
                </div>
                <div className='column right-column'>
                    <div className='titleOne'>C A E Q</div>
                    <div className='descOne'>
                        Espacio de expresión, opinión, colaboración y
                        capacitación para promover e impulsar el mejoramiento
                        arquitectónico y urbano de Querétaro.
                    </div>
                </div>
            </div>
            <div className='infocaeq'>
                <div className='column left-column'>
                    <div className='titleTwo'>Objetivos</div>
                    <div className='descTwo'>
                        Integrar a los profesionistas de la arquitectura,
                        promoviendo, la participación dentro del gremio.
                    </div>
                </div>
                <div className='column right-column'>
                    <img src={Image2} alt='Image2' className='image2' />
                </div>
            </div>

            <div className='values'>
                <div className='titleThree'>Valores</div>
                <div className='descThree'>
                    HONESTIDAD | LEALTAD | TRANSPARENCIA | PROFESIONALISMO
                </div>
            </div>

            <div className='directory'>
                <div className='directory-row directory-header'>
                    <h1>Directorio de arquitectos</h1>
                </div>
                <label>
                    <InputText
                        getVal={getArchitect}
                        setVal={setArchitect}
                        placeholder='Buscar'
                    />
                </label>

                <div className='directory-row'>
                    {filteredArchitects.length > 0 ? (
                        <div className='box-container'>
                            <PublicTable data={filteredArchitects} />
                        </div>
                    ) : (
                        <p className='no-data-message'>
                            No hay colegiados disponibles
                        </p>
                    )}
                </div>
                <div className='directory-row directory-pagination'>
                    <PaginationNav
                        onClickBefore={handlePreviousPage}
                        onClickAfter={handleNextPage}
                        page={paginationPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingArchitect;
