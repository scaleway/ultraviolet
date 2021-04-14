const isJSONString = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }

  return true
}

export default isJSONString
