import { LazyExoticComponent, lazy } from 'react'

// Pages
const Main = lazy(() => import('@/pages/main'))

interface IRouteConfig {
  path: string
  requiresAuth?: boolean
  element: LazyExoticComponent<() => JSX.Element>
}

interface IRoutes {
  main: IRouteConfig
}

const routesConfig: IRoutes = {
  main: {
    path: '/',
    requiresAuth: false,
    element: Main,
  },
}

export type { IRouteConfig, IRoutes }
export { routesConfig }
