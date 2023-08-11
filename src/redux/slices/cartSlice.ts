import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CartItem } from '../../components/CartItemBlock'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

interface CartSliceState {
	totalPrice: number
	items: CartItem[]
}

const cartData = getCartFromLS()

const initialState: CartSliceState = {
	totalPrice: cartData.totalPrice,
	items: cartData.items
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(obj => obj.id === action.payload.id)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1
				})
			}

			state.totalPrice = calcTotalPrice(state.items)
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(obj => obj.id === action.payload)

			if (findItem) {
				findItem.count--
				state.totalPrice = state.items.reduce((sum, obj) => {
					return sum - obj.price
				}, state.totalPrice)
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(item => item.id !== action.payload)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		}
	}
})

export const cartSelector = (state: RootState) => state.cart
export const cartItemByIdSelector = (id: string) => (state: RootState) =>
	state.cart.items.find((obj: CartItem) => obj.id === id)

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
