import { useContext, useEffect, useState } from 'react'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Pagination } from '../components/Pagination/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

export function Home() {
	const { searchValue } = useContext(SearchContext)

	const { categoryId, sort } = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	// [] - первый рендер
	useEffect(() => {
		setIsLoading(true)

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(
			`https://64bbb2af7b33a35a44469688.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then(res => res.json())
			.then(json => {
				setItems(json)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

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
						onChangeCategory={id => onChangeCategory(id)}
					/>
					<Sort />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
				<Pagination onChangePage={number => setCurrentPage(number)} />
			</div>
		</>
	)
}
