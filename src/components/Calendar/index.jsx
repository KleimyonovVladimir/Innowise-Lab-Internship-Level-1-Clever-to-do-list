import { memo } from 'react'

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

const Calendar = memo(({ activeDate, dateArr, elementsByDate, onDateChange }) => {
  return (
    <ul className="calendar">
      {dateArr.map((date, index) => {
        const objectOfStatuses = findTodosStatuses(elementsByDate, date.getDate())

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
})

export default Calendar
