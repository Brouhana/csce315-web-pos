import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Checkout from './routes/checkout/Checkout'
import CheckoutMenu from './routes/checkout/components/CheckoutMenu'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
])

export default router
