import Dashboard from '../containers/Dashboard'
import Transactions from '../containers/Transactions'
import Accounts from '../containers/Accounts'
import Reports from '../containers/Reports'
import Settings from '../containers/Settings'
import NotFound from '../containers/NotFound'

export default [
  {
    path: '/',
    exact: true,
    label: 'Dashboard',
    icon: 'newspaper',
    component: Dashboard
  },
  {
    path: '/transactions/:accountId?',
    link: '/transactions',
    exact: false,
    label: 'Transactions',
    icon: 'exchange',
    component: Transactions
  },
  {
    path: '/accounts',
    exact: false,
    label: 'Accounts',
    icon: 'credit card',
    component: Accounts
  },
  {
    path: '/reports',
    exact: false,
    label: 'Reports',
    icon: 'line chart',
    component: Reports
  },
  {
    path: '/settings',
    exact: false,
    label: 'Settings',
    icon: 'options',
    component: Settings
  },
  {
    path: '/404',
    label: 'Not Found',
    component: NotFound
  }
]
