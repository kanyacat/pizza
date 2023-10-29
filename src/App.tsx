import './App.css'
import './scss/app.scss'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { lazy, Suspense } from 'react'

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))

const NotFound = lazy(
	() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<Suspense fallback={<div>Идёт загрузка корзины...</div>}>
							<Cart />{' '}
						</Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<Suspense fallback={<div>Идёт загрузка...</div>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
