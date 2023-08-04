import { useEffect, useRef } from 'react'
import { Categories } from '../components/Categories'
import { Sort, sortList } from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Pagination } from '../components/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import {
	filterSelector,
	setCategoryId,
	setCurrentPage,
	setParams
} from '../redux/slices/filterSlice'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice'

export function Home() {
	const navigate = useNavigate()

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(filterSelector)
	const { items, status } = useSelector(pizzasSelector)
	const dispatch = useDispatch()

	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizzas({
				sortBy,
				category,
				order,
				search,
				currentPage
			})
		)
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
			getPizzas()
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

				{status === 'error' ? (
					<div className='content__error-info'>
						<h2>Произошла ошибка 😕</h2>
						<p>
							К сожалению, не удалось получить пиццы. Попробуйте повторить
							попытку позже.
						</p>
					</div>
				) : (
					<div className='content__items'>
						{status === 'loading' ? skeletons : pizzas}
					</div>
				)}

				<Pagination
					currentPage={currentPage}
					onChangePage={number => onChangePage(number)}
				/>
			</div>
		</>
	)
}
