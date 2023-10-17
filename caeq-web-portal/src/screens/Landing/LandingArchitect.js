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
     * Función que filtra los arquitectos en función del texto de búsqueda.
     * @param {Object[]} data - La lista de arquitectos completa.
     * @param {string} searchText - El texto de búsqueda.
     * @returns {Object[]} - La lista de arquitectos filtrada.
     */
    const filterArchitects = (data, searchText) => {
        // Filtrar los arquitectos en función del texto de búsqueda
        return data.filter((architect) => {
            // Convertir todos los valores de los arquitectos en cadenas de texto
            const architectValues = Object.values(architect).map((value) =>
                String(value).toLowerCase()
            );
            // Verificar si algún valor contiene el texto de búsqueda
            return architectValues.some((value) =>
                value.includes(searchText.toLowerCase())
            );
        });
    };

    // Filtrar los arquitectos en función del texto de búsqueda
    const filteredArchitects = filterArchitects(architectUsers, getArchitect);

    // Filtrar y excluir la última columna antes de pasar los datos a InteractiveTable
    const tablefilteredArchitects = filteredArchitects;

    const columnsToShow =
        filteredArchitects?.length > 0
            ? Object.keys(filteredArchitects[0])
            : [];

    if (columnsToShow.length > 1) {
        filteredArchitects.forEach((architect) => {
            // Elimina la última propiedad de cada objeto arquitecto
            delete architect[columnsToShow[columnsToShow.length - 1]];
        });
    }

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
