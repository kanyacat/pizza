import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus',
	async params => {
		const { sortBy, category, order, search, currentPage } = params

		const res = await axios.get(
			`https://64bbb2af7b33a35a44469688.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return res.data
	}
)

const initialState = {
	items: [],
	status: 'loading' //loading | success | error
}

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.status = 'loading'
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = 'success'
			})
			.addCase(fetchPizzas.rejected, state => {
				state.status = 'error'
				state.items = []
			})
	}
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
