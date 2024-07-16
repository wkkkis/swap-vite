import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import { PageLoader } from '@/components/pageLoader'

// Utils
import { IRouteConfig, routesConfig } from '@/utils/routes'

const Router = () => {
  const renderWithWrapper = React.useCallback(
    (route: IRouteConfig) => {
      const Page = route.element
      const element = (
        <React.Suspense fallback={<PageLoader />}>
          <Page />
        </React.Suspense>
      )
      return (
        <Route
          key={route.path}
          path={route.path}
          element={element}
        />
      )
    },
    []
  )

  return (
    <Routes>
      {Object.values(routesConfig).map(renderWithWrapper)}
    </Routes>
  )
}

export { Router }
