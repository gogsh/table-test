import { getActiveTime, getTimeFromMins } from './dateHelper'
import { getMonthDaysArray } from './dateHelper'

export function generateValidData(data) {
  return makePagesFromData(calculateData(formValidArray(data)))
}

/** функция высчитывает значения для дальнейшей сортировки таблицы */
function calculateData(data) {
  const result = data.map(user => {
    let allActiveTime = 0
    return {
      ...user,
      Days: user.Days.map(day => {
        if (day) {
          const [hours, minutes, sum] = getActiveTime(day.Start, day.End)
          allActiveTime = allActiveTime + Number(sum)
          return {
            ...day,
            dayActiveTime: [hours, minutes],
            dayActiveTimeInMinutes: sum,
          }
        } else {
          return null
        }
      }),
      allActiveTime: getTimeFromMins(allActiveTime),
      allActiveTimeInMinutes: allActiveTime,
    }
  })
  return result
}

function formValidArray(data) {
  const [year, month] = data[0].Days[0].Date.split('-')
  const monthDaysArray = getMonthDaysArray(month, year)
  const result = data.map(user => {
    return {
      ...user,
      Days: monthDaysArray.map(day => {
        const hasDay = user.Days.find(dataDay => {
          const dateDay = dataDay.Date.split('-')[2]
          if (day == dateDay) {
            return true
          }
        })
        if (hasDay) {
          return hasDay
        } else {
          return null
        }
      }),
    }
  })
  return result
}

/** функция создаёт страницы */
export function makePagesFromData(data) {
  const pages = []
  const pageSize = 10
  for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
    pages[i] = data.slice(i * pageSize, i * pageSize + pageSize)
  }
  return pages
}
