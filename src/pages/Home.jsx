import { useContext, useEffect, useRef, useState } from 'react'
import { Categories } from '../components/Categories'
import { Sort, sortList } from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Pagination } from '../components/Pagination/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import {
	setCategoryId,
	setCurrentPage,
	setParams
} from '../redux/slices/filterSlice'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

export function Home() {
	const navigate = useNavigate()

	const { searchValue } = useContext(SearchContext)

	const { categoryId, sort, currentPage } = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const fetchPizzas = () => {
		setIsLoading(true)

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(
				`https://64bbb2af7b33a35a44469688.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then(response => {
				setItems(response.data)
				setIsLoading(false)
			})
	}

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = number => {
		dispatch(setCurrentPage(number))
	}

	//если был первый рендер и изменились параметры
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true //произошел рендер
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	//если первый рендер уже был, то проверяем URL-параметры
	useEffect(() => {
		if (window.location.search) {
			//substring чтоб убрать ?
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(
				obj => obj.sortProperty === params.sortProperty
			)

			dispatch(setParams({ ...params, sort }))
			isSearch.current = true //пришли параметры из URL
		}
	}, [])

	//если был первый рендер, то просто просим пиццы
	useEffect(() => {
		window.scrollTo(0, 0)

		//ждем пока придут параметры из URL, чтоб получить пиццы
		if (!isSearch.current) {
			fetchPizzas()
		}

		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
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
				<Pagination
					currentPage={currentPage}
					onChangePage={number => onChangePage(number)}
				/>
			</div>
		</>
	)
}
