import { memo, useEffect, useMemo, useState } from 'react'
import { addDoc, collection, onSnapshot, query, where } from '@firebase/firestore'
import { Button } from '@mui/material'

import Calendar from '../../components/Calendar'
import TodoList from '../../components/TodoList'
import TodoModal from '../../components/TodoModal'
import { dataBase } from '../../firebase-config'
import { removeTime } from '../../utils/removeTime'

const Home = memo(() => {
  const [todoList, setTodoList] = useState([])
  const [activeDate, setActiveDate] = useState(new Date())
  const [isTodoModalOpen, setTodoModalOpen] = useState(false)

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

  return (
    <>
      <Calendar
        dateArr={dateArr}
        elementsByDate={elementsByDate}
        activeDate={activeDate}
        onDateChange={onDateChange}
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
