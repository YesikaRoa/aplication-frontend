import React from 'react'
import '../views/users/styles/filter.css'
import { CFormInput } from '@coreui/react'

const UserFilter = ({ onFilter, resetFilters, dataFilter }) => {
  return (
    <div className="filter-container">
      {dataFilter.map((filter) => (
        <CFormInput
          key={filter.name}
          type={filter.type}
          floatingLabel={filter.label}
          placeholder={filter.placeholder}
          value={filter.value}
          onChange={filter.onChange}
          className="filter-input"
        />
      ))}
      <div className="filter-buttons">
        <button onClick={onFilter} className="btn btn-primary search-button">
          Search
        </button>
        <button className="reset-button" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default UserFilter
