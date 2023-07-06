import dayjs from 'dayjs'

export const changeDateFormat = (date = new Date(), format) => {
  return dayjs(date).format(format)
}
