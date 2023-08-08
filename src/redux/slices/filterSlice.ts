import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price'
}

export type Sort = {
	name: string
	sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
	searchValue: string
	categoryId: number
	currentPage: number
	sort: Sort
}

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

export const filterSelector = (state: RootState) => state.filter
export const sortSelector = (state: RootState) => state.filter.sort

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setParams,
	setSearchValue
} = filterSlice.actions

export default filterSlice.reducer