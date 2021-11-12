export function tableStyles() {
  return `
    <style>

      * {
        font-family: Roboto;
      }

      .table-component {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }

      .table-wrapper {
        width: 90%;
        height: 74vh;
        overflow: scroll;
      }

      header {
        height: 30px;
        margin-top: 50px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        width: 100%;
      }

      .table-search-input {
        font-size: 14px;
        padding:8px;
      }

      .table-search-button {
        font-size: 14px;
        padding:8px;
        cursor: pointer;
      }

      table {
        margin-bottom: 20px;
        border-spacing: 0;
        border-collapse: separate;
        text-align: center;
      }

      table th:first-child,
      table td:first-child {
        border-left: 1px solid #dddddd;
      }

      table th:last-child,
      table td:last-child {
        border-left: 1px solid #dddddd;
      }

      table th:nth-last-child(2),
      table td:nth-last-child(2) {
        border-right: none;
      }

      th {
        position: sticky;
        top: 0;
        z-index: 2;
        font-weight: bold;
        padding: 10px;
        background: #efefef;

        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        border-right: 1px solid #dddddd;

        cursor: pointer;
      }

      td {
        border-bottom: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        padding: 10px;
      }

      .grabbable {
        cursor: grab;
      }

      span {
        cursor: text
      }

      .sticky-left-col {
        position: sticky;
        width: 300px;
        left: 0;

      }

      .sticky-right-col {
        position: sticky;
        width: 300px;
        right: 0;
      }

      .side-cols {
        background: #F8F8F8;
      }

      .side-cols-header {
        z-index: 3;
      }


      .pagination {
        margin-top:20px;
        display: flex;
        justify-content: center;
        gap: 16px;
      }

      .pagination-button {
        cursor: pointer;
        padding: 8px 16px;
        font-size: 16px;
      }

    </style>
  `
}
