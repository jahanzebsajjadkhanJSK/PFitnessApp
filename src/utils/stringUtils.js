export const capitalizeWords = (str) => {
  // console.log(str)
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}
