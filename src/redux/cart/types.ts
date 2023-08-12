export interface CartSliceState {
	totalPrice: number
	items: CartItem[]
}

export type CartItem = {
	id: string
	imageUrl: string
	title: string
	type: string
	size: string
	price: number
	count: number
}
