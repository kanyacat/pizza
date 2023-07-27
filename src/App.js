import './App.css'
import './scss/app.scss'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import { Cart } from './pages/Cart'
import { createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementByAmount, sum } from './redux/slices/filterSlice'

export const SearchContext = createContext()

function App() {
	const [searchValue, setSearchValue] = useState('')

	const count = useSelector(state => state.filter.value)
	const dispatch = useDispatch()

	const count1 = 15
	const count2 = 10

	return (
		<div className='wrapper'>
			<div>
				<br />
				<span>Первое число: {count1}</span>
				<br />
				<span>Второе число: {count2}</span>
				<br />
				<span>Итог: {count}</span>
				<br />
				<button
					aria-label='Increment value by 15'
					onClick={() => dispatch(incrementByAmount(count1))}
				>
					Увеличить число на {count1}
				</button>
				<br />
				<button
					aria-label='Increment value by 15'
					onClick={() => dispatch(incrementByAmount(count2))}
				>
					Увеличить число на {count2}
				</button>
				<br />
				<button
					aria-label='sum'
					onClick={() => dispatch(sum({ count1, count2 }))}
				>
					Сложить оба числа
				</button>
			</div>

			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	)
}

export default App
