import { makePagesFromData } from './generateValidData'

export function search(data, inputValue) {
  if (!inputValue.trim()) {
    return data
  }
  const reg = new RegExp(inputValue.trim())

  const result = data.flat().filter(persone => {
    if (persone.Fullname.match(reg)) {
      return persone
    }
  })
  if (!result.length) {
    return data
  }
  return makePagesFromData(result)
}
