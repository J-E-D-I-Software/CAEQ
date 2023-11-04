import React, { useState, useEffect } from 'react';
import Logo from '../../components/images/caeqLogo.png';
import PublicTable from '../../components/table/PublicTable';
import InputText from '../../components/inputs/TextInput/TextInput';
import PaginationNav from '../../components/pagination/PaginationNav';
import { getAllPublicArchitectUsers } from '../../client/ArchitectUser/ArchitectUser.GET';
import BaseButton from '../../components/buttons/BaseButton';
import './publicDirectory.scss';

/**
 * PublicDirectory is a directory screen for all general public to get to
 * know more about public architechs info
 * @returns Landing Architect page
 */
const PublicDirectory = () => {
    const [architectUsers, setArchitectUsers] = useState([]);
    const [getArchitect, setArchitect] = useState('');
    const [paginationPage, setPaginationPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                let filters = '';
                filters += `fullName[regex]=${getArchitect}`;
                let architects = await getAllPublicArchitectUsers(
                    paginationPage,
                    filters
                );
                setArchitectUsers(architects);
            } catch (error) {}
        })();
    }, [paginationPage, getArchitect]);

    /**
     * Handles the action of returning to the previous page in pagination.
     */
    const handlePreviousPage = () => {
        if (paginationPage > 1) {
            setPaginationPage(paginationPage - 1);
        }
    };

    /**
     * Handles the action of advancing to the next page in pagination.
     */
    const handleNextPage = () => {
        setPaginationPage(paginationPage + 1);
    };

    return (
        <div className='directory'>
            <div className='directory-row directory-header'>
                <h1>Directorio de arquitectos</h1>
            </div>
            <label>
                <InputText
                    getVal={getArchitect}
                    setVal={setArchitect}
                    placeholder='Buscar por nombre'
                />
            </label>

            <div className='directory-row'>
                {architectUsers.length > 0 ? (
                    <div className='box-container'>
                        <PublicTable data={architectUsers} />
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
    );
};

export default PublicDirectory;
