import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import './../../scss/style.scss'
const RecentPatientsTable = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/users')
        const data = await response.json()
        const filteredPatients = data.filter((user) => user.role_id === 'Patient')
        setPatients(filteredPatients)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }
    fetchData()
  }, [])

  const calculateAge = (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <CCard className="space-component">
      <CCardHeader>
        <h5>Pacientes recientes</h5>
      </CCardHeader>
      <CCardBody>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap">
            <CTableRow>
              <CTableHeaderCell className="avatar-header text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>Paciente</CTableHeaderCell>
              <CTableHeaderCell>Edad</CTableHeaderCell>
              <CTableHeaderCell>Ciudad</CTableHeaderCell>
              <CTableHeaderCell>Última Cita</CTableHeaderCell>
              <CTableHeaderCell>Especialidad Atendida</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {patients.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={6} className="text-center">
                  No hay pacientes disponibles
                </CTableDataCell>
              </CTableRow>
            ) : (
              patients.map((patient) => (
                <CTableRow key={patient.id}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={patient.avatar || 'default-avatar.png'} />
                  </CTableDataCell>
                  <CTableDataCell>{`${patient.first_name} ${patient.last_name}`}</CTableDataCell>
                  <CTableDataCell>{calculateAge(patient.birth_date)}</CTableDataCell>
                  <CTableDataCell>
                    {patient.address.split(',')[1]?.trim() || 'Desconocida'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {new Date(patient.updated_at).toLocaleDateString()}
                  </CTableDataCell>
                  <CTableDataCell>{'Consulta General'}</CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default RecentPatientsTable
