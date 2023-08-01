import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export function Pagination(props) {
	const { onChangePage, currentPage } = props
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel='...'
				nextLabel='>'
				onPageChange={event => onChangePage(event.selected + 1)}
				pageRangeDisplayed={4}
				pageCount={3}
				previousLabel='<'
				forcePage={currentPage - 1}
				renderOnZeroPageCount={null}
			/>
		</>
	)
}
