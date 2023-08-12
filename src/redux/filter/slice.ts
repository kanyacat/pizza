import { FilterSliceState, Sort, SortPropertyEnum } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности ▼',
		sortProperty: SortPropertyEnum.RATING_DESC
	}
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setParams(state, action: PayloadAction<FilterSliceState>) {
			state.sort = action.payload.sort
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
		}
	}
})

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setParams,
	setSearchValue
} = filterSlice.actions

export default filterSlice.reducer
