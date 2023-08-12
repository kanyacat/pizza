import { RootState } from '../store'
import { CartItem } from './types'

export const cartSelector = (state: RootState) => state.cart
export const cartItemByIdSelector = (id: string) => (state: RootState) =>
	state.cart.items.find((obj: CartItem) => obj.id === id)
