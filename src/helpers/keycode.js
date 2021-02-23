export const onKeyOnlyNumbers = e => {
  // `e.which` and `e.keyCode` are deprecated (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  const keyCode = e.key.charCodeAt(0)
  if (keyCode < 48 || keyCode > 57) {
    e.preventDefault()
  }
}
