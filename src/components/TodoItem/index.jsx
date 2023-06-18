import React, { useEffect, useState } from 'react'
import { deleteDoc, doc, getDoc, updateDoc } from '@firebase/firestore'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Button } from '@mui/material'

import { dataBase } from '../../firebase-config'
import TodoModal from '../TodoModal'

import './styles.scss'

const TodoItem = ({ todoItem, setTodoList }) => {
  const [isTodoModalOpen, setTodoModalOpen] = useState(false)

  const handleCheckbox = async () => {
    await updateDoc(doc(dataBase, 'todos', todoItem.id), {
      status: todoItem.status === 'done' ? 'active' : 'done'
    })

    setTodoList(prevState => {
      const newTodoList = [...prevState]

      const todoItemIndex = newTodoList.findIndex(todo => todo.id === todoItem.id)
      const foundTodoItem = newTodoList[todoItemIndex]

      if (foundTodoItem) {
        const newTodoItem = {
          ...foundTodoItem,
          status: todoItem.status === 'done' ? 'active' : 'done'
        }
        newTodoList.splice(todoItemIndex, 1, newTodoItem)
      }

      return newTodoList
    })
  }
  const handleDeleteTodo = async id => await deleteDoc(doc(dataBase, 'todos', id))

  const [response, setResponse] = useState({})

  useEffect(() => {
    const fetchDocById = async () => {
      const docRef = doc(dataBase, 'todos', todoItem.id)

      const docSnap = await getDoc(docRef)

      setResponse({ ...docSnap.data(), date: docSnap.data().date.toDate() })
    }
    fetchDocById()
  }, [])

  const handleEditSave = async todo => {
    await updateDoc(doc(dataBase, 'todos', todoItem.id), {
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
      <li className="todo">
        <FormControlLabel
          control={
            <Checkbox onChange={handleCheckbox} size="small" checked={todoItem.status === 'done'} />
          }
          label={todoItem.title}
        />
        <div className="todo-buttons">
          <Button variant="outlined" size="small" color="success" onClick={handleOpenCloseDialog}>
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            style={{ marginLeft: 10 }}
            onClick={() => handleDeleteTodo(todoItem.id)}
          >
            Delete
          </Button>
        </div>
      </li>
      {isTodoModalOpen && (
        <TodoModal
          title={todoItem.title}
          description={todoItem.description}
          status={todoItem.status}
          date={response.date}
          onClose={handleOpenCloseDialog}
          onSubmitClick={handleEditSave}
        />
      )}
    </>
  )
}

export default TodoItem
