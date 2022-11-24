import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Layout from "../layout";
import App from "../pages/home/App"

const HooksCodeMirror = React.lazy(() => import("../pages/hooks-code-mirror"));

const routeConfig = createBrowserRouter([
  {
    path: "hooks-code-mirror",
    element: (
      <React.Suspense fallback={<>...</>}>
        <HooksCodeMirror />
      </React.Suspense>
    )
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App/>
      },
      {
        path: "test",
        element: <div>teets</div>
      },
    ]
  },

])

const MainRouter = () => {
  return <RouterProvider router={routeConfig} />
}

export default MainRouter