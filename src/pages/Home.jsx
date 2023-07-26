import { useEffect, useState } from 'react'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'

export function Home(props) {
	const { searchValue } = props

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState({
		name: 'популярности ▼',
		sortProperty: 'rating'
	})

	// [] - первый рендер
	useEffect(() => {
		setIsLoading(true)

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(
			`https://64bbb2af7b33a35a44469688.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then(res => res.json())
			.then(json => {
				setItems(json)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue])

	const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
	/* фильтр если статичный список
	.filter(pizza => {
		if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
			return true
		} else return false
	}) */

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories
						value={categoryId}
						onChangeCategory={id => setCategoryId(id)}
					/>
					<Sort value={sortType} onChangeSort={id => setSortType(id)} />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			</div>
		</>
	)
}
