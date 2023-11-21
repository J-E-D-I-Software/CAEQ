import React, { useEffect, useState } from 'react';
import PrincipalCard from '../../components/cards/PrincipalCard.jsx';
import info from '../../utils/infoPrincipal.js';
import './Principal.scss';

const Principal = () => {
    return (
        <div className='principal-container'>
            <h1>Bienvenido al portal CAEQ</h1>

            <div className='cards-container'>
              {info.map((item, index) => {
                  return (
                      <PrincipalCard
                          key={index}
                          title={item.title}
                          icon={item.icon}
                          description={item.description}
                          path={item.path}
                      />
                  );
              })}
            </div>
        </div>
    );
};

export default Principal;
