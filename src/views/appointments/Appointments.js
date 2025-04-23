import React, { useEffect, useState } from 'react'
import UserFilter from '../../components/Filter'
import ModalDelete from '../../components/ModalDelete'
import ModalInformation from '../../components/ModalInformation'

import './styles/appointments.css'
import '../users/styles/filter.css'
import '../users/styles/users.css'
import { formatDate } from '../../utils/dateUtils'
import { CCalendar } from '@coreui/react-pro'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilPencil, cilInfo, cilTrash, cilPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Appointments = () => {
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [filters, setFilters] = useState({
    patient: '',
    professional: '',
    status: '',
    city: '',
  })
  const [visible, setVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  const handleDelete = (appointment) => {
    setVisible(true)
  }

  const handleInfo = (appointment) => {
    setSelectedAppointment(appointment)
    setInfoVisible(true)
  }

  const handleEdit = (appointment) => {
    navigate(`/appointments/${appointment.id}`, { state: { appointment } })
  }

  const dataFilter = Object.keys(filters).map((key) => ({
    name: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    placeholder: `Buscar por ${key}`,
    type: 'text',
    value: filters[key],
    onChange: (e) => setFilters((prev) => ({ ...prev, [key]: e.target.value })),
  }))

  const normalizeText = (text) =>
    text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

  const handleFilter = () => {
    const activeFilters = Object.keys(filters).filter((key) => filters[key].trim() !== '')

    const filtered = appointments.filter((appointment) =>
      activeFilters.every((key) => {
        const appointmentValue = appointment[key] ? normalizeText(appointment[key]) : ''
        const filterValue = normalizeText(filters[key])
        return appointmentValue.startsWith(filterValue)
      }),
    )

    setFilteredAppointments(filtered)
  }

  const resetFilters = () => {
    const resetValues = Object.keys(filters).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {})
    setFilters(resetValues)
    setFilteredAppointments(appointments)
  }

  useEffect(() => {
    fetch('http://localhost:8000/appointments')
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data)
        setFilteredAppointments(data)
      })
  }, [])

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'confirmed':
        return 'info'
      case 'completed':
        return 'success'
      case 'canceled_by_patient':
        return 'danger'
      case 'canceled_by_professional':
        return 'dark'
      default:
        return 'secondary'
    }
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <CButton color="primary" onClick={() => console.log('Agregar cita')}>
          <CIcon icon={cilPlus} className="me-2" /> Add Appointment
        </CButton>
      </div>

      <CCard className="mb-4">
        <CCardHeader>Appointments</CCardHeader>
        <div className="filter-container">
          <UserFilter onFilter={handleFilter} resetFilters={resetFilters} dataFilter={dataFilter} />
        </div>

        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="table-header">Patient</CTableHeaderCell>
                <CTableHeaderCell className="table-header">Professional</CTableHeaderCell>
                <CTableHeaderCell className="table-header">Scheduled At</CTableHeaderCell>
                <CTableHeaderCell className="table-header">Status</CTableHeaderCell>
                <CTableHeaderCell className="table-header">City</CTableHeaderCell>
                <CTableHeaderCell className="table-header avatar-header">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredAppointments.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center">
                    No hay citas disponibles
                  </CTableDataCell>
                </CTableRow>
              ) : (
                filteredAppointments.map((appointment, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{appointment.patient}</CTableDataCell>
                    <CTableDataCell>{appointment.professional}</CTableDataCell>
                    <CTableDataCell>
                      {formatDate(appointment.scheduled_at, 'DATETIME')}{' '}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={getStatusBadgeColor(appointment.status)}>
                        {appointment.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{appointment.city}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2 justify-content-center">
                        <CButton color="primary" size="sm" onClick={() => handleEdit(appointment)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(appointment)}>
                          <CIcon icon={cilTrash} style={{ '--ci-primary-color': 'white' }} />
                        </CButton>
                        <CButton color="info" size="sm" onClick={() => handleInfo(appointment)}>
                          <CIcon icon={cilInfo} style={{ '--ci-primary-color': 'white' }} />
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <ModalDelete
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={() => {
          console.log('Eliminar acción esquematizada')
          setVisible(false)
        }}
        title="Confirmar eliminación de cita"
        message="¿Estás seguro de que deseas eliminar esta cita?"
      />

      <ModalInformation
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
        title="Información de la cita"
        content={
          selectedAppointment ? (
            <div>
              <p>
                <strong>Patient:</strong> {selectedAppointment.patient}
              </p>
              <p>
                <strong>Professional:</strong> {selectedAppointment.professional}
              </p>
              <p>
                <strong>Scheduled At:</strong> {selectedAppointment.scheduled_at}
              </p>
              <p>
                <strong>Status:</strong> {selectedAppointment.status}
              </p>
              <p>
                <strong>City:</strong> {selectedAppointment.city}
              </p>
              <p>
                <strong>Pathology:</strong>{' '}
                {selectedAppointment.pathology || 'No pathology available'}
              </p>
              <p>
                <strong>Notes:</strong> {selectedAppointment.notes || 'No notes available'}
              </p>
              <p>
                <strong>Reason for visit:</strong>{' '}
                {selectedAppointment.reason_for_visit || 'No notes available'}
              </p>
            </div>
          ) : (
            <p>No hay información disponible.</p>
          )
        }
      />
    </>
  )
}

export default Appointments
