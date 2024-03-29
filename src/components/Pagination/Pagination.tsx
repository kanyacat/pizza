import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import React from 'react'

type PaginationProps = {
	onChangePage: (page: number) => void
	currentPage: number
}

export const Pagination: React.FC<PaginationProps> = props => {
	const { onChangePage, currentPage } = props
	return (
		<div className={styles.pag}>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel='>'
				onPageChange={event => onChangePage(event.selected + 1)}
				pageRangeDisplayed={5}
				pageCount={3}
				previousLabel='<'
				forcePage={currentPage - 1}
				renderOnZeroPageCount={null}
			/>
		</div>
	)
}
