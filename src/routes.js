import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const Appointments = React.lazy(() => import('./views/appointments/Appointments'))
const Professionls = React.lazy(() => import('./views/Professionals/professionals'))
const Patients = React.lazy(() => import('./views/Patients/patients'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/appointments', name: 'Appointments', element: Appointments },
  { path: '/professionals', name: 'Professionals', element: Professionls },
  { path: '/patients', name: 'Patients', element: Patients },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
