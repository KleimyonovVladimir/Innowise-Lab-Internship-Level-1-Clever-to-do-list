import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Checkbox, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './styles.scss'

const Form = ({ title = '', description = '', status = 'active', date = '', onSubmitClick }) => {
  const navigate = useNavigate()

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
    onSubmitClick({
      ...todo,
      date: valueDate
    })

    navigate('/home')
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
    <>
      <div className="todo-form">
        <>
          <h4>Title:</h4>
          <div className="from-title-wrapper">
            <Checkbox checked={todo.status === 'done'} size="small" onChange={handleCheckbox} />
            <TextField
              variant="standard"
              name="title"
              defaultValue={todo.title}
              onChange={handleChange}
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
      <Button variant="outlined" style={{ marginTop: 20 }} onClick={handleSaveClick}>
        Save
      </Button>
    </>
  )
}

export default Form
