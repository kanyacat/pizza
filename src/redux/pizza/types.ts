export type FetchPizzasParams = Record<string, string> //все ключи и все значения string

export type PizzaItem = {
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

export interface PizzaSliceState {
	items: PizzaItem[]
	status: Status
}
