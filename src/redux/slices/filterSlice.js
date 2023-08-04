import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности ▼',
		sortProperty: 'rating'
	}
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setParams(state, action) {
			state.sort = action.payload.sort
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
		}
	}
})

export const filterSelector = state => state.filter
export const sortSelector = state => state.filter.sort

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setParams,
	setSearchValue
} = filterSlice.actions

export default filterSlice.reducer
