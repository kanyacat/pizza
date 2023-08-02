import { Link } from 'react-router-dom'
import emptyIcon from '../assets/img/empty-cart.png'

export function CartEmpty() {
	return (
		<>
			<div className='cart cart--empty'>
				<h2>Корзина пустая 😕</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={emptyIcon} alt='Empty cart' />
				<Link to='/' className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</>
	)
}
