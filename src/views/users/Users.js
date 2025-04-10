import React, { useEffect, useState } from 'react'
import UserFilter from '../../components/Filter'
import ModalDelete from '../../components/ModalDelete'
import ModalInformation from '../../components/ModalInformation'

import './styles/users.css'
import './styles/filter.css'

import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilPencil, cilInfo, cilTrash, cilUserPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

export const Users = () => {
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filters, setFilters] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })
  const [visible, setVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleDelete = (user) => {
    setVisible(true)
  }
  const handleInfo = (user) => {
    setSelectedUser(user)
    setInfoVisible(true)
  }

  const handleEdit = (user) => {
    navigate(`/users/${user.id}`, { state: { user } })
  }

  // Construcción dinámica de los inputs
  const dataFilter = Object.keys(filters).map((key) => ({
    name: key,
    label:
      key === 'first_name'
        ? 'First name'
        : key === 'last_name'
          ? 'Last name'
          : key === 'email'
            ? 'Email'
            : key,
    placeholder: `Buscar por ${key}`,
    type: 'text',
    value: filters[key],
    onChange: (e) => setFilters((prev) => ({ ...prev, [key]: e.target.value })),
  }))

  const normalizeText = (text) =>
    text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // elimina acentos
      .toLowerCase()

  const handleFilter = () => {
    const activeFilters = Object.keys(filters).filter((key) => filters[key].trim() !== '')

    const filtered = users.filter((user) =>
      activeFilters.every((key) => {
        const userValue = user[key] ? normalizeText(user[key]) : ''
        const filterValue = normalizeText(filters[key])
        return userValue.startsWith(filterValue)
      }),
    )

    setFilteredUsers(filtered)
  }

  const resetFilters = () => {
    const resetValues = Object.keys(filters).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {})
    setFilters(resetValues)
    setFilteredUsers(users)
  }

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setFilteredUsers(data)
      })
  }, [])

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <CButton color="primary" onClick={() => console.log('Agregar usuario')}>
          <CIcon icon={cilUserPlus} className="me-2" /> Add user
        </CButton>
      </div>

      <CCard className="mb-4">
        <CCardHeader>Users</CCardHeader>
        <div className="filter-container">
          <UserFilter onFilter={handleFilter} resetFilters={resetFilters} dataFilter={dataFilter} />
        </div>

        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="avatar-header">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="table-header">First name</CTableHeaderCell>
                <CTableHeaderCell className="table-header">Last name</CTableHeaderCell>
                <CTableHeaderCell className="table-header">Email</CTableHeaderCell>
                <CTableHeaderCell className="table-header">Rol</CTableHeaderCell>
                <CTableHeaderCell className="table-header">Estado</CTableHeaderCell>
                <CTableHeaderCell className="avatar-header">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredUsers.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center">
                    No hay usuarios disponibles
                  </CTableDataCell>
                </CTableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={user.avatar} />
                    </CTableDataCell>
                    <CTableDataCell>{user.first_name}</CTableDataCell>
                    <CTableDataCell>{user.last_name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.role_id || 'Sin rol'}</CTableDataCell>
                    <CTableDataCell>{user.status}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2 justify-content-center">
                        <CButton color="primary" size="sm" onClick={() => handleEdit(user)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(user)}>
                          <CIcon icon={cilTrash} style={{ '--ci-primary-color': 'white' }} />
                        </CButton>
                        <CButton color="info" size="sm" onClick={() => handleInfo(user)}>
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
        title="Confirmar eliminación de usuario"
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
      <ModalInformation
        visible={infoVisible}
        onClose={() => setInfoVisible(false)} // Cierra la modal
        title="Información del usuario"
        content={
          selectedUser ? (
            <div>
              <p>
                <strong>First Name:</strong> {selectedUser.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedUser.last_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address || 'No address available'}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone || 'No phone available'}
              </p>
              <p>
                <strong>Birth Date:</strong> {selectedUser.birth_date || 'No birth date available'}
              </p>
              <p>
                <strong>Gender:</strong> {selectedUser.gender === 'F' ? 'Female' : 'Male'}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role_id || 'No role assigned'}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.status}
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

export default Users
