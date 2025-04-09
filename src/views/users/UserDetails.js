import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './styles/UserDetails.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CFormInput,
} from '@coreui/react'

const normalizeNameForURL = (name) => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

const UserDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(null)
    setLoading(true)

    if (location.state && location.state.user) {
      const newUser = location.state.user
      setUser(newUser)
      localStorage.setItem('selectedUser', JSON.stringify(newUser))

      const firstName = newUser.first_name.split(' ')[0]
      const normalizedFirstName = normalizeNameForURL(firstName)
      navigate(`/users/${normalizedFirstName}`, { replace: true })
    } else {
      const storedUser = localStorage.getItem('selectedUser')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
    }
  }, [location, navigate])

  if (loading) return <p>Cargando usuario...</p>
  if (!user) return <p>No se encontró el usuario.</p>

  return (
    <CRow>
      <CCol md={12}>
        <h3 className="mb-4">User Details</h3>
      </CCol>
      <CCol md={4}>
        <CCard>
          <CCardBody>
            <CCardTitle className="text-primary">
              {user.first_name} {user.last_name}
            </CCardTitle>
            <CCardText>
              <strong>Email:</strong> {user.email} <br />
              <strong>Role:</strong> {user.role_id} <br />
              <strong>Status:</strong> {user.status} <br />
              <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()} <br />
              <strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString()}
            </CCardText>
          </CCardBody>
        </CCard>
        <CCard className="mt-3 card-custom-margin">
          <CCardBody className="card-body-centered">
            <p
              className="text-primary mb-2 animated-text"
              style={{ userSelect: 'text', cursor: 'pointer' }}
            >
              CHANGE PASSWORD
            </p>
            <p
              className="text-primary mb-2 animated-text"
              style={{ userSelect: 'text', cursor: 'pointer' }}
            >
              REACTIVATE USER
            </p>
            <p
              className="text-danger animated-text"
              style={{ userSelect: 'text', cursor: 'pointer' }}
            >
              DELETE USER
            </p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={8}>
        <CCard>
          <CCardBody>
            <CCardTitle>Edit User</CCardTitle>
            <CFormInput
              type="text"
              id="firstName"
              floatingLabel="First Name"
              defaultValue={user.first_name}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="lastName"
              floatingLabel="Last Name"
              defaultValue={user.last_name}
              className="mb-3"
            />
            <CFormInput
              type="email"
              id="email"
              floatingLabel="Email"
              defaultValue={user.email}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="address"
              floatingLabel="Address"
              defaultValue={user.address}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="phone"
              floatingLabel="Phone"
              defaultValue={user.phone}
              className="mb-3"
            />
            <CButton color="primary">Save changes</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDetails
