import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Chart from 'chart.js/auto';
import './dashboard.css'




function DashboardPage() {
    const [backgroundImage, setBackgroundImage] = useState('');
    const {
        user, weather, dashCards, reports
    } = useAuth();
    useEffect(() => {
        if (weather) {
            updateBackgroundImage(weather.weather[0].main);
        }
    }, [weather]);

    console.log(reports);
    function renderChart(reports) {
        const ctx = document.getElementById('lineChart');
        // Destruir gráfico anterior si existe
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
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
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

    useEffect(() => {
        if (reports) {
            renderChart(reports);
        }
    }, [reports]);
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
                <div className="grid-item">
                    <canvas id="lineChart"></canvas>
                </div>
                <div className="grid-item">Detalles</div>
                <div className="grid-item grid-item-full">Entregas</div>
            </div>
        </div>
    );
}

export default DashboardPage;
