import React from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilUserFollow, cilListRich } from '@coreui/icons'
import ChartBarExample from './ChartBarExample'
import ChartsSection from './ChartsSection'
import RecentPatientsTable from './RecentPatientsTable'

const Dashboard = () => {
  return (
    <>
      <CRow className="mb-4">
        <CCol sm="4">
          <CCard
            className="text-dark"
            style={{ backgroundColor: '#d4edda', border: '2px solid #c3e6cb' }}
          >
            <CCardBody>
              <div className="fs-3 fw-bold">28</div>
              <div className="text-uppercase">Pacientes Atendidos</div>
              <small className="text-muted">En el último mes</small>
            </CCardBody>
            <CIcon icon={cilUser} size="xl" className="m-3 text-success" />
          </CCard>
        </CCol>
        <CCol sm="4">
          <CCard
            className="text-dark"
            style={{ backgroundColor: '#d1ecf1', border: '2px solid #bee5eb' }}
          >
            <CCardBody>
              <div className="fs-3 fw-bold">5</div>
              <div className="text-uppercase">Nuevos Pacientes</div>
              <small className="text-muted">Esta semana</small>
            </CCardBody>
            <CIcon icon={cilUserFollow} size="xl" className="m-3 text-info" />
          </CCard>
        </CCol>
        <CCol sm="4">
          <CCard
            className="text-dark"
            style={{ backgroundColor: '#fff3cd', border: '2px solid #ffeeba' }}
          >
            <CCardBody>
              <div className="fs-3 fw-bold">Consulta General</div>
              <div className="text-uppercase">Servicio Más Solicitado</div>
              <small className="text-muted">Basado en citas recientes</small>
            </CCardBody>
            <CIcon icon={cilListRich} size="xl" className="m-3 text-warning" />
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <ChartBarExample />
          <ChartsSection />
          <RecentPatientsTable />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
