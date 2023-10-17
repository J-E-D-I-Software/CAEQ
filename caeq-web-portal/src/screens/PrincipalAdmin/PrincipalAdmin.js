import React, { useEffect, useState, useRef }  from 'react';
import { getSpecialties } from '../../client/stats';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

var options = {
    responsive : true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const dataset = context.dataset.data || [];
            const sum = dataset.reduce((a, b) => a + b, 0);
            const percentage = ((value / sum) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
};

var barOptions = {
  responsive: true,
};

const PrincipalAdmin = () => {
    const [specialtyChartData, setSpecialtyChartData] = useState({
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Especialidades de colegiados',
            fill: true,
          },
        ],
      });
    
    const [specialtyChartData2, setSpecialtyChartData2] = useState({
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Especialidades de colegiados',
          fill: true,
          lineTension: 0.7,
        },
      ],
    });

    useEffect(() => {
      const fetchSpecialtyDataPie = async () => {
        try {
          const data = await getSpecialties(); // Fetch data from your server
          const labels = data.map((specialty) => specialty.name); // Extract specialty names
          const counts = data.map((specialty) => specialty.totalUsers); // Extract user counts
  
          setSpecialtyChartData({
            labels: labels,
            datasets: [
              {
                data: counts,
                backgroundColor: ['#18a3ad','#b97cbf','#BDBDBD','#F48FB1',
                '#81C784','#FF7043','#7b0e87','#30a5c2','#BA68C8','#C5E1A5','#82bfd9','#a8275b'],
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching specialty data:', error);
          // Handle error as needed
        }
      };
      fetchSpecialtyDataPie();
    }, []);

    useEffect(() => {
      const fetchSpecialtyDataLine = async () => {
        try {
          const data = await getSpecialties(); // Fetch data from your server
          const labels = data.map((specialty) => specialty.name); // Extract specialty names
          const counts = data.map((specialty) => specialty.totalUsers); // Extract user counts
  
          setSpecialtyChartData2({
            labels: labels,
            datasets: [
              {
                data: counts,
                backgroundColor: ['#18a3ad','#b97cbf','#BDBDBD','#F48FB1',
                '#81C784','#FF7043','#7b0e87','#30a5c2','#BA68C8','#C5E1A5','#82bfd9','#a8275b'],
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching specialty data:', error);
          // Handle error as needed
        }
      };
      fetchSpecialtyDataLine();
    }, []);


    return (
        <div class="grid-container">
          <h1>Especialidades</h1>
        <div className="column">
          <p><b>Ejemplo #1:</b> Gráfico de Pastel</p>
          <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "230px" }}>
            <div style={{ width: "100%", height: "100%", padding: "10px 0" }}>
              <Pie data={specialtyChartData} options={options} />
            </div>
          </div>
        </div>
        <div className="column">
          <p><b>Ejemplo #2:</b> Gráfico de Barras</p>
          <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "230px" }}>
            <div style={{ width: "100%", height: "100%", padding: "10px 0" }}>
              <Bar data={specialtyChartData2} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    )
};

export default PrincipalAdmin;