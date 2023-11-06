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
            const pastFilters = `date[lt]=${currentDate}&sort=-date`;

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

    const handlePreviousPageFuture = () => {
        if (paginationPageFuture > 1) {
            setPaginationPageFuture(paginationPageFuture - 1);
        }
    };

    const handleNextPageFuture = () => {
        setPaginationPageFuture(paginationPageFuture + 1);
    };

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
            <div className="gatherings_title--row">
                <h1>Asambleas</h1>
            </div>
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
                <h1>Asambleas Próximas</h1>
                <div className="filter__section">
                    <TextInput
                        getVal={filterSearchByNameFuture}
                        setVal={setFilterSearchByNameFuture}
                        placeholder="Buscar por nombre"
                    />
                </div>
                <div className="gathering-row">
                    {futureGatherings.map((gathering, i) => (
                        <GatheringCard
                            key={i}
                            data={gathering}
                            className="gathering-card"
                        />
                    ))}
                </div>
                <div className="gathering-pages">
                    <BaseButton onClick={handlePreviousPageFuture}>Anterior</BaseButton>
                    <BaseButton onClick={handleNextPageFuture}>Siguiente</BaseButton>
                </div>
            </div>

            <div className="gathering__section">
                <h1>Asambleas Antiguas</h1>
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
                    <BaseButton onClick={handleNextPagePast}>Siguiente</BaseButton>
                </div>
            </div>
        </div>
    );
};

export default Gatherings;
