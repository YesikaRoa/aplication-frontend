import React, { useEffect, useState } from 'react'
import professionalsData from '../../assets/data/professional.json'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CAvatar,
  CRow,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilPen, cilTrash, cilPlus } from '@coreui/icons'

const Professionals = () => {
  const [professionals, setProfessionals] = useState([])
  const [form, setForm] = useState({
    id: '',
    name: '',
    specialty: '',
    email: '',
    phone: '',
    notifications: false,
    photo: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setProfessionals(professionalsData)
  }, [])

  const openNewModal = () => {
    setForm({
      id: '',
      name: '',
      specialty: '',
      email: '',
      phone: '',
      notifications: false,
      photo: '',
    })
    setIsEditing(false)
    setModalVisible(true)
  }

  const openEditModal = (professional) => {
    setForm(professional)
    setIsEditing(true)
    setModalVisible(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      setProfessionals((prev) => prev.map((p) => (p.id === form.id ? form : p)))
      setMessage('Professional successfully updated')
    } else {
      const newProfessional = { ...form, id: Date.now() }
      setProfessionals((prev) => [...prev, newProfessional])
      setMessage('Professional successfully registered')
    }
    setModalVisible(false)
    setForm({
      id: '',
      name: '',
      specialty: '',
      email: '',
      phone: '',
      notifications: false,
      photo: '',
    })
    setIsEditing(false)
  }

  const handleDelete = (id) => {
    setProfessionals((prev) => prev.filter((p) => p.id !== id))
    setMessage('Professional successfully deleted')
  }

  return (
    <CCard>
      <CCardHeader>Professional Management</CCardHeader>
      <CCardBody>
        {message && <CAlert color="success">{message}</CAlert>}

        <CButton color="primary" className="mb-3" onClick={openNewModal}>
          <CIcon icon={cilPlus} className="me-2" />
          New Professional
        </CButton>

        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Specialty</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Notifications</CTableHeaderCell>
              <CTableHeaderCell>Photo</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {professionals.map((p) => (
              <CTableRow key={p.id}>
                <CTableDataCell>{p.id}</CTableDataCell>
                <CTableDataCell>{p.name}</CTableDataCell>
                <CTableDataCell>{p.specialty}</CTableDataCell>
                <CTableDataCell>{p.email}</CTableDataCell>
                <CTableDataCell>{p.phone}</CTableDataCell>
                <CTableDataCell>{p.notifications ? 'Yes' : 'No'}</CTableDataCell>
                <CTableDataCell>
                  <CAvatar
                    src={new URL(`../../assets/images/avatars/${p.photo}`, import.meta.url).href}
                    size="md"
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="warning"
                    className="me-2"
                    onClick={() => openEditModal(p)}
                  >
                    <CIcon icon={cilPen} className="me-1" />
                    Edit
                  </CButton>
                  <CButton size="sm" color="danger" onClick={() => handleDelete(p.id)}>
                    <CIcon icon={cilTrash} className="me-1" />
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader>
            <CModalTitle>{isEditing ? 'Edit Professional' : 'New Professional'}</CModalTitle>
          </CModalHeader>
          <CForm onSubmit={handleSubmit}>
            <CModalBody>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Name</CFormLabel>
                  <CFormInput name="name" value={form.name} onChange={handleChange} required />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Specialty</CFormLabel>
                  <CFormInput
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Email</CFormLabel>
                  <CFormInput name="email" value={form.email} onChange={handleChange} required />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Phone</CFormLabel>
                  <CFormInput name="phone" value={form.phone} onChange={handleChange} required />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Avatar</CFormLabel>
                  <select
                    className="form-select"
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an avatar</option>
                    {[...Array(9)].map((_, i) => (
                      <option key={i} value={`${i + 1}.jpg`}>
                        Avatar {i + 1}
                      </option>
                    ))}
                  </select>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Notifications</CFormLabel>
                  <CFormSwitch
                    name="notifications"
                    checked={form.notifications}
                    onChange={handleChange}
                    label="Enable alerts"
                  />
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancel
              </CButton>
              <CButton type="submit" color={isEditing ? 'warning' : 'primary'}>
                {isEditing ? 'Update' : 'Save'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default Professionals
