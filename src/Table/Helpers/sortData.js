import { makePagesFromData } from './generateValidData'

export function sort(data, sortFlow) {
  if (sortFlow === '0') {
    return data
  }

  const [context, flow] = sortFlow.split('-')
  let sorted = []

  if (context == 'User') {
    sorted = data.flat().sort((a, b) => {
      if (flow === 'up') {
        return upSort(a.Fullname, b.Fullname)
      } else {
        return downSort(a.Fullname, b.Fullname)
      }
    })
    return makePagesFromData(sorted)
  }

  if (context == 'Monthly total') {
    sorted = data.flat().sort((a, b) => {
      if (flow === 'up') {
        return upSort(a.allActiveTimeInMinutes, b.allActiveTimeInMinutes)
      } else {
        return downSort(a.allActiveTimeInMinutes, b.allActiveTimeInMinutes)
      }
    })
    return makePagesFromData(sorted)
  }

  sorted = data.flat().sort((a, b) => {
    const aDay = a.Days[context - 1]
    const bDay = b.Days[context - 1]

    if (flow === 'up') {
      if (aDay === null && bDay === null) {
        return 0
      }
      if (aDay === null) {
        return upSort(0, bDay.dayActiveTimeInMinutes)
      }
      if (bDay === null) {
        return upSort(aDay.dayActiveTimeInMinutes, 0)
      }
      return upSort(aDay.dayActiveTimeInMinutes, bDay.dayActiveTimeInMinutes)
    } else {
      if (aDay === null && bDay === null) {
        return 0
      }
      if (aDay === null) {
        return downSort(0, bDay.dayActiveTimeInMinutes)
      }
      if (bDay === null) {
        return downSort(aDay.dayActiveTimeInMinutes, 0)
      }
      return downSort(aDay.dayActiveTimeInMinutes, bDay.dayActiveTimeInMinutes)
    }
  })

  return makePagesFromData(sorted)
}

function upSort(a, b) {
  if (a < b) {
    return -1
  } else {
    return 1
  }
}

function downSort(a, b) {
  if (a > b) {
    return -1
  } else {
    return 1
  }
}
