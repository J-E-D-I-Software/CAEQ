import React, { useEffect, useState } from 'react';
import { getSpecialties } from '../../client/stats';
import { getAnnuities } from '../../client/stats';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './PrincipalAdmin.scss';
import GraphContainer from '../../components/containers/WhiteCard/GraphCard';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/**
 * Array of colors that match colors of  both specialty graphs
 */
const customColors = [
    '#3c70c9',
    '#c79e2c',
    '#7b0e87',
    '#30a5c2',
    '#BA68C8',
    '#C5E1A5',
    '#82bfd9',
    '#a8275b',
];

var pieOptions = {
    responsive: true,
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
        title: {
            display: true,
            text: 'Especialidades de los colegiados',
            font: {
                size: 30,
            },
        },
    },
};

var pieOptions1 = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.parsed || 0;
          return `${label}: ${value}`;
        },
      },
    },
    title: {
      display: true,
      text: 'Estatus de los colegiados',
      font: {
        size: 30,
      },
    },
  },
};

var barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Especialidades de los colegiados',
            font: {
                size: 30,
            },
        },
        legend: {
            display: false,
            labels: {
                display: false,
                boxWidth: 0,
            },
        },
    },
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
                lineTension: 0.1,
            },
        ],
    });

    useEffect(() => {
        const fetchSpecialtyDataPie = async () => {
            try {
                const data = await getSpecialties(); 
                const labels = data.map((specialty) => specialty.name); 
                const counts = data.map((specialty) => specialty.totalUsers); 

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

    const truncateLabel = (label, maxLength) => {
        if (label.length > maxLength) {
            return label.substring(0, maxLength) + '...';
        }
        return label;
    };

    useEffect(() => {
        const fetchSpecialtyDataLine = async () => {
            try {
                const data = await getSpecialties(); 
                const labels = data.map((specialty) => specialty.name); 
                const counts = data.map((specialty) => specialty.totalUsers); 

                const truncateLabels = labels.map((label) => truncateLabel(label, 5));

                const customOrder = [
                    'DRO',
                    'DUYA',
                    'Dictaminador estructural',
                    'Corresponsable en instalaciones',
                    'Corresponsable en instalaciones eléctricas',
                    'Corresponsable en seguridad estructural',
                    'Revisor de bajo riesgo para micronegocios',
                ];

                const sortedLabels = labels.slice().sort((a, b) => {
                    return customOrder.indexOf(a) - customOrder.indexOf(b);
                });

                setSpecialtyChartData2({
                    labels: sortedLabels,
                    datasets: [
                        {
                            data: counts,
                            label: '',
                            backgroundColor: customColors,
                            fill: false,
                            lineTension: 1,
                            fullLabels: labels,
                        },
                    ],
                });

                if (window.innerWidth <= 600) {
                    setSpecialtyChartData2({
                        labels: truncateLabels,
                        datasets: [
                            {
                                data: counts,
                                label: '',
                                backgroundColor: customColors,
                                fill: false,
                                lineTension: 1,
                                fullLabels: labels,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error fetching specialty data:', error);
                // Handle error as needed
            }
        };
        fetchSpecialtyDataLine();
    }, []);

    const [annuityChartData, setAnnuityChartData] = useState({
        labels: ['Pagada', 'No Pagada'],
        datasets: [
            {
                data: [],
                backgroundColor: ['#3c70c9', '#c79e2c'],
            },
        ],
    });

    useEffect(() => {
      const fetchAnnuityData = async () => {
          try {
              const data = await getAnnuities();
              const paidCount = data.find((annuity) => annuity._id === true)?.totalUsers || 0;
              const unpaidCount = data.find((annuity) => annuity._id === false)?.totalUsers || 0;
  
              setAnnuityChartData({
                  labels: ['Pagada', 'No Pagada'],
                  datasets: [
                      {
                          data: [paidCount, unpaidCount],
                          backgroundColor: ['#3c70c9', '#c79e2c'],
                      },
                  ],
              });
          } catch (error) {
              console.error('Error fetching annuity data:', error);
          }
      };
  
      fetchAnnuityData();
  }, []);
  

    return (
        <div className='graph-container'>
            <h1>Gráficas de Especialidades y Anualidades</h1>
            <div className='grid-container'>
                <div className='column'>
                    <GraphContainer>
                        <Bar data={specialtyChartData2} options={barOptions} />
                    </GraphContainer>
                </div>
                <div className='column'>
                    <GraphContainer>
                        <Pie data={specialtyChartData} options={pieOptions} />
                    </GraphContainer>
                </div>
                <div className='column'>
                    <GraphContainer>
                        <Pie data={annuityChartData} options={pieOptions1} />
                    </GraphContainer>
                </div>
            </div>
        </div>
    );
};

export default PrincipalAdmin;
