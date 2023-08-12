import { RootState } from '../store'

export const filterSelector = (state: RootState) => state.filter
export const sortSelector = (state: RootState) => state.filter.sort
