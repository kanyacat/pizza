import './App.css'
import './scss/app.scss'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import { Cart } from './pages/Cart'
import { createContext } from 'react'
import { FullPizza } from './pages/FullPizza'
import { MainLayout } from './redux/MainLayout'

export const SearchContext = createContext()

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza/:id' element={<FullPizza />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
