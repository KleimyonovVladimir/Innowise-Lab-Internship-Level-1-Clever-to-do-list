import { memo } from 'react'

import { changeDateFormat } from '../../utils/changeDateFormat'
import CalendarDay from '../CalendarDay'

import './styles.scss'

const findTodosStatuses = (object, day) => {
  const todosArray = object[day]

  if (!todosArray) return null

  const findActiveTodo = todosArray.find(todo => todo.status === 'active')
  const findDoneTodo = todosArray.find(todo => todo.status === 'done')

  return {
    hasActive: Boolean(findActiveTodo),
    hasDone: Boolean(findDoneTodo)
  }
}

const onWheel = e => {
  if (!e.deltaY) return

  e.currentTarget.scrollTo({
    left: e.currentTarget.scrollLeft + e.deltaY
  })
}

const Calendar = memo(
  ({ activeDate, dateArr, elementsByDate, onDateChange, horizontalBlockRef, onScroll }) => {
    return (
      <ul
        ref={horizontalBlockRef}
        onScroll={onScroll}
        onWheel={onWheel}
        className="calendar scroll"
      >
        {dateArr.map((date, index) => {
          const objectOfStatuses = findTodosStatuses(
            elementsByDate,
            changeDateFormat(date, 'DD/MM/YYYY')
          )

          return (
            <CalendarDay
              objectOfStatuses={objectOfStatuses}
              key={index}
              date={date}
              activeDate={activeDate}
              onDateChange={onDateChange}
            />
          )
        })}
      </ul>
    )
  }
)

export default Calendar
