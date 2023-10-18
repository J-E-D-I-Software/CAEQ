import React, { useEffect, useState, useRef }  from 'react';
import { getSpecialties } from '../../client/stats';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './PrincipalAdmin.scss'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const customColors = [
  '#81C784','#FF7043','#7b0e87','#30a5c2',
  '#BA68C8','#C5E1A5','#82bfd9','#a8275b'
];

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
                backgroundColor: customColors,
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
                label: 'Especialidades',               data: counts,
                backgroundColor: customColors,
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
        <div class="graph-container">
          <h1>Especialidades</h1>
          <div class="grid-container">
            <div class="pie-container">
              <Pie data={specialtyChartData} options={options} />
            </div>
            <div className="column">
              <Bar data={specialtyChartData2} options={barOptions} />
            </div>
          </div>
        </div>
    )
};

export default PrincipalAdmin;