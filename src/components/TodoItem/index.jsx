import React from 'react'
import { Link } from 'react-router-dom'
import { deleteDoc, doc, updateDoc } from '@firebase/firestore'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Button } from '@mui/material'

import { dataBase } from '../../firebase-config'

const TodoItem = ({ todoItem, setTodoList }) => {
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

  return (
    <li>
      <FormControlLabel
        control={
          <Checkbox onChange={handleCheckbox} size="small" checked={todoItem.status === 'done'} />
        }
        label={todoItem.title}
      />
      <Link to={`/todo-details/${todoItem.id}`}>
        <Button variant="outlined" size="small" color="success">
          Edit
        </Button>
      </Link>
      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ marginLeft: 10 }}
        onClick={() => handleDeleteTodo(todoItem.id)}
      >
        Delete
      </Button>
    </li>
  )
}

export default TodoItem
