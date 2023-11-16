import { useNavigate } from 'react-router-dom';
import BaseButton from '../../components/buttons/BaseButton';
import RoomCard from '../../components/cards/roomCard';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import './Services.scss';
import PaginationNav from '../../components/pagination/PaginationNav';
import { useEffect, useState } from 'react';
import { getAllRooms } from '../../client/Services/Services.GET';
import { FireError } from '../../utils/alertHandler';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';

const Services = () => {
    const [rooms, setRooms] = useState([]);
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationEnabled, setPaginationEnabled] = useState([true, true]);
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
            setRooms(data);
            if (paginationPage === 1 && data.length)
                setPaginationEnabled([false, true]);
            else if (paginationPage === 1 && !data.length)
                setPaginationEnabled([false, false]);
            else if (paginationPage > 1 && !data.length)
                setPaginationEnabled([true, false]);
            else if (paginationPage > 1 && data.length)
                setPaginationEnabled([true, true]);
            else setPaginationEnabled([true, true]);
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

    return (
        <div className='services'>
            <div className='services-title'>
                <h1>Servicios CAEQ</h1>
            </div>
            <div className='services-content'>
                <div className='services-subtitle'>
                    <h1>Renta de salones</h1>
                    <RestrictByRole allowedRoles={['caeq']}>
                    <BaseButton type='primary' onClick={() => navigate('/Servicios/CrearSalon')}>
                        Ofertar salón
                    </BaseButton>
                    </RestrictByRole>
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
            
            <div className='services-cards'>
                {rooms.map((room, i) => (
                    <RoomCard key={i} {...room} />
                ))}
            </div>
            <div className='services-pagination'>
                <PaginationNav 
                    onClickBefore={handlePreviousPage}
                    onClickAfter={handleNextPage}
                    page={paginationPage}
                    beforeBtnEnabled={paginationEnabled[0]}
                    afterBtnEnabled={paginationEnabled[1]} 
                />
            </div>
        </div>
    );
};

export default Services;