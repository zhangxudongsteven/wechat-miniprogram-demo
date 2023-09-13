function switchArray(array) {
  const length = array.length
  // 随机调换顺序
  for (let i = 0; i < length; ++i) {
    const x = Math.floor(Math.random() * length)
    const y = Math.floor(Math.random() * length)
    const temp = array[x]
    array[x] = array[y]
    array[y] = temp
  }
  return array;
}

module.exports = {
  switchArray: switchArray
}
