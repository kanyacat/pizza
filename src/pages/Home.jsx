import { useEffect, useState } from 'react'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'

export function Home() {
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

		fetch(
			`https://64bbb2af7b33a35a44469688.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
		)
			.then(res => res.json())
			.then(json => {
				setItems(json)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sortType])

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
				<div className='content__items'>
					{isLoading
						? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
						: items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
				</div>
			</div>
		</>
	)
}
