import { useMemo } from 'react'

function chr4() {
  return Math.random()
    .toString(16)
    .slice(-4)
}

function uuid() {
  return Array.from({ length: 8 }, () => chr4()).join('')
}

export function getUUID(prefix = '') {
  return `${prefix}-${uuid()}`
}

export function useUUID(prefix = '') {
  return useMemo(() => getUUID(prefix), [prefix])
}
