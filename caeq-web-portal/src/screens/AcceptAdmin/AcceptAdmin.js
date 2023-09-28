import React, { useState, useEffect } from 'react';
import './AcceptAdmin.scss';
import AcceptIcon from '../../components/icons/AcceptIcon.png';
import RejectIcon from '../../components/icons/RejectIcon.png';
import AdminCard from '../../components/cards/AdminCard';
import { getCaeqUsers } from '../../client/CaeqUser/CaeqUser.GET';
import { FireError, FireSucess, FireLoading } from '../../utils/alertHandler';

const AcceptAdmin = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const admins = await getCaeqUsers();

                setAdmins(admins);
            } catch (error) {
                FireError(error.message);
            }
        })();
    }, []);

    return (
        <div className='accept-admin'>
            <h1>Administradores por registrar</h1>
            <h2>
                El propósito de esta sección es conceder autorizaciones a otras cuentas
                para permitirles el acceso al portal de administración.
            </h2>
            <div className='instruction'>
                <img src={AcceptIcon} alt={`Accept Icon`} />
                <h3>
                    Da click a para aceptar la petición de otorgar a una cuenta acceso al
                    portal de administración.
                </h3>
            </div>
            <div className='instruction'>
                <img src={RejectIcon} alt={`Reject Icon`} />
                <h3>
                    Da click para rechazar la petición de otorgar a una cuenta acceso al
                    portal de administración.
                </h3>
            </div>
            <div className='admin-cards'>
                {admins.map((admin) => (
                    <AdminCard email={admin.email} fullName={admin.fullName} />
                ))}
            </div>
        </div>
    );
};

export default AcceptAdmin;
