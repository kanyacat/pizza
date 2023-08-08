import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type FetchPizzasParams = Record<string, string> //все ключи и все значения string

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus',
	async (params: FetchPizzasParams) => {
		const { sortBy, category, order, search, currentPage } = params

		const res = await axios.get<PizzaItem[]>(
			`https://64bbb2af7b33a35a44469688.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return res.data as PizzaItem[]
	}
)

type PizzaItem = {
	id: string
	imageUrl: string
	title: string
	types: number[]
	sizes: number[]
	price: number
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export type SearchPizzaParams = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: string
}

interface PizzaSliceState {
	items: PizzaItem[]
	status: Status
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING //loading | success | error
}

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzas.rejected, state => {
				state.status = Status.ERROR
				state.items = []
			})
	}
})

export const pizzasSelector = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
