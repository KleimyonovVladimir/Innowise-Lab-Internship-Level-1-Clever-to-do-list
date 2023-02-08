import { memo, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, query, where } from '@firebase/firestore'
import { Button } from '@mui/material'

import Calendar from '../../components/Calendar'
import TodoList from '../../components/TodoList'
import { dataBase } from '../../firebase-config'
import { removeTime } from '../../utils/removeTime'

const Home = memo(() => {
  const [todoList, setTodoList] = useState([])
  const [activeDate, setActiveDate] = useState(new Date())

  const onDateChange = date => {
    const selectedDate = new Date(date)

    setActiveDate(selectedDate)
  }

  const startDate = new Date()
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)

  const filteredTodos = useMemo(
    () => todoList.filter(todo => todo.date.toDate().getDate() === activeDate.getDate()),
    [todoList, activeDate]
  )

  useEffect(() => {
    const requestStartDate = removeTime(new Date(startDate))
    const requestEndDate = removeTime(new Date(endDate))

    const unsubscribe = onSnapshot(
      query(
        collection(dataBase, 'todos'),
        where('date', '>=', requestStartDate),
        where('date', '<', requestEndDate)
      ),
      querySnapshot => {
        setTodoList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      }
    )

    return () => unsubscribe()
  }, [])

  const elementsByDate = useMemo(
    () =>
      todoList.reduce((acc, element) => {
        const day = element.date.toDate().getDate()

        if (!acc[day]) acc[day] = []

        acc[day].push(element)

        return acc
      }, {}),
    [todoList]
  )

  const dateArr = useMemo(() => {
    const arr = []

    let date = removeTime(new Date(startDate))

    while (date <= endDate) {
      arr.push(new Date(date))

      date = new Date(date.setDate(date.getDate() + 1))
    }

    return arr
  }, [startDate, endDate])

  return (
    <>
      <Calendar
        dateArr={dateArr}
        elementsByDate={elementsByDate}
        activeDate={activeDate}
        onDateChange={onDateChange}
      />
      <TodoList todoList={filteredTodos} setTodoList={setTodoList} />
      <Link to="/add">
        <Button variant="contained">Add todo</Button>
      </Link>
    </>
  )
})

export default Home
