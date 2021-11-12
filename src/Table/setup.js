/** Обработчики событий */
export function setup() {
  const headerItems = this.shadowRoot.querySelectorAll('.heading-item')
  const tableWrapper = this.shadowRoot.querySelector('.table-wrapper')
  const paginationButtons = this.shadowRoot.querySelectorAll('.pagination-button')
  const searchInput = this.shadowRoot.querySelector('.table-search-input')
  const searchButton = this.shadowRoot.querySelector('.table-search-button')

  sortHandlers(headerItems, tableWrapper, this)
  drugAndScrollHandlers(tableWrapper, this)
  paginationHandlers(paginationButtons, this)
  searchHandlers(searchInput, searchButton, this)

  tableWrapper.scrollLeft = this.pageX
}

/** обработчик отображения погоды */
function weatherHandler(e) {
  const value = e.target.getAttribute('value')
  const currentSelectedDay = this.getAttribute('selected-day')

  if (currentSelectedDay !== value) {
    this.setAttribute('selected-day', value)
  }
}

/** обработчики сортировки таблицы */
function sortHandlers(headerItems, tableWrapper, table) {
  headerItems.forEach(item => {
    const value = item.getAttribute('value')
    item.addEventListener('click', sortHandler.bind(table))

    if (value !== 'User' && value !== 'Monthly total') {
      item.addEventListener('click', weatherHandler.bind(table))
    }
  })

  function sortHandler(e) {
    table.pageX = tableWrapper.scrollLeft
    const value = e.target.getAttribute('value')
    const currentSortFlow = this.getAttribute('sort-flow')
    if (currentSortFlow === `${value}-up`) {
      this.setAttribute('sort-flow', `${value}-down`)
    } else {
      this.setAttribute('sort-flow', `${value}-up`)
    }
  }
}

function searchHandlers(search, button, table) {
  search.oninput = e => {
    table.searchInput = e.target.value
  }
  button.addEventListener(
    'click',
    function () {
      this.setAttribute('search-value', table.searchInput)
      this.setAttribute('current-page', '1')
    }.bind(table),
  )
}

function paginationHandlers(paginationButtons, table) {
  paginationButtons.forEach(item => {
    item.addEventListener('click', paginationHandler.bind(table))
  })

  function paginationHandler(e) {
    const value = e.target.value
    this.setAttribute('current-page', value)
  }
}

/** Drag to scroll */
function drugAndScrollHandlers(tableWrapper, table) {
  let isDown = false
  let startX
  let scrollLeft

  function onMousedown(e) {
    if (e.target.tagName !== 'SPAN') {
      isDown = true
      startX = e.pageX - tableWrapper.offsetLeft
      scrollLeft = tableWrapper.scrollLeft
    }
  }

  function onMouseLeave(e) {
    if (e.target.tagName !== 'SPAN') {
      isDown = false
    }
  }

  function onMouseUp(e) {
    isDown = false
  }

  function onMouseMove(e) {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - tableWrapper.offsetLeft
    const walk = (x - startX) * 1 // скорость скролла
    tableWrapper.scrollLeft = scrollLeft - walk
  }

  tableWrapper.addEventListener('mousedown', onMousedown.bind(table))
  tableWrapper.addEventListener('mouseleave', onMouseLeave.bind(table))
  tableWrapper.addEventListener('mouseup', onMouseUp.bind(table))
  tableWrapper.addEventListener('mousemove', onMouseMove.bind(table))
}
