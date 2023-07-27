import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: 0
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		incrementByAmount: (state, action) => {
			state.value += action.payload
		},
		sum: (state, action) => {
			const { count1, count2 } = action.payload
			state.value = count1 + count2
		}
	}
})

export const { incrementByAmount, sum } = filterSlice.actions

export default filterSlice.reducer
