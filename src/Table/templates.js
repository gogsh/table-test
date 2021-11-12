import { getMonthDaysArray } from './Helpers/dateHelper'

export function getTableTemplate(data, weatherData, component) {
  const selectedDay = component.getAttribute('selected-day')
  const { year, month } = component

  const daysArray = getMonthDaysArray(Number(year), Number(month))
  const currentPage = component.getAttribute('current-page')

  return `
    ${
      data.length !== 0
        ? `
        <div class='table-component'>
          <header class='header'>
              ${getSearchAndWeatherModule(weatherData, selectedDay, year, month)}
              <div>
                <input class='table-search-input' placeholder='поиск по имени' value='${
                  component.searchInput
                }'/>
                <button class='table-search-button'> Поиск </button>
              </div>
            </header>
          <div class='table-wrapper'>
            <table>
            <thead>
              <tr>
                ${getTableHeader(daysArray, component)}
              </tr>
            </thead>
            <tbody>
              ${getTableBody(data, Number(currentPage))}
            </tbody>
          </table>
        </div>
      </div>
      ${getPagination(data.length, currentPage)}
      `
        : null
    }

  `
}
/** Шапка таблицы */
function getTableHeader(daysArray, component) {
  const headings = ['User', ...daysArray, 'Monthly total']
  const [context, flow] = component.getAttribute('sort-flow').split('-')
  const flowArrows = {
    up: '&#8593;',
    down: '&#8595;',
  }
  return headings.reduce((acc, item, i) => {
    return (acc =
      acc +
      `<th class='heading-item ${
        i === 0
          ? 'sticky-left-col side-cols-header'
          : i === headings.length - 1
          ? 'sticky-right-col side-cols-header'
          : ''
      }' value='${item}'>${item} ${context == item ? flowArrows[flow] : ''}</th>`)
  }, ``)
}

/** Тело таблицы */
function getTableBody(data, currentPage) {
  if (!data.length) {
    return `<h1>Значение не найдено</h1>`
  }
  const body = data[currentPage - 1].reduce((usersAcc, user) => {
    const template = (usersAcc =
      usersAcc +
      `<tr> ${
        user.Days.reduce((daysAcc, day) => {
          return (daysAcc =
            daysAcc +
            `<td class='grabbable'><span>${
              day ? day.dayActiveTime[0] + ':' + day.dayActiveTime[1] : 0
            } </span></td>`)
        }, `<td class='sticky-left-col side-cols'>${user.Fullname}</td>`) +
        `<td class='sticky-right-col side-cols'>${
          user.allActiveTime ? user.allActiveTime[0] + ':' + user.allActiveTime[1] : 0
        }</td>`
      }</tr>`)

    return template
  }, ``)
  return `${body}`
}

/** Модуль погоды и поиска */
function getSearchAndWeatherModule(weatherData, selectedDay, year, month) {
  if (weatherData && selectedDay !== '0') {
    const day = weatherData[year][month][Number(selectedDay) - 1]
    return `<div>
      <span>Средняя температура: ${day.average}</span>
      <span>Ветер: ${day.wind}</span>
      <span>Осадки: ${day.precipitation}</span>
    </div>`
  } else {
    return ``
  }
}

/** Пагинация */
function getPagination(numberOfPages, currentPage) {
  let paginationButtons = ``
  for (let i = 0; i < numberOfPages; i++) {
    paginationButtons =
      paginationButtons +
      `<button ${
        currentPage == i + 1 ? 'disabled' : ''
      } class='pagination-button' value='${i + 1}'>${i + 1}</button>`
  }
  return `
    <div class='pagination'>${paginationButtons}</div>
  `
}
