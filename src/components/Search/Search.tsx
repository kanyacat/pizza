import styles from './Search.module.scss'
import React, { useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

export const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [inputValue, setInputValue] = useState('')

	const inputRef = useRef<HTMLInputElement>(null)

	//useCallback не даст снова создавать функцию при ререндере
	const updateSearchValue = useCallback(
		debounce((value: string) => {
			console.log(value)
			dispatch(setSearchValue(value))
		}, 250),
		[]
	)

	const onClickClear = () => {
		setInputValue('')
		dispatch(setSearchValue(''))
		inputRef.current?.focus()
	}

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<>
			<div className={styles.root}>
				<svg
					className={styles.icon}
					width='800px'
					height='800px'
					viewBox='0 0 32 32'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>search</title>
					<desc>Created with Sketch Beta.</desc>
					<defs></defs>
					<g
						id='Page-1'
						stroke='none'
						strokeWidth='1'
						fill='none'
						fillRule='evenodd'
					>
						<g
							id='Icon-Set'
							transform='translate(-256.000000, -1139.000000)'
							fill='#000000'
						>
							<path
								d='M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z'
								id='search'
							></path>
						</g>
					</g>
				</svg>
				<input
					ref={inputRef}
					value={inputValue}
					className={styles.input}
					onChange={event => onChangeInput(event)}
					placeholder='Поиск пиццы...'
				/>
				{inputValue && (
					<svg
						onClick={() => onClickClear()}
						className={styles.clearIcon}
						width='800px'
						height='800px'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z'
							fill='#0F0F0F'
						/>
					</svg>
				)}
			</div>
		</>
	)
}
