import { toast } from 'react-toastify'

import { SimpleToast } from '../components/SimpleToast'

import 'react-toastify/dist/ReactToastify.css'

export const toastProps = {
  autoClose: 3000,
  position: 'top-right',
  closeButton: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: false,
  newestOnTop: true,
  limit: 3
}

export const toastMessage = (message, type = 'error', position = 'top-right') => {
  toast.clearWaitingQueue()

  return toast(SimpleToast(message, type), {
    ...toastProps,
    type,
    position
  })
}
