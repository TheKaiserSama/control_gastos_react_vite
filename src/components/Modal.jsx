import { useEffect, useState } from 'react'
import Message from './Message'
import CloseButton from '../img/cerrar.svg'

function Modal({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpense,
  editExpense,
  setEditExpense
}) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setId(editExpense.id)
      setName(editExpense.name)
      setQuantity(editExpense.quantity)
      setCategory(editExpense.category)
      setDate(editExpense.date)
    }
  }, [])

  const hideModal = () => {
    setAnimateModal(false)
    setEditExpense({})
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([name, quantity, category].includes('')) {
      setMessage('Todos los campos son obligatorios')

      setTimeout(() => {
        setMessage('')
      }, 1000);
      return
    }

    saveExpense({ id, name, quantity, category, date })
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img
          src={CloseButton}
          alt='Cerrar modal'
          onClick={hideModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}>
        <legend>{editExpense.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        {
          message && <Message type='error'>{message}</Message>
        }

        <div className='campo'>
          <label htmlFor='name'>Nombre Gasto</label>

          <input
            id='name'
            type='text'
            placeholder='Añade el Nombre del Gasto'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='quantity'>Cantidad</label>

          <input
            id='quantity'
            type='number'
            placeholder='Añade la cantidad del Gasto: ej. 300'
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor='category'>Categorias</label>

          <select
            id='category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value=''>-- Seleccione --</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos Varios</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='subscripciones'>Subscripciones</option>
          </select>

          <input
            type='submit'
            value={editExpense.name ? 'Guardar Cambios' : 'Añadir Gasto'}
          />
        </div>
      </form>
    </div>
  )
}

export default Modal
