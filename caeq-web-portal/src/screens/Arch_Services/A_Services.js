import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/buttons/BaseButton";
import RoomCard from "../../components/cards/roomCard";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";
import '../Services/Services.scss';
import PaginationNav from "../../components/pagination/PaginationNav";
import { useEffect, useState } from "react";
import { getAllRooms } from "../../client/Services/Services.GET";
import { FireError, FireLoading } from "../../utils/alertHandler";
import axios from "axios";
import baseApiEndpoint from "../../client/backendConfig";
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';

const Services = () => {
    const [rooms, setRooms] = useState([]);
    const [paginationPage, setPaginationPage] = useState(1);
    const [orderBy, setOrderBy] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchData = async () => {
            let filters = '';
            if (orderBy) {
                if (orderBy === 'Nombre (A-Z)') filters += `&sort=courseName`;
                if (orderBy === 'Nombre (Z-A)') filters += `&sort=-courseName`;
            }

            const data = await getAllRooms(paginationPage, filters);
            setRooms(data)
        };
        try {
            fetchData();
        } catch (error) {
            FireError(error.response.data.message);
        }
    }, [orderBy, paginationPage]);

    /**
     * Handle clicking the 'Previous Page' button to navigate to the previous page of results.
     * Decrements the pagination page if it's greater than 1.
     *
     * @returns {void}
     */
    const handlePreviousPage = () => {
        if (paginationPage > 1) {
            setPaginationPage(paginationPage - 1);
        }
    };

    /**
     * Handle clicking the 'Next Page' button to navigate to the next page of results.
     * Increments the pagination page.
     *
     * @returns {void}
     */
    const handleNextPage = () => {
        setPaginationPage(paginationPage + 1);
    };

    const handleDownload = () => {
        const swal = FireLoading('Descargando tabulador de Excel...');
        window.open(`https://firebasestorage.googleapis.com/v0/b/caeq-system.appspot.com/o/TABULADOR-COSTO-BITACORAS.xlsx?alt=media&token=37f9e07b-3077-477f-8acd-7b407345f7c8`, '_blank');
    };

    return (
        <div className="services">
            <div className="services-title">
                <h1>Servicios CAEQ</h1>
            </div>
            <div className="services-content">
                <div className="services-subtitle">
                    <h1>Renta de salones</h1>
                </div>
                <div>
                    <DropdownInput
                        getVal={orderBy}
                        setVal={setOrderBy}
                        options={['Nombre (A-Z)', 'Nombre (Z-A)']}
                        placeholder='Ordenar por nombre'
                    />
                </div>
            </div>
            
            <div className="services-cards">
                {rooms.map((room, i) => (
                    <RoomCard key={i} {...room} />
                ))}
            </div>
            <div className="services-pagination">
                <PaginationNav 
                    onClickBefore={handlePreviousPage}
                    onClickAfter={handleNextPage}
                    page={paginationPage} 
                />
            </div>
            <div className="services-content">
                <div className="services-subtitle">
                    <h1>Tabulador de Bitácoras</h1>
                </div>
                <div className='services-row'>
                <BaseButton type='primary' onClick={handleDownload}>
                    Descargar Tabulador
                </BaseButton>
            </div>
            </div>
        </div>
    );
};

export default Services;