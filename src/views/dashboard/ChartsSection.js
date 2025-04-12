import React, { useEffect, useRef } from 'react'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react'
import './Styles.css/ChartsSection.css'

const ChartsSection = () => {
  const doughnutRef = useRef(null)
  const pieRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      ;[doughnutRef, pieRef, barRef].forEach((ref) => {
        const chartInstance = ref.current
        if (chartInstance) {
          const { options } = chartInstance
          if (options.plugins?.legend?.labels) {
            options.plugins.legend.labels.color = getStyle('--cui-body-color')
          }
          chartInstance.update()
        }
      })
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  const doughnutData = {
    labels: ['San Cristóbal', 'Táriba', 'Pueblo Nuevo', 'La Concordia'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [4, 1, 1, 1], // Datos basados en el JSON
      },
    ],
  }

  const pieData = {
    labels: ['Consulta General', 'Pediatría', 'Cardiología', 'Dermatología'],
    datasets: [
      {
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        data: [50, 20, 15, 15], // Ejemplo de datos
      },
    ],
  }

  const options = {
    maintainAspectRatio: false, // Permite ajustar el tamaño del gráfico
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
  }

  return (
    <CCardBody className="mb-4">
      <div className="row">
        <div className="col-sm-6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>Pacientes por ciudad</CCardHeader>
            <CCardBody>
              <div className="chart-wrapper">
                <CChart type="doughnut" data={doughnutData} options={options} ref={doughnutRef} />
              </div>
            </CCardBody>
          </CCard>
        </div>
        <div className="col-sm-6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>Especialidades más solicitadas</CCardHeader>
            <CCardBody>
              <div className="chart-wrapper">
                <CChart type="doughnut" data={pieData} options={options} ref={doughnutRef} />
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </CCardBody>
  )
}

export default ChartsSection
