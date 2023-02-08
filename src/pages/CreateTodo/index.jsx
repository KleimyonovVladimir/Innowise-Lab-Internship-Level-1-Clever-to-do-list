import { addDoc, collection } from '@firebase/firestore'

import Form from '../../components/Form'
import { dataBase } from '../../firebase-config'

const CreateTodoPage = () => {
  const handleAddTodo = async todo => {
    await addDoc(collection(dataBase, 'todos'), {
      title: todo.title,
      description: todo.description,
      status: todo.status,
      date: todo.date
    })
  }

  return (
    <>
      <Form onSubmitClick={handleAddTodo} />
    </>
  )
}

export default CreateTodoPage
