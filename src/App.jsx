import { useEffect, useState } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ExpenseList from './components/ExpenseList'
import Modal from './components/Modal'
import { generateId } from './helpers'
import IconNewExpense from './img/nuevo-gasto.svg'

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )
  const [isBudgetValid, setIsBudgetValid] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [editExpense, setEditExpense] = useState({})
  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    const budgetLocalStorage = Number(localStorage.getItem('budget')) ?? 0

    if (budgetLocalStorage > 0) {
      setIsBudgetValid(true)
    }
  }, [])

  useEffect(() => {
    if (filter) {
      const filteredExpenses = expenses.filter(expense => expense.category === filter)
      setFilteredExpenses(filteredExpenses)
    }
  }, [filter])

  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = expense => {
    if (expense.id) {
      // Edit expense
      const updatedExpenses = expenses.map(currentExpense =>
        currentExpense.id === expense.id ? expense : currentExpense)
      setExpenses(updatedExpenses)
      setEditExpense({})
    } else {
      // New expense
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isBudgetValid={isBudgetValid}
        setIsBudgetValid={setIsBudgetValid}
      />

      {
        isBudgetValid && (
          <>
            <main>
              <Filters
                filter={filter}
                setFilter={setFilter}
              />
              <ExpenseList
                expenses={expenses}
                setEditExpense={setEditExpense}
                deleteExpense={deleteExpense}
                filter={filter}
                filteredExpenses={filteredExpenses}
              />
            </main>
            <div className='nuevo-gasto'>
              <img
                src={IconNewExpense}
                alt='Icono Nuevo Gasto'
                onClick={handleNewExpense}
              />
            </div>
          </>
        )
      }

      {modal &&
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      }
    </div>
  )
}

export default App
