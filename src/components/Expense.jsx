import { formatDate } from '../helpers/index'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import IconSaving from '../img/icono_ahorro.svg'
import IconHome from '../img/icono_casa.svg'
import IconFoot from '../img/icono_comida.svg'
import IconExpenses from '../img/icono_gastos.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSubscriptions from '../img/icono_suscripciones.svg'

const iconMap = {
  ahorro: IconSaving,
  comida: IconFoot,
  casa: IconHome,
  gastos: IconExpenses,
  ocio: IconLeisure,
  salud: IconHealth,
  subscripciones: IconSubscriptions,
}

function Expense({
  expense,
  setEditExpense,
  deleteExpense
}) {
  const { id, name, quantity, category, date } = expense
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => deleteExpense(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img
              src={iconMap[category]}
              alt='Icono Gasto'
            />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='nombre-gasto'>{name}</p>
              <p className='fecha-gasto'>
                Agregado El: {''}
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>

          <p className='cantidad-gasto'>${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense
