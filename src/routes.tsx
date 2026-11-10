import { Suspense, lazy, type ReactNode } from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'

import { RouteFallback } from '@/components/layout/RouteFallback'
import { SiteLayout } from '@/components/layout/SiteLayout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Activities = lazy(() => import('@/pages/Activities'))
const ActivityDetail = lazy(() => import('@/pages/ActivityDetail'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Contact = lazy(() => import('@/pages/Contact'))
const Legal = lazy(() => import('@/pages/Legal'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/Login'))
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AdminPosts = lazy(() => import('@/pages/admin/Posts'))
const AdminPostEdit = lazy(() => import('@/pages/admin/PostEdit'))
const AdminActivities = lazy(() => import('@/pages/admin/Activities'))
const AdminActivityEdit = lazy(() => import('@/pages/admin/ActivityEdit'))
const AdminLeads = lazy(() => import('@/pages/admin/Leads'))
const AdminUsers = lazy(() => import('@/pages/admin/Users'))

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>
}


export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: 'quienes-somos', element: withSuspense(<About />) },
      { path: 'servicios', element: withSuspense(<Services />) },
      { path: 'servicios/:slug', element: withSuspense(<ServiceDetail />) },
      {
        path: 'actividades-vulnerables',
        element: withSuspense(<Activities />),
      },
      {
        path: 'actividades-vulnerables/:slug',
        element: withSuspense(<ActivityDetail />),
      },
      { path: 'blog', element: withSuspense(<Blog />) },
      { path: 'blog/:slug', element: withSuspense(<BlogPost />) },
      { path: 'contacto', element: withSuspense(<Contact />) },
      { path: 'aviso-de-privacidad', element: withSuspense(<Legal />) },
      { path: 'terminos-de-uso', element: withSuspense(<Legal />) },
      { path: 'politica-de-cookies', element: withSuspense(<Legal />) },
      {
        path: 'descargo-de-responsabilidad',
        element: withSuspense(<Legal />),
      },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
  {
    // DECISIÓN: el admin va en su propio árbol (sin SiteLayout) desde Fase 1; AdminLayout llega en Fase 9.
    path: '/admin/login',
    element: withSuspense(<AdminLogin />),
  },
  {
    path: '/admin',
    element: <Outlet />,
    children: [
      { index: true, element: withSuspense(<AdminDashboard />) },
      { path: 'blog', element: withSuspense(<AdminPosts />) },
      { path: 'blog/nuevo', element: withSuspense(<AdminPostEdit />) },
      { path: 'blog/:id', element: withSuspense(<AdminPostEdit />) },
      { path: 'actividades', element: withSuspense(<AdminActivities />) },
      {
        path: 'actividades/nueva',
        element: withSuspense(<AdminActivityEdit />),
      },
      {
        path: 'actividades/:id',
        element: withSuspense(<AdminActivityEdit />),
      },
      { path: 'prospectos', element: withSuspense(<AdminLeads />) },
      { path: 'usuarios', element: withSuspense(<AdminUsers />) },
      { path: '*', element: <Navigate to="/admin" replace /> },
    ],
  },
])
