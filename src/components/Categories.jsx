const categories = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые'
]

export function Categories(props) {
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
}
