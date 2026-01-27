import { describe, expect, it } from 'vitest'
import { filterByProperty } from './filterByProperty'

describe('filterByProperty helpers', () => {
  it('should filter array by property existence', () => {
    const input = [
      { name: 'John' },
      { name: null },
      { name: undefined },
      { name: '' },
      { name: 'Jane' },
      { name: 'Bob' },
    ]

    const result = filterByProperty(input, 'name')

    expect(result).toHaveLength(4)
    expect(result).toContainEqual({ name: 'John' })
    expect(result).toContainEqual({ name: '' })
    expect(result).toContainEqual({ name: 'Jane' })
  })
  it('should filter array by property existence', () => {
    const input: { name?: string | null | undefined }[] = [
      { name: 'John' },
      { name: null },
      { name: undefined },
      { name: '' },
      { name: 'Jane' },
      { name: 'Bob' },
    ]

    const result = filterByProperty(input, 'name')

    expect(result).toHaveLength(4)
    expect(result).toContainEqual({ name: 'John' })
    expect(result).toContainEqual({ name: '' })
    expect(result).toContainEqual({ name: 'Jane' })
  })

  it('should return empty array when no items have the property', () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    // @ts-expect-error error for testing
    const result = filterByProperty(input, 'name')

    expect(result).toHaveLength(0)
  })

  it('should filter out null and undefined values', () => {
    const input = [
      { id: 1, status: 'active' },
      { id: 2, status: null },
      { id: 3, status: undefined },
      { id: 4, status: 'inactive' },
    ]

    const result = filterByProperty(input, 'status')

    expect(result).toHaveLength(2)
    expect(result).toContainEqual({ id: 1, status: 'active' })
    expect(result).toContainEqual({ id: 4, status: 'inactive' })
  })

  it('should handle empty arrays', () => {
    const result = filterByProperty([], 'name')

    expect(result).toHaveLength(0)
  })

  it('should work with different property types', () => {
    const input = [
      { id: 1, active: true, count: 5 },
      { id: 2, active: null, count: 3 },
      { id: 3, active: false, count: null },
      { id: 4, active: undefined, count: 0 },
      { id: 5, active: true, count: undefined },
    ]

    const activeResult = filterByProperty(input, 'active')

    expect(activeResult).toHaveLength(3)
    expect(activeResult).toContainEqual({ id: 1, active: true, count: 5 })
    expect(activeResult).toContainEqual({ id: 3, active: false, count: null })
    expect(activeResult).toContainEqual({
      id: 5,
      active: true,
      count: undefined,
    })

    const countResult = filterByProperty(input, 'count')
    console.debug(countResult)

    expect(countResult).toHaveLength(3)
    expect(countResult).toContainEqual({ id: 1, active: true, count: 5 })
    expect(countResult).toContainEqual({ id: 2, active: null, count: 3 })
    expect(countResult).toContainEqual({ id: 4, active: undefined, count: 0 })
  })
})
