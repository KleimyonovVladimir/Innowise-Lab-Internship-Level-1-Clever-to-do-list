import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { addDoc, collection, onSnapshot, query, where } from '@firebase/firestore'
import { Button } from '@mui/material'

import Calendar from '../../components/Calendar'
import TodoList from '../../components/TodoList'
import TodoModal from '../../components/TodoModal'
import { dataBase } from '../../firebase-config'
import { changeDateFormat } from '../../utils/changeDateFormat'
import { removeTime } from '../../utils/removeTime'

const Home = memo(() => {
  const horizontalBlockRef = useRef(null)

  const [todoList, setTodoList] = useState([])
  const [activeDate, setActiveDate] = useState(new Date())
  const [isTodoModalOpen, setTodoModalOpen] = useState(false)
  const [calendarDate, setCalendarDate] = useState([])

  const startDate = new Date()
  const endDateOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)

  const endDate = new Date(endDateOfMonth.setDate(startDate.getDate() + 31))

  const [endDateOfScrolling, setEndDateOfScrolling] = useState(endDate)

  const filteredTodos = useMemo(
    () =>
      todoList.filter(
        todo =>
          todo.date.toDate().getDate() === activeDate.getDate() &&
          todo.date.toDate().getMonth() === activeDate.getMonth() &&
          todo.date.toDate().getFullYear() === activeDate.getFullYear()
      ),
    [todoList, activeDate]
  )

  useEffect(() => {
    const requestStartDate = removeTime(new Date(startDate))
    const requestEndDate = removeTime(new Date(endDateOfScrolling))

    const unsubscribe = onSnapshot(
      query(
        collection(dataBase, 'todos'),
        where('date', '>=', requestStartDate),
        where('date', '<=', requestEndDate)
      ),
      querySnapshot => {
        setTodoList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      }
    )

    return () => unsubscribe()
  }, [endDateOfScrolling])

  const elementsByDate = useMemo(
    () =>
      todoList.reduce((acc, element) => {
        const day = changeDateFormat(removeTime(element.date.toDate()), 'DD/MM/YYYY')

        if (!acc[day]) acc[day] = []

        acc[day].push(element)

        return acc
      }, {}),
    [todoList]
  )

  const handleAddTodo = async todo => {
    await addDoc(collection(dataBase, 'todos'), {
      title: todo.title,
      description: todo.description,
      status: todo.status,
      date: todo.date
    })
  }

  const handleOpenCloseDialog = () => {
    setTodoModalOpen(prev => !prev)
  }

  const onDateChange = date => {
    const selectedDate = new Date(date)

    setActiveDate(selectedDate)
  }

  const onScroll = () => {
    const horizontalBlock = horizontalBlockRef.current

    if (horizontalBlock) {
      const scrollRight =
        horizontalBlock.scrollWidth - horizontalBlock.clientWidth - horizontalBlock.scrollLeft

      if (scrollRight < 250) {
        const newEndDate = new Date(endDateOfScrolling)
        newEndDate.setDate(newEndDate.getDate() + 1)
        setEndDateOfScrolling(newEndDate)
      }
    }
  }

  useMemo(() => {
    const arr = []

    let date = removeTime(new Date(startDate))

    while (date <= endDateOfScrolling) {
      arr.push(new Date(date))

      date = new Date(date.setDate(date.getDate() + 1))
    }

    setCalendarDate(arr)
  }, [endDateOfScrolling])

  return (
    <>
      <Calendar
        dateArr={calendarDate}
        elementsByDate={elementsByDate}
        activeDate={activeDate}
        onDateChange={onDateChange}
        onScroll={onScroll}
        horizontalBlockRef={horizontalBlockRef}
      />
      <Button variant="contained" onClick={handleOpenCloseDialog}>
        Add todo
      </Button>
      <TodoList todoList={filteredTodos} setTodoList={setTodoList} />
      {isTodoModalOpen && (
        <TodoModal
          date={activeDate}
          onClose={handleOpenCloseDialog}
          onSubmitClick={handleAddTodo}
        />
      )}
    </>
  )
})

export default Home
