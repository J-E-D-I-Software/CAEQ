import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";
import { getArchitectUserSaved } from "../../utils/auth";

import PersonalDataCardCard from '../../components/cards/PersonalDataCard';
import ProfesionalDataCard from '../../components/cards/ProfesionalDataCard';
import CAEQDataCard from '../../components/cards/CAEQDataCard';
import '../../styles/profile.scss';

const Profile = (props) => {
    const SavedUser = getArchitectUserSaved();
    console.log("this", SavedUser);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        if (SavedUser._id)
            getArchitectUserById(SavedUser._id)
            .then(response => setProfile(response))
            .catch(error => navigate('/404'));
    }, []);

    return (
        <div className='profile'>
            <div className='profile-row'>
                <div className="PERSONALprofile-row PERSONALprofile-section">
                <br></br>
                <h1>Mis Datos Personales</h1>
                <PersonalDataCardCard {...profile} />
                </div>
            </div>
            <div className='profile-row'>
                <div className="PERSONALprofile-row PERSONALprofile-section">
                <br></br>
                <br></br>
                <br></br>
                <h1>Mis Datos CAEQ</h1>
                <CAEQDataCard {...profile} />
                </div>
            </div>
            <div className='profile-row'>
                <div className="PERSONALprofile-row PERSONALprofile-section">
                <br></br>
                <br></br>
                <br></br>
                <h1>Mis Datos Profesionales</h1>
                <ProfesionalDataCard {...profile} />
                </div>
            </div>
        </div>
    )
};

export default Profile;