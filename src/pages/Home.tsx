import React, { useCallback, useEffect, useRef } from 'react'
import { Categories } from '../components/Categories'
import { SortPopup } from '../components/SortPopup'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Pagination } from '../components/Pagination/Pagination'
import { useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/slice'
import { useAppDispatch } from '../redux/store'
import { filterSelector } from '../redux/filter/selectors'
import { pizzasSelector } from '../redux/pizza/selectors'

export const Home: React.FC = () => {
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(filterSelector)
	const { items, status } = useSelector(pizzasSelector)
	const dispatch = useAppDispatch()

	const isSearch = useRef(false)

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
				currentPage: String(currentPage)
			})
		)
	}

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	//если был первый рендер, то просто просим пиццы
	useEffect(() => {
		window.scrollTo(0, 0)

		//ждем пока придут параметры из URL, чтоб получить пиццы
		if (!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const pizzas = items.map((pizza: any) => (
		<PizzaBlock key={pizza.id} {...pizza} />
	))
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

	if (status === 'success' && pizzas.length === 0) {
		window.location.reload()
	}

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<SortPopup value={sort} />
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
					onChangePage={(page: number) => onChangePage(page)}
				/>
			</div>
		</>
	)
}
