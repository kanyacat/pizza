import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

export function MainLayout() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Outlet />
			</div>
		</div>
	)
}
