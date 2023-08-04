import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function FullPizza() {
	const { id } = useParams()
	const [data, setData] = useState('')

	const navigate = useNavigate()

	useEffect(() => {
		async function fetchPizza() {
			try {
				const res = await axios.get(
					`https://64bbb2af7b33a35a44469688.mockapi.io/items/${id}`
				)
				setData(res.data)
			} catch (error) {
				alert('Ошибка при получении пиццы, попробуйте позже')
				navigate('/')
			}
		}

		fetchPizza()
	}, [])

	if (!data) return 'Загрузка...'

	return (
		<div className='container'>
			<img src={data.imageUrl} alt='' />
			<h2>{data.title}</h2>
			<h4>{data.price} ₽</h4>
		</div>
	)
}
