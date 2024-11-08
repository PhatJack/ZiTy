import DefaultLayout from '@/components/layouts/DefaultLayout'
import PrivateLayout from '@/components/layouts/PrivateLayout'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

// Auth Pages
import AuthLayout from '@pages/auth'
import Login from '@pages/auth/login'

// Home Page
import Home from '@pages/home'

// Admin Pages
import HomeAdmin from '@admin/home'
import ApartmentAdmin from '@admin/apartment'
import UserAdmin from '@admin/user'
import ServiceAdmin from '@admin/service'
import PackageAdmin from '@admin/package'
import BillAdmin from '@admin/bill'
import SurveyAdmin from '@admin/survey'
import ReportAdmin from '@admin/report'
import SettingAdmin from '@admin/setting'

// User Pages
import Package from '@user/package'
import Report from '@user/report'
import Bill from '@user/bill'
import Survey from '@user/survey'
import Chat from '@user/chat'

// Error and Payment pages
import NotFound from '@pages/404'
import MomoPaymentSuccess from '@/pages/notify-payment/MomoPaymentSuccess'
import ProtectedLayout from '@/components/layouts/ProtectedLayout'
import { ROUTES } from '@/configs/endpoint'

const userRoutes: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: ROUTES.PACKAGES + '/:id?', element: <Package /> },
  { path: ROUTES.REPORTS + '/:id?', element: <Report /> },
  { path: ROUTES.BILLS + '/:id?', element: <Bill /> },
  { path: ROUTES.SURVEYS + '/:id?', element: <Survey /> },
  { path: ROUTES.CHAT, element: <Chat /> },
]

const adminRoutes: RouteObject[] = [
  { index: true, element: <HomeAdmin /> },
  { path: ROUTES.ADMIN.PACKAGES, element: <PackageAdmin /> },
  { path: ROUTES.ADMIN.APARTMENTS + '/:id?', element: <ApartmentAdmin /> },
  { path: ROUTES.ADMIN.BILLS, element: <BillAdmin /> },
  { path: ROUTES.ADMIN.SERVICES, element: <ServiceAdmin /> },
  { path: ROUTES.ADMIN.USERS, element: <UserAdmin /> },
  { path: ROUTES.ADMIN.SURVEYS + '/:id?', element: <SurveyAdmin /> },
  { path: ROUTES.ADMIN.REPORTS + '/:id?', element: <ReportAdmin /> },
  { path: ROUTES.ADMIN.SETTINGS + '/:id?', element: <SettingAdmin /> },
]

const route = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PrivateLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            element: <ProtectedLayout userType="RESIDENT" />,
            children: userRoutes,
          },
          {
            path: ROUTES.ADMIN.HOME,
            element: <ProtectedLayout userType="ADMIN" />,
            children: adminRoutes,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: ROUTES.PAYMENT,
    element: <MomoPaymentSuccess />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default route
