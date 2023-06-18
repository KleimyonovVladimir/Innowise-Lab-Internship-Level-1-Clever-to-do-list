import { useState } from 'react'
import { Button, Checkbox, Dialog, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './styles.scss'

const TodoModal = ({
  title = '',
  description = '',
  status = 'active',
  date = '',
  onSubmitClick,
  onClose
}) => {
  const [todo, setTodo] = useState({
    title,
    description,
    status,
    date
  })
  const [valueDate, setValueDate] = useState(todo.date || new Date())
  const handleChange = event => {
    const { name, value } = event.target

    setTodo(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSaveClick = () => {
    if (!todo.title.trim()) return

    onSubmitClick({
      ...todo,
      date: valueDate
    })

    onClose()
  }

  const handleCheckbox = () => {
    setTodo(prevState => ({
      ...prevState,
      status: todo.status === 'done' ? 'active' : 'done'
    }))
  }

  const handleChangeDate = newValue => {
    setValueDate(newValue.toDate())
  }

  return (
    <Dialog open onClose={onClose}>
      <div className="todo-form">
        <>
          <h4>Title:</h4>
          <div className="from-title-wrapper">
            <Checkbox checked={todo.status === 'done'} size="small" onChange={handleCheckbox} />
            <TextField
              required
              variant="standard"
              name="title"
              defaultValue={todo.title}
              onChange={handleChange}
              error={!todo.title.trim()}
              helperText={!todo.title.trim() && 'This field is required'}
            />
          </div>
        </>
        <>
          <h4>Description:</h4>
          <TextField
            name="description"
            multiline
            rows={4}
            defaultValue={todo.description}
            onChange={handleChange}
          />
        </>
        <>
          <h4>Date:</h4>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={valueDate}
              onChange={handleChangeDate}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </>
      </div>
      <div className="todo-form-buttons">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleSaveClick}>
          Save
        </Button>
      </div>
    </Dialog>
  )
}

export default TodoModal
