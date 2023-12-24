import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function BudgetControl({
  expenses,
  setExpenses,
  budget,
  setBudget,
  setIsBudgetValid
}) {
  const [percentage, setPercentage] = useState(0)
  const [available, setAvailable] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => expense.quantity + total, 0)
    const totalAvailable = budget - totalSpent

    // Calculate percentage spent
    const percentageSpent = (((budget - totalAvailable) / budget) * 100).toFixed(2)

    setSpent(totalSpent)
    setAvailable(totalAvailable)

    setTimeout(() => {
      setPercentage(percentageSpent)
    }, 1500);
  }, [expenses])


  const formatQuantity = quantity => {
    return quantity.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {
    const result = confirm('¿Deseas reiniciar presupesto y gastos?')
    if (result) {
      setExpenses([])
      setBudget(0)
      setIsBudgetValid(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button
          className='reset-app'
          type='button'
          onClick={handleResetApp}
        >
          Resetear App
        </button>

        <p>
          <span>Presupuesto: </span> {formatQuantity(budget)}
        </p>

        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatQuantity(available)}
        </p>

        <p>
          <span>Gastado: </span> {formatQuantity(spent)}
        </p>
      </div>
    </div>
  )
}

export default BudgetControl
