import { fetchData } from './Helpers/fetchData'
import { tableStyles } from './Table-style'
import { sort } from './Helpers/sortData'
import { search } from './Helpers/searchData'
import { generateValidData } from './Helpers/generateValidData'
import { getDate } from './Helpers/dateHelper'

import { setup } from './setup'
import { getTableTemplate } from './templates'

/** Компонент таблицы */
class Table extends HTMLElement {
  data = null
  weatherData = null

  year = '2021'
  month = '05'

  scrollX = 0
  searchInput = ''

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['is-data-loaded', 'sort-flow', 'selected-day', 'current-page', 'search-value']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render()
  }

  connectedCallback() {
    this.fetchTableData()
    this.render()
  }

  /** запросы на получение данных */
  async fetchTableData() {
    try {
      const tableData = await fetchData('./data.json')
      const weatherData = await fetchData('./weatherData.json')
      if (tableData && weatherData) {
        const validData = generateValidData(tableData)
        this.data = [...validData]

        const [year, month] = getDate(this.data)
        this.year = year
        this.month = month

        this.weatherData = weatherData
        this.setAttribute('is-data-loaded', 1)
      }
    } catch (e) {
      throw Error(e)
    }
  }

  render() {
    console.log('RENDER')
    const sortFlow = this.getAttribute('sort-flow')
    if (this.data) {
      const renderData = [...search(sort(this.data, sortFlow), this.searchInput)]
      this.shadow.innerHTML =
        tableStyles() + getTableTemplate(renderData, this.weatherData, this)

      setup.call(this)
    } else {
      // TODO: заглушка
    }
  }
}

export default Table
