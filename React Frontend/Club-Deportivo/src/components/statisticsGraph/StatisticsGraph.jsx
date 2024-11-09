import { React, useContext, useEffect, useRef, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import "./StatisticsGraph.css";
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const StatisticsGraph = () => {
    const barChartRef = useRef();
    const lineChartRef = useRef();
    const pieChartRef = useRef();

    const [deportes, setDeportes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [cuotas, setCuotas] = useState([]);
    const {token} = useContext(AuthenticationContext)

    const labelsDeportes = deportes.map(item => item.sportName);
    const dataDeportes = deportes.map(item => item.memberCount);

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const currentYear = new Date().getFullYear();

    const labelsUsuarios = usuarios
        .filter(item => item.year === currentYear)
        .map(item => monthNames[item.month - 1]);

    const dataUsuarios = usuarios
        .filter(item => item.year === currentYear)
        .map(item => item.userCount);

    const test = cuotas.map(item => item.upToDatePercentage);
    const test2 = cuotas.map(item => item.overduePercentage);

    const barData = {
        labels: labelsDeportes,
        datasets: [
            {
                label: 'Deportes',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dataDeportes,
            },
        ],
    };

    const lineData = {
        labels: labelsUsuarios,
        datasets: [
            {
                label: 'Nuevos Usuarios',
                data: dataUsuarios,
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.3,
            },
        ],
    };

    const pieData = {
        labels: ['Cuota al día', 'Cuota atrasada'],
        datasets: [
            {
                label: 'Usuarios con cuota al día',
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                data: [test, test2],
            },
        ],
    };

    const fetchSports = async () => {
        try {
            const response = await fetch("https://localhost:7081/api/Statistics/Statistics/PopularSports", {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setDeportes(data);
            } else {
                throw new Error("Error al obtener los deportes");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchUsuarios = async () => {
        try {
            const response = await fetch("https://localhost:7081/api/Statistics/Statistics/NewUsers", {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            } else {
                throw new Error("Error al obtener los usuarios");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchCuotas = async () => {
        try {
            const response = await fetch("https://localhost:7081/api/Statistics/Statistics/PaymentStatus", {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCuotas(data);
            } else {
                throw new Error("Error al obtener los cuotas");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        return () => {
            if (barChartRef.current) barChartRef.current.destroy();
            if (lineChartRef.current) lineChartRef.current.destroy();
            if (pieChartRef.current) pieChartRef.current.destroy();
            fetchSports();
            fetchUsuarios();
            fetchCuotas();
        };
    }, []);

    return (
        <div>
            <div className='container-statistics'>
                <div className='statistics-column'>
                    <h3 className='user-title'>Deporte más practicado</h3>
                    <Bar ref={barChartRef} data={barData} />
                </div>

                <div className='statistics-column'>
                    <h3 className='user-title'>Nuevos Usuarios</h3>
                    <Line ref={lineChartRef} data={lineData} />
                </div>

                <div className="statistics-column" style={{ width: '300px', height: '300px' }}>
                    <h3 className="user-title">Usuarios con cuota al día</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Pie ref={pieChartRef} data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsGraph;
