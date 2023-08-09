import React, { memo } from 'react'

type CategoriesProps = {
	value: number
	onChangeCategory: (i: number) => void
}

const categories = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые'
]

export const Categories: React.FC<CategoriesProps> = memo(props => {
	const { value, onChangeCategory } = props

	return (
		<>
			<div className='categories'>
				<ul>
					{categories.map((categoryName, i) => (
						<li
							key={i}
							onClick={() => onChangeCategory(i)}
							className={value === i ? 'active' : ''}
						>
							{categoryName}
						</li>
					))}
				</ul>
			</div>
		</>
	)
})
