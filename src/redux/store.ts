import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filter/slice'
import cartReducer from './cart/slice'
import pizzasReducer from './pizza/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
		pizzas: pizzasReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
