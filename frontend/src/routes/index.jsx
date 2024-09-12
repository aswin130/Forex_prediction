/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

//dashboards

const CryptoDashboard = lazy(() => import('@/pages/dashboards/Crypto'))
const CryptoExchange = lazy(() => import('@/pages/dashboards/Exchange'))


//auth pages
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))
const LockScreen = lazy(() => import('@/pages/auth/LockScreen'))


//error Pages
const NotFound = lazy(() => import('@/pages/error/PageNotFound'))

const Error500 = lazy(() => import('@/pages/error/Error500'))

const dashboardRoutes = [
	{
		path: '/',
		name: 'Home Page',
		element: <Navigate to="/dashboards/crypto" />,
	},
	
	{
		path: '/dashboards/crypto',
		name: 'Crypto',
		element: <CryptoDashboard />,
	},
	{
		path: '/dashboards/exchange',
		name: 'Exchange',
		element: <CryptoExchange />,
	}

]
const appsRoutes = [

	{
		path: '/apps/crypto/exchange',
		name: 'Exchange',
		element: <CryptoExchange />,
	},

]

const authRoutes = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
	},
	{
		path: '/auth/re-password',
		name: 'Re Password',
		element: <ResetPassword />,
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
	},

]
const otherRoutes = [
	{
		path: '/not-found',
		name: 'Page Not Found',
		element: <NotFound />,
	},
	
	{
		path: '/error-500',
		name: 'Error 500',
		element: <Error500 />,
	},
	
	{
		path: '*',
		name: 'Page Not Found',
		element: <NotFound />,
	},
]
const allBlankRoutes = [...otherRoutes, ...authRoutes]
// const allUiRoutes = [
// 	...uiRoutes,
// 	...advancedUiRoutes,
// 	...formsRoutes,
// 	...otherUiRoutes,
// ]
const allAdminRoutes = [
	...dashboardRoutes,
	// ...appsRoutes,
	// ...allUiRoutes,
	// ...pagesRoutes,
]
export { allAdminRoutes, allBlankRoutes }


