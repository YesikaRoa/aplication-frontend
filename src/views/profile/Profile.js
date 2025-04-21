import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilPencil, cilExitToApp } from '@coreui/icons'
import './styles/Profile.css'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    // Fetch user data from the API
    fetch('http://localhost:8000/users/1') // Replace "1" with the desired user ID
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
        setFormData(data) // Initialize form data with user data
      })
      .catch((error) => console.error('Error fetching user data:', error))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveChanges = () => {
    // Save changes to the API
    fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
        setModalVisible(false) // Close the modal after saving
      })
      .catch((error) => console.error('Error saving changes:', error))
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <CCard>
      <CCardBody>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-container">
                <img src={user.avatar} alt="User Avatar" className="avatar-image" />
                <CButton
                  color="light"
                  className="edit-avatar-button"
                  onClick={() => console.log('Edit avatar clicked')} // Aquí puedes abrir un modal o manejar la lógica de edición
                >
                  <CIcon icon={cilPencil} />
                </CButton>
              </div>
            </div>
            <div className="profile-name">
              <h2>{`${user.first_name} ${user.last_name}`}</h2>
              <p>{user.specialty}</p>
            </div>
          </div>

          <CContainer>
            <CRow className="space-component">
              <CCol md={6} className="d-flex align-items-stretch">
                <CCard className="inner-card">
                  <CCardBody>
                    <CCardTitle>Personal Information</CCardTitle>
                    <CListGroup flush>
                      <CListGroupItem>
                        <strong>Email:</strong> {user.email}
                      </CListGroupItem>
                      <CListGroupItem>
                        <strong>Phone:</strong> {user.phone}
                      </CListGroupItem>
                      <CListGroupItem>
                        <strong>Address:</strong> {user.address}
                      </CListGroupItem>
                      <CListGroupItem>
                        <strong>Birth Date:</strong> {user.birth_date}
                      </CListGroupItem>
                      <CListGroupItem>
                        <strong>Gender:</strong> {user.gender}
                      </CListGroupItem>
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md={6} className="d-flex align-items-stretch">
                <CCard className="inner-card">
                  <CCardBody>
                    <CCardTitle>Medical Information</CCardTitle>
                    <CListGroup flush>
                      <CListGroupItem>
                        <strong>Description:</strong> {user.description}
                      </CListGroupItem>
                      <CListGroupItem>
                        <strong>Specialty:</strong> {user.specialty}
                      </CListGroupItem>
                      <CListGroupItem>
                        <strong>Subspecialty:</strong> {user.subspecialty}
                      </CListGroupItem>
                      <CListGroupItem>
                        <strong>Years experience:</strong> {user.years_experience}
                      </CListGroupItem>
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow className="space-component">
              <CButton
                color="primary"
                className="update-button"
                onClick={() => setModalVisible(true)}
              >
                <CIcon icon={cilPencil} className="me-2" />
                Edit Information
              </CButton>
            </CRow>
          </CContainer>

          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
              <CModalTitle>Edit Information</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                name="first_name"
                label={<strong>First Name:</strong>}
                value={formData.first_name || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                name="last_name"
                label={<strong>Last Name:</strong>}
                value={formData.last_name || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="email"
                name="email"
                label={<strong>Email:</strong>}
                value={formData.email || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                name="phone"
                label={<strong>Phone:</strong>}
                value={formData.phone || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                name="address"
                label={<strong>Address:</strong>}
                value={formData.address || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                name="description"
                label={<strong>Description:</strong>}
                value={formData.description || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                name="specialty"
                label={<strong>Specialty:</strong>}
                value={formData.specialty || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                name="subspecialty"
                label={<strong>Subspecialty:</strong>}
                value={formData.subspecialty || ''}
                onChange={handleInputChange}
              />
              <CFormInput
                type="number"
                name="years_experience"
                label={<strong>Years of Experience:</strong>}
                value={formData.years_experience || ''}
                onChange={handleInputChange}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                <CIcon icon={cilExitToApp} className="me-2" />
                Close
              </CButton>
              <CButton color="primary" onClick={handleSaveChanges}>
                <CIcon icon={cilSave} className="me-2" />
                Save Changes
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default Profile
