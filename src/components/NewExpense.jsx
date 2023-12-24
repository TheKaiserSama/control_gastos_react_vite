import { useState } from 'react'
import Message from './Message'

function NewExpense({ budget, setBudget, setIsBudgetValid }) {
  const [message, setMessage] = useState('')

  const handleBudget = (e) => {
    e.preventDefault()

    if (!budget || budget < 0) {
      setMessage('No es un presupuesto válido')
      return
    }

    setMessage('')
    setIsBudgetValid(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handleBudget} className='formulario'>
        <div className='campo'>
          <label>Definir Presupuesto</label>

          <input
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu Presupuesto'
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
          />

          <input type='submit' value='Añadir' />

          {message && <Message type='error'>{message}</Message>}
        </div>
      </form>
    </div>
  )
}

export default NewExpense
