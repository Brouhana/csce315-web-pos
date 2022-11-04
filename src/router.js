import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Login from './routes/Login'
import Checkout from './routes/checkout/Checkout'
import CheckoutMenu from './routes/checkout/components/CheckoutMenu'
import Manage from './routes/manage/Manage'
import ManageInventory from './routes/manage/components/ManageInventory'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
    children: [
      {
        path: '/checkout/:menuCategoryName',
        element: <CheckoutMenu />,
      },
    ],
  },
  {
    path: '/manage',
    element: <Manage />,
    children: [
      {
        path: '/manage/inventory',
        element: <ManageInventory />,
      },
    ],
  },
])

export default router
