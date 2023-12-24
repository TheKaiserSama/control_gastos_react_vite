import BudgetControl from './BudgetControl'
import NewExpense from './NewExpense'

function Header({
  expenses,
  setExpenses,
  budget,
  setBudget,
  isBudgetValid,
  setIsBudgetValid
}) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {
        isBudgetValid ? (
          <BudgetControl
            expenses={expenses}
            setExpenses={setExpenses}
            budget={budget}
            setBudget={setBudget}
            setIsBudgetValid={setIsBudgetValid}
          />
        ) : (
          <NewExpense
            budget={budget}
            setBudget={setBudget}
            setIsBudgetValid={setIsBudgetValid}
          />
        )
      }
    </header>
  )
}

export default Header
