import { useState } from 'react'

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

export function Categories() {
  const  [activeIndex, setActiveIndex] = useState(0)
  
  const handleClick = (index) => {
    setActiveIndex(index)
  }
  
  return     <>
  <div className="categories">
    <ul>
      {categories.map((value, i) => (
        <li key={i} onClick={() => handleClick(i)} className={activeIndex === i ? 'active': ''}>{value}</li>
      ))}
    </ul>
  </div>
    </>
}
