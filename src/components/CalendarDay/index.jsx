import clsx from 'clsx'

import './styles.scss'

const CalendarDay = ({ date, activeDate, objectOfStatuses, onDateChange }) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleClick = () => {
    onDateChange(date)
  }

  return (
    <div
      className={clsx('calendar-day', date.getDate() === activeDate.getDate() && 'active-day')}
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
