import React, { memo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layout'
import App from '../pages/home/App'
import HooksCodeMirror from '../pages/hooks-code-mirror'

import HooksProblem from '../pages/hooks-problem'

const MainRouter = () => {
  const routeConfig = createBrowserRouter([
    {
      path: 'hooks-code-mirror',
      element: <HooksCodeMirror />
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <App />
        },
        {
          path: 'test',
          element: <div>teets</div>
        },
        {
          path: 'hooks-problem',
          element: <HooksProblem />
        }
      ]
    }
  ])
  return <RouterProvider router={routeConfig} />
}

export default memo(MainRouter)
