export const bounded = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max))

export const roundStep = (value: number, step: number, direction: number) =>
  direction === -1
    ? Math.floor(value / step) * step
    : Math.ceil(value / step) * step

export const getMinusRoundedValue = (currentValue: number, step: number) =>
  currentValue % step === 0
    ? roundStep(currentValue - step, step, -1)
    : roundStep(currentValue, step, -1)

export const getPlusRoundedValue = (currentValue: number, step: number) =>
  currentValue % step === 0
    ? roundStep(currentValue + step, step, 1)
    : roundStep(currentValue, step, 1)
