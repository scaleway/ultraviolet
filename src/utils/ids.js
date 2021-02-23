import { useMemo } from 'react'

const chr4 = () => Math.random().toString(16).slice(-4)
const uuid = () => Array.from({ length: 8 }, chr4).join('')

export const getUUID = (prefix = '') => `${prefix ? `${prefix}-` : ''}${uuid()}`
export const useUUID = (prefix = '') => useMemo(() => getUUID(prefix), [prefix])
