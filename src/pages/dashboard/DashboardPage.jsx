/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import Chart from 'chart.js/auto';
import './dashboard.css';

function DashboardPage() {
    const [backgroundImage, setBackgroundImage] = useState('');
    const { user, weather, dashCards, reports, commits, release } = useAuth();
    const chartRef = useRef(null);
    const barChartRef = useRef(null);
    const doughnutChartRef = useRef(null);
    const barColors = ['#8A2BE2', '#FFFF00', '#FF0000', '#0000FF', '#9400D3', '#FFA500'];

    useEffect(() => {
        if (weather) {
            updateBackgroundImage(weather.weather[0].main);
        }
    }, [weather]);

    useEffect(() => {
        if (commits) {
            renderBarChart(commits);
        }
    }, [commits]);

    useEffect(() => {
        if (reports) {
            renderChart(reports);
        }
    }, [reports]);

    useEffect(() => {
        if (release) {
            renderDoughnutChart(release.nc_state);
        }
    }, [release]);

    // Renderiza un gráfico de línea
    function renderChart(reports) {
        const ctx = chartRef.current.getContext('2d');
        if (window.myLineChart) {
            window.myLineChart.destroy();
        }
        window.myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: reports.time.map(entry => entry.time),
                datasets: [{
                    label: 'Porcentaje de tiempo',
                    data: reports.time.map(entry => entry.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    // Renderiza un gráfico de barras
    const renderBarChart = (commits) => {
        const ctx = barChartRef.current.getContext('2d');
        if (window.myBarChart) {
            window.myBarChart.destroy();
        }
        window.myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: commits.map(commit => `Mes ${commit.month}`),
                datasets: [
                    {
                        label: 'Features',
                        data: commits.map(commit => commit.feat),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Fixes',
                        data: commits.map(commit => commit.fix),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };
    // Renderiza un gráfico de dona
    const renderDoughnutChart = (nc_state) => {
        const ctx = doughnutChartRef.current.getContext('2d');
        if (window.myDoughnutChart) {
            window.myDoughnutChart.destroy();
        }
        window.myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'NC State',
                    data: [nc_state.detected, nc_state.process, nc_state.solved],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    };
    // Actualiza la imagen de fondo según el clima
    const updateBackgroundImage = (weatherMain) => {
        let imageUrl = '';
        switch (weatherMain) {
            case 'Clouds':
                imageUrl = 'https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                break;
            case 'Clear':
                imageUrl = 'https://images.unsplash.com/photo-1691848746401-b40fdd5d823f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                break;
            case 'Rain':
                imageUrl = 'https://plus.unsplash.com/premium_photo-1670002344425-f274ee445f76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                break;
            case 'Snow':
                imageUrl = 'https://images.unsplash.com/photo-1681926520325-9a82f7d920d4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                break;
            default:
                imageUrl = 'https://plus.unsplash.com/premium_photo-1661897016268-b77ad5186d02?q=80&w=1955&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        }
        setBackgroundImage(imageUrl);
    };

    return (
        <div className="dashboard-container">
            <p>Bienvenido {user.name}</p>
            <p>Verifica tus alertas, posees 3 alertas sin leer</p>
            <div className="grid-container">
                <div className="grid-item weather-grid-item" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    {weather ? (
                        <div className="weather-info">
                            <div className="weather-details">
                                <h3>{Math.round(weather.main.temp - 273.15)}°C</h3>
                                <h4>{weather.weather[0].main}</h4>
                                <h5>{user.city}</h5>
                            </div>
                        </div>
                    ) : (
                        <h1>Cargando clima...</h1>
                    )}
                </div>
                <div className="grid-item grid-item-projects">
                    <div style={{ backgroundColor: '#7fa1fb' }}>
                        <p>Proyectos Registrados</p>
                        {dashCards && <p>{dashCards.projects}</p>}
                        <p>Ultimo proyecto registrado hace 15 dias</p>
                    </div>
                    <div style={{ backgroundColor: '#4c4aad' }}>
                        <p>Proyectos en desarrollo</p>
                        {dashCards && <p>{dashCards.projects_dev}</p>}
                        <p>Total de avance 22.009%</p>
                    </div>
                    <div style={{ backgroundColor: '#7878e8' }}>
                        <p>NC's sin resolver</p>
                        {dashCards && <p>{dashCards.peding_nc}</p>}
                        <p>Ultima NC registrada hace 1 dia</p>
                    </div>
                    <div style={{ backgroundColor: '#f3777f' }}>
                        <p>Cantidad de errores</p>
                        {dashCards && <p>{dashCards.errors_deploy}</p>}
                        <p>Ultimo error hace 2 horas</p>
                    </div>
                </div>
                <div className="grid-item-proyect grid-item-chart">
                    <div className="server-details">
                        <p>Detalles del servidor</p>
                        <p>El número total de sesiones dentro del rango de fechas. es el período en el que un usuario interactúa activamente con su sitio web. página por aplicación. etc.</p>
                    </div>
                    <div className="chart-info">
                        <div>
                            <p>Tiempo de uso</p>
                            <p className='reports'>{reports && reports.percentaje_time}%</p>
                        </div>
                        <div>
                            <p>Proyectos desplegados</p>
                            <p className='reports'>{reports && reports.deploys}</p>
                        </div>
                    </div>
                    <div className="chart-container">
                        <canvas ref={chartRef} id="lineChart"></canvas>
                    </div>
                </div>
                <div className="grid-item-commits">
                    <div className='commits-info'>
                        <p>Reporte de commits</p>
                        <p>Total de commits realizados por cada mes diferenciado entre los tag de ajustes(fix) y caracteristicas(features)</p>
                    </div>
                    <div className='chart-commits'>
                        <canvas ref={barChartRef} id="barChart"></canvas>
                    </div>
                </div>
                <div className="grid-item grid-item-full">
                    <div className="flex-container">
                        <div className='info-release'>
                            <p>Entregas</p>
                            <p>{release.porcentaje}%</p>
                            <p>Proximo ciclo: {release.cicle}</p>
                            <p>El ciclo de entre se calcula usando las fechas estimadas de los sprints en cada proyecto</p>
                        </div>
                        <div className="top-projects">
                            {release?.top_projects.map((project, index) => (
                                <div key={index} className="project">
                                    <div className="project-details">
                                        <p className="project-name">{project.name}</p>
                                        <div className="progress-bar">
                                            <div className="progress" style={{ width: `${project.porcentaje}%`, backgroundColor: barColors[index] }}>
                                                {project.porcentaje}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-status">
                                        <span>{project.is_nc}</span>
                                        <span>{project.is_delay}</span>
                                        <span>{project.is_deliver}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="doughnut-chart-container">
                            <div className="chart-wrapper">
                                <canvas ref={doughnutChartRef} id="doughnutChart" style={{ height: '200px' }}></canvas>
                            </div>
                            <div className="chart-release">
                                <div className="legend">
                                    <div className="legend-item">
                                        <span className="legend-color" style={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}></span>
                                        <span className="legend-label">Detectados</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-color" style={{ backgroundColor: 'rgba(54, 162, 235, 0.2)' }}></span>
                                        <span className="legend-label">En proceso</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-color" style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}></span>
                                        <span className="legend-label">Resueltos</span>
                                    </div>
                                </div>
                                <div className="values">
                                    <p>{release.nc_state.detected}</p>
                                    <p>{release.nc_state.process}</p>
                                    <p>{release.nc_state.solved}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;
