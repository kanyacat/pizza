import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import React from 'react'

export const MainLayout: React.FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Outlet />
			</div>
		</div>
	)
}
