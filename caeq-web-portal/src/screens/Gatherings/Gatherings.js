import React, { useEffect, useState } from 'react';
import BaseButton from '../../components/buttons/BaseButton';
import GatheringCard from '../../components/cards/GatheringCard';
import { getAllGatherings } from '../../client/Gathering/Gathering.GET';
import { useNavigate } from 'react-router-dom';
import './Gatherings.scss';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';
import TextInput from '../../components/inputs/TextInput/TextInput';

const FilterByName = ({ filterValue, setFilterValue, placeholder }) => {
    return (
        <div className="filter-by-name">
            <input
                type="text"
                placeholder={placeholder}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
            />
        </div>
    );
};

const Gatherings = (props) => {
    const [futureGatherings, setFutureGatherings] = useState([]);
    const [pastGatherings, setPastGatherings] = useState([]);
    const [filterSearchByNameFuture, setFilterSearchByNameFuture] = useState('');
    const [filterSearchByNamePast, setFilterSearchByNamePast] = useState('');
    const [paginationPageFuture, setPaginationPageFuture] = useState(1);
    const [paginationPagePast, setPaginationPagePast] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let filtersFuture = '';
            if (filterSearchByNameFuture) {
                filtersFuture = `title[regex]=${filterSearchByNameFuture}`;
            }
            let filtersPast = '';
            if (filterSearchByNamePast) {
                filtersPast = `title[regex]=${filterSearchByNamePast}`;
            }

            const currentDate = new Date();
            const futureFilters = `date[gte]=${currentDate}&sort=date`;
            
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);
            twoYearsAgo.setMonth(1); //Set February as the base month
            
            const pastFilters = `date[lt]=${currentDate}&date[gte]=${twoYearsAgo}&sort=-date`;

            const futureData = await getAllGatherings(
                paginationPageFuture,
                filtersFuture + '&' + futureFilters
            );
            const pastData = await getAllGatherings(
                paginationPagePast,
                filtersPast + '&' + pastFilters
            );

            setFutureGatherings(futureData);
            setPastGatherings(pastData);
        };

        try {
            fetchData();
        } catch (error) {}
    }, [
        filterSearchByNameFuture,
        filterSearchByNamePast,
        paginationPageFuture,
        paginationPagePast,
    ]);


    const handlePreviousPagePast = () => {
        if (paginationPagePast > 1) {
            setPaginationPagePast(paginationPagePast - 1);
        }
    };

    const handleNextPagePast = () => {
        setPaginationPagePast(paginationPagePast + 1);
    };

    return (
        <div className="gatherings">
            <div className="create-gathering">
                <RestrictByRole allowedRoles={['caeq']}>
                    <BaseButton
                        type="primary"
                        onClick={() => navigate('/Asambleas/Asamblea')}
                    >
                        Crear asamblea
                    </BaseButton>
                </RestrictByRole>
            </div>

            <div className="gathering__section">
                <h1>Asamblea Próxima</h1>
                <div className="gathering-row">
                    {
                    (futureGatherings.length === 0) ? <h1>Aún no se publica la próxima asamblea.  </h1> : (
                    futureGatherings.map((gathering, i) => (
                        <GatheringCard
                            key={i}
                            data={gathering}
                            className="gathering-card"
                        />
                    ))
                    
                    )}
                </div>
            </div>

            <RestrictByRole allowedRoles={['caeq']}>
                <div className="gathering__section">
                    <h1>Asambleas Anteriores</h1>
                    <div className="filter__section">
                        <TextInput
                            getVal={filterSearchByNamePast}
                            setVal={setFilterSearchByNamePast}
                            placeholder="Buscar por nombre"
                        />
                    </div>
                    <div className="gathering-row">
                        {pastGatherings.map((gathering, i) => (
                            <GatheringCard
                                key={i}
                                data={gathering}
                                className="gathering-card"
                            />
                        ))}
                    </div>
                    <div className="gathering-pages">
                        <BaseButton onClick={handlePreviousPagePast}>Anterior</BaseButton>
                        {pastGatherings.length > 0 ? (
                            <BaseButton onClick={handleNextPagePast}>
                                Siguiente
                            </BaseButton>
                        ) : (
                            <p>Sin asambleas</p>
                        )}
                    </div>
                </div>
            </RestrictByRole>
        </div>
    );
};

export default Gatherings;
