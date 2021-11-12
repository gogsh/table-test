export const getMonthLength = (monthIndex, year) => {
  return new Date(year, monthIndex, 0).getDate()
}

export const getMonthDaysArray = (monthIndex, year) => {
  const monthLength = getMonthLength(monthIndex, year)
  const monthDaysArray = []
  for (let i = 1; i <= monthLength; i++) {
    monthDaysArray.push(i)
  }
  return monthDaysArray
}

export const getTimeFromMins = mins => {
  let hours = Math.trunc(mins / 60)
  let minutes = mins % 60
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return [hours, minutes]
}

/** функция считает активное время. разницу между Date.End и Date.Start */
export const getActiveTime = (start, end) => {
  if (!start && !end) return null

  const [startHours, startMinutes] = start.split('-').map(el => Number(el))
  const [endHours, endMinutes] = end.split('-').map(el => Number(el))

  const startTotalMinutes = startHours * 60 + startMinutes
  const endTotalMinutes = endHours * 60 + endMinutes
  const totalMinutesActiveTime = endTotalMinutes - startTotalMinutes

  return [...getTimeFromMins(totalMinutesActiveTime), totalMinutesActiveTime]
}

export const getMonthTotal = totalMinutesOnEveryDay => {
  return getTimeFromMins(totalMinutesOnEveryDay.reduce((acc, el) => (acc = acc + el), 0))
}

export const getDate = data => {
  let year, month
  const someDaysArray = data.flat()[0].Days

  for (let i = 0; i < someDaysArray.length; i++) {
    if ((year, month)) {
      break
    }
    if (!someDaysArray[i]) {
      continue
    } else {
      ;[year, month] = someDaysArray[i].Date.split('-')
    }
  }

  return [year, month]
}
