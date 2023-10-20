import React, { useEffect, useState }  from 'react';
import { getSpecialties } from '../../client/stats';
//import '../styles/charts.css' 

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
    responsive : true,
    maintainAspectRatio: true,
};

const PrincipalAdmin = () => {

    const [specialtyChartData, setSpecialtyChartData] = useState({
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Inscripciones por zona',
            fill: true,
          },
        ],
      });

    useEffect(() => {
        const fetchSpecialtyData = async () => {
          const data = await getSpecialties();
          const labels = data;
          const counts = data.count;
          setSpecialtyChartData({
            labels: labels,
            datasets: [
              {
                data: counts,
    
                label: 'Especialidades',
             
                backgroundColor: ['#18a3ad','#b97cbf','#BDBDBD','#F48FB1',
                '#81C784','#FF7043','#7b0e87','#30a5c2','#BA68C8','#C5E1A5','#82bfd9','#a8275b'],
    
                fill: false,
              },
            ],
          });
        };
        fetchSpecialtyData();
      }, []);
    return (
        <div>
             <h1 className="bg-info text-center font-monospace fw-bold lh-base">Gráficas ChartJS</h1>
            <div>
                <p className="m-2"><b>Ejemplo #1: </b>Gráfico de líneas básico</p>
                <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
                    <div style={{width:"100%", height:"100%", padding:"10px 0"}}>
                        <Pie data={specialtyChartData} options={options} />  
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PrincipalAdmin;