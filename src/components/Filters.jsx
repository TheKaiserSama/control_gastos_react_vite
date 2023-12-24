import { useState, useEffect } from 'react'

function Filters({ filter, setFilter }) {
  return (
    <div className='filtros sombra contenedor'>
      <form className='campo'>
        <label htmlFor="category">Filtrar Gastos</label>

        <select
          id='category'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value=''>-- Todas las Categorias --</option>
          <option value='ahorro'>Ahorro</option>
          <option value='comida'>Comida</option>
          <option value='casa'>Casa</option>
          <option value='gastos'>Gastos Varios</option>
          <option value='ocio'>Ocio</option>
          <option value='salud'>Salud</option>
          <option value='subscripciones'>Subscripciones</option>
        </select>
      </form>
    </div>
  )
}

export default Filters
