import TodoItem from '../../components/TodoItem'

import './styles.scss'

const TodoList = ({ todoList, setTodoList }) => {
  return (
    <ul className="todo-list">
      {todoList.map(todo => (
        <TodoItem key={todo.id} todoItem={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  )
}

export default TodoList
