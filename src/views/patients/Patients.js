import React, { useEffect, useState } from 'react'
import patientsData from '../../assets/data/patients.json'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CAlert,
  CRow,
  CCol,
  CCardTitle,
  CCardText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUserPlus, cilPencil, cilTrash, cilInfo, cilSave, cilXCircle } from '@coreui/icons'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [form, setForm] = useState({ id: '', name: '', age: '', gender: '', phone: '' })
  const [editing, setEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [detail, setDetail] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setPatients(patientsData)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const openNewModal = () => {
    setForm({ id: '', name: '', age: '', gender: '', phone: '' })
    setEditing(false)
    setShowForm(true)
  }

  const openEditModal = (patient) => {
    setForm(patient)
    setEditing(true)
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setPatients((prev) =>
        prev.map((p) => (p.id === form.id ? { ...form, id: Number(form.id) } : p)),
      )
      setMessage('Patient successfully edited')
    } else {
      const newPatient = {
        ...form,
        id: Date.now(),
        history: [],
        notes: [],
        currentTreatments: [],
      }
      setPatients((prev) => [...prev, newPatient])
      setMessage('Patient successfully added')
    }
    setForm({ id: '', name: '', age: '', gender: '', phone: '' })
    setEditing(false)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id))
    setMessage('Patient successfully deleted')
  }

  const openDetail = (patient) => {
    setDetail(patient)
    setShowDetail(true)
  }

  return (
    <CCard>
      <CCardHeader className="fw-bold fs-5">Patient Management</CCardHeader>
      <CCardBody>
        {message && <CAlert color="success">{message}</CAlert>}

        <CButton color="primary" className="mb-4" onClick={openNewModal}>
          <CIcon icon={cilUserPlus} className="me-2" />
          New Patient
        </CButton>

        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Age</CTableHeaderCell>
              <CTableHeaderCell>Gender</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {patients.map((p) => (
              <CTableRow key={p.id}>
                <CTableDataCell>{p.id}</CTableDataCell>
                <CTableDataCell>{p.name}</CTableDataCell>
                <CTableDataCell>{p.age}</CTableDataCell>
                <CTableDataCell>{p.gender}</CTableDataCell>
                <CTableDataCell>{p.phone}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" className="me-2" onClick={() => openDetail(p)}>
                    <CIcon icon={cilInfo} className="me-1" />
                    Detail
                  </CButton>
                  <CButton
                    color="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(p)}
                  >
                    <CIcon icon={cilPencil} className="me-1" />
                    Edit
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(p.id)}>
                    <CIcon icon={cilTrash} className="me-1" />
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Form Modal */}
      <CModal visible={showForm} onClose={() => setShowForm(false)}>
        <CModalHeader>
          <CModalTitle>{editing ? 'Edit Patient' : 'New Patient'}</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  name="name"
                  label="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  name="age"
                  label="Age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  name="gender"
                  label="Gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CFormInput
              name="phone"
              label="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowForm(false)}>
              <CIcon icon={cilXCircle} className="me-1" />
              Cancel
            </CButton>
            <CButton type="submit" color={editing ? 'warning' : 'primary'}>
              <CIcon icon={cilSave} className="me-1" />
              {editing ? 'Update' : 'Save'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Detail Modal */}
      <CModal visible={showDetail} onClose={() => setShowDetail(false)} size="xl">
        <CModalHeader>
          <CModalTitle>Patient Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {detail && (
            <CRow>
              <CCol md={4}>
                <CCard className="mb-4">
                  <CCardBody>
                    <CCardTitle className="mb-3">{detail.name}</CCardTitle>
                    <CCardText className="mb-1">
                      <strong>Age:</strong> {detail.age}
                    </CCardText>
                    <CCardText className="mb-1">
                      <strong>Gender:</strong> {detail.gender}
                    </CCardText>
                    <CCardText>
                      <strong>Phone:</strong> {detail.phone}
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={8}>
                <CRow>
                  <CCol md={12}>
                    <h6 className="fw-bold mb-2">Medical History</h6>
                    {detail.history.map((h, i) => (
                      <CCard className="mb-2" key={i}>
                        <CCardBody>
                          <CCardText className="mb-1">
                            <strong>{h.date}</strong>
                          </CCardText>
                          <CCardText className="mb-1">Diagnosis: {h.diagnosis}</CCardText>
                          <CCardText>Treatment: {h.treatment}</CCardText>
                        </CCardBody>
                      </CCard>
                    ))}
                  </CCol>
                  <CCol md={12}>
                    <h6 className="fw-bold mt-4 mb-2">Professional Notes</h6>
                    {detail.notes.map((n, i) => (
                      <CCard className="mb-2" key={i}>
                        <CCardBody>
                          <CCardText className="mb-1">
                            <strong>{n.date}</strong>
                          </CCardText>
                          <CCardText>{n.note}</CCardText>
                        </CCardBody>
                      </CCard>
                    ))}
                  </CCol>
                  <CCol md={12}>
                    <h6 className="fw-bold mt-4 mb-2">Current Treatments</h6>
                    {detail.currentTreatments.map((t, i) => (
                      <CCard className="mb-2" key={i}>
                        <CCardBody>
                          <CCardText>
                            <strong>Service:</strong> {t.service}
                          </CCardText>
                          <CCardText>
                            <strong>Frequency:</strong> {t.frequency}
                          </CCardText>
                          <CCardText>
                            <strong>Duration:</strong> {t.duration}
                          </CCardText>
                          <CCardText>
                            <strong>Recommendations:</strong> {t.recommendations}
                          </CCardText>
                        </CCardBody>
                      </CCard>
                    ))}
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDetail(false)}>
            <CIcon icon={cilXCircle} className="me-1" />
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Patients
