import React, { useRef, useEffect } from 'react'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import './Styles.css/ChartBarExample.css'

const ChartBarExample = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chartInstance = chartRef.current?.chart
    if (chartInstance) {
      chartInstance.update() // Asegúrate de que se actualice la configuración
    }
  }, [])

  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    datasets: [
      {
        label: 'Programadas',
        backgroundColor: '#4caf50',
        data: [30, 50, 40, 60, 70, 80, 90, 100, 110],
      },
      {
        label: 'Completadas',
        backgroundColor: '#2196f3',
        data: [20, 40, 30, 50, 60, 70, 80, 90, 100],
      },
      {
        label: 'Pendientes',
        backgroundColor: '#ff9800',
        data: [10, 20, 15, 25, 35, 45, 55, 65, 75],
      },
    ],
  }

  const data2 = {
    labels: ['Laura González', 'Jorge Sánchez', 'Pedro Ramírez', 'Diana Moreno'],
    datasets: [
      {
        label: 'Pacientes Atendidos',
        backgroundColor: '#4caf50',
        data: [10, 8, 5, 3], // Ejemplo de datos para los profesionales
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500, // Ajusta la duración si es necesario
      easing: 'easeInOutQuad',
    },
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        type: 'category',
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <CCardBody className="space-component">
      <div className="row">
        <div className="col-sm-6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>Resumen de citas</CCardHeader>
            <CCardBody>
              <div className="chart-wrapper">
                <CChart type="bar" data={data1} options={options} ref={chartRef} />
              </div>
            </CCardBody>
          </CCard>
        </div>
        <div className="col-sm-6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Profesionales con mas pacientes
            </CCardHeader>
            <CCardBody>
              <div className="chart-wrapper">
                <CChart type="bar" data={data2} options={options} ref={chartRef} />
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </CCardBody>
  )
}

export default ChartBarExample
