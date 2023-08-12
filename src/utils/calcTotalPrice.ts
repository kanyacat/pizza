import { CartItem } from '../redux/cart/types'

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((sum, obj) => {
		return obj.count * obj.price + sum
	}, 0)
}
