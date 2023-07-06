import clsx from 'clsx'

import './styles.scss'

const CalendarDay = ({ date, activeDate, objectOfStatuses, onDateChange }) => {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const handleClick = () => {
    onDateChange(date)
  }
  return (
    <div
      className={clsx(
        'calendar-day',
        date.getFullYear() === activeDate.getFullYear() &&
          date.getMonth() === activeDate.getMonth() &&
          date.getDate() === activeDate.getDate() &&
          'active-day'
      )}
      onClick={handleClick}
    >
      <div className="day-name">{weekDays[date.getDay()]}</div>
      <span className="day-number">{date.getDate()}</span>

      {objectOfStatuses && (
        <div style={{ display: 'flex', position: 'absolute', bottom: '-12px' }}>
          <span className={objectOfStatuses.hasActive ? 'has-active-todo' : undefined} />
          <span className={objectOfStatuses.hasDone ? 'has-done-todo' : undefined} />
        </div>
      )}
    </div>
  )
}

export default CalendarDay
