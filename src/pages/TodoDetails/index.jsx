import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { doc, getDoc, updateDoc } from '@firebase/firestore'

import Form from '../../components/Form'
import { dataBase } from '../../firebase-config'

const TodoDetails = () => {
  const { id } = useParams()

  const [response, setResponse] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDocById = async () => {
      setIsLoading(true)

      const docRef = doc(dataBase, 'todos', id)

      const docSnap = await getDoc(docRef)

      setResponse({ ...docSnap.data(), date: docSnap.data().date.toDate() })
      setIsLoading(false)
    }

    fetchDocById()
  }, [])

  const handleEditSave = async todo => {
    await updateDoc(doc(dataBase, 'todos', id), {
      title: todo.title,
      description: todo.description,
      status: todo.status,
      date: todo.date
    })
  }

  return isLoading ? (
    <>Loading...</>
  ) : (
    <Form
      title={response.title}
      description={response.description}
      status={response.status}
      date={response.date}
      onSubmitClick={handleEditSave}
    />
  )
}

export default TodoDetails
