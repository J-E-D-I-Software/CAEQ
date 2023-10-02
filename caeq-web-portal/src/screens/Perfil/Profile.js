import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArchitectUserById } from "../../client/ArchitectUser/ArchitectUser.GET";

import PersonalDataCardCard from '../../components/cards/PersonalDataCard';
import ContactDataCard from '../../components/cards/ContactDataCard';
import ProfesionalDataCard from '../../components/cards/ProfesionalDataCard';
import CAEQDataCard from '../../components/cards/CAEQDataCard';
import WhiteCard from '../../components/containers/WhiteCard/WhiteCard';

const Profile = (props) => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        if (searchParams.id)
            getArchitectUserById(searchParams.id)
            .then(response => setProfile(response))
            .catch(error => navigate('/404'));
            console.log(profile);
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


        <div className="PERSONALprofile-row PERSONALprofile-section">
            <h1>Personal Data</h1>
            <PersonalDataCardCard {...profile} />

            <h1>CAEQ Data</h1>
            <CAEQDataCard {...profile} />

            <h1>Contact Data</h1>
            <ContactDataCard {...profile} />

            <h1>Professional Data</h1>
            <ProfesionalDataCard {...profile} />
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