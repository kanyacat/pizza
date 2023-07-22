import { useEffect, useState } from 'react'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'

export function Home() {
	  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  
  // [] - первый рендер
  useEffect(() => {
    fetch('https://64bbb2af7b33a35a44469688.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json)
        setIsLoading(false)
      })
  }, [])
	
	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
				}
			</div>
		</>
	)
}