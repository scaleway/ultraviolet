export const isInteger = (step?: number | string) => (value: number) => {
  if (value === undefined || step === undefined) {
    return true
  }
  if (Number.isInteger(step)) {
    return Number.isInteger(value) && Number.isInteger(value)
  }

  return !(Number.isInteger(value) || Number.isInteger(value))
}
