import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './styles/EditAppointment.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'

const EditAppointment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null) // only for display
  const [editedAppointment, setEditedAppointment] = useState(null) // for editing
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAppointment(null)
    setEditedAppointment(null)
    setLoading(true)

    if (location.state && location.state.appointment) {
      const newAppointment = location.state.appointment
      setAppointment(newAppointment)
      setEditedAppointment({ ...newAppointment }) // clone for editing
      localStorage.setItem('selectedAppointment', JSON.stringify(newAppointment))
      setLoading(false)
    } else {
      const storedAppointment = localStorage.getItem('selectedAppointment')
      if (storedAppointment) {
        const parsed = JSON.parse(storedAppointment)
        setAppointment(parsed)
        setEditedAppointment({ ...parsed })
      }
      setLoading(false)
    }
  }, [location])

  if (loading) return <p>Loading appointment...</p>
  if (!appointment || !editedAppointment) return <p>Appointment not found.</p>

  const handleSaveChanges = () => {
    console.log('Updated data:')

    navigate('/appointments') // Redirect to the appointment list
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setEditedAppointment((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <CRow>
      <CCol md={12}>
        <h3 className="mb-4">Edit Appointment</h3>
      </CCol>
      <CCol md={4}>
        <CCard>
          <CCardBody>
            <CCardTitle className="text-primary">Patient: {appointment.patient}</CCardTitle>
            <CCardText>
              <strong>Professional:</strong> {appointment.professional} <br />
              <strong>Status:</strong> {appointment.status} <br />
              <strong>Scheduled Date:</strong> {new Date(appointment.scheduled_at).toLocaleString()}{' '}
              <br />
              <strong>City:</strong> {appointment.city} <br />
              <strong>Reason:</strong> {appointment.reason_for_visit}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={8}>
        <CCard>
          <CCardBody>
            <CCardTitle>Edit Appointment Information</CCardTitle>
            <CFormInput
              type="text"
              id="patient"
              floatingLabel="Patient"
              value={editedAppointment.patient}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="professional"
              floatingLabel="Professional"
              value={editedAppointment.professional}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="datetime-local"
              id="scheduled_at"
              floatingLabel="Scheduled Date"
              value={editedAppointment.scheduled_at}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormTextarea
              id="notes"
              floatingLabel="Notes"
              value={editedAppointment.notes}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="city"
              floatingLabel="City"
              value={editedAppointment.city}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="reason_for_visit"
              floatingLabel="Reason for Visit"
              value={editedAppointment.reason_for_visit}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormSelect
              id="status"
              floatingLabel="Status"
              value={editedAppointment.status}
              onChange={handleInputChange}
              className="mb-3"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="canceled_by_patient">Canceled by Patient</option>
              <option value="canceled_by_professional">Canceled by Professional</option>
            </CFormSelect>

            <CButton color="primary" onClick={handleSaveChanges}>
              Save Changes
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditAppointment
