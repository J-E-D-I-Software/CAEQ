import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";
import { getArchitectUserSaved } from "../../utils/auth";

import PersonalDataCardCard from '../../components/cards/PersonalDataCard';
import ContactDataCard from '../../components/cards/ContactDataCard';
import ProfesionalDataCard from '../../components/cards/ProfesionalDataCard';
import CAEQDataCard from '../../components/cards/CAEQDataCard';
import WhiteCard from '../../components/containers/WhiteCard/WhiteCard';
import '../../styles/profile.scss';

const Profile = (props) => {
    const searchParams = useParams();
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
        /*<div className='miPerfil'>
            <WhiteCard>
            <h1>Mi Perfil</h1>
            <p>{profile.fullName}</p>
            </WhiteCard>
            <WhiteCard>
            <h1>Mi Perfil</h1>
            <p>{profile.fullName}</p>
            </WhiteCard>
            <WhiteCard>
            <h1>Mi Perfil</h1>
            <p>{profile.fullName}</p>
            </WhiteCard>
            <WhiteCard>
            <h1>Mi Perfil</h1>
            <p>{profile.fullName}</p>
            </WhiteCard>

            
        </div>*/


        /*<div className="PERSONALprofile-row PERSONALprofile-section">
            <h1>Personal Data</h1>
            <PersonalDataCardCard {...profile} />

            <h1>CAEQ Data</h1>
            <CAEQDataCard {...profile} />

            <h1>Professional Data</h1>
            <ContactDataCard {...profile} />
            </div>*/

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
                <ContactDataCard {...profile} />
                </div>
            </div>
        </div>

    )

};

/*
 <div className="PERSONALprofile-row PERSONALprofile-section">
                {profile.map((profile, i) => (
                    <PersonalDataCardCard key={i} {...profile} />
                ))}
                </div>

            <div className="CAEQprofile-row CAEQprofile-section">
                {profile.map((profile, i) => (
                    <CAEQDataCard key={i} {...profile} />
                ))}
                </div>

            <div className="CONTACTprofile-row CONTACTprofile-section">
                {profile.map((profile, i) => (
                    <ContactDataCard key={i} {...profile} />
                ))}
                </div>

            <div className="PROFESSIONALprofile-row PROFESSIONALprofile-section">
                {profile.map((profile, i) => (
                    <ProfesionalDataCard key={i} {...profile} />
                ))}
                </div>
*/
export default Profile;