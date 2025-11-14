import { Theme } from '@emotion/react'
import { DefaultTreeMapDatum } from '@nivo/treemap'
import { describe, expect, it } from 'vitest'
import { getAllIds, getDataColors, getOpacity, percentToHex } from '../treeMap'

describe('getOpacity', () => {
  it('should return 100 for input 0', () => {
    expect(getOpacity(0)).toBe(100)
  })

  it('should return 0 for input 100', () => {
    expect(getOpacity(100)).toBe(0)
  })

  it('should multiply by 10 for single digits (1-9)', () => {
    expect(getOpacity(1)).toBe(10)
    expect(getOpacity(5)).toBe(50)
    expect(getOpacity(9)).toBe(90)
  })

  it('should swap digits for two-digit numbers (10-99)', () => {
    expect(getOpacity(10)).toBe(1)
    expect(getOpacity(12)).toBe(21)
    expect(getOpacity(45)).toBe(54)
    expect(getOpacity(99)).toBe(99)
    expect(getOpacity(23)).toBe(32)
  })

  it('should handle edge cases for two-digit numbers', () => {
    expect(getOpacity(20)).toBe(2)
    expect(getOpacity(50)).toBe(5)
  })
})

describe('percentToHex', () => {
  it('should convert 0% to "00"', () => {
    expect(percentToHex(0)).toBe('00')
  })

  it('should convert 100% to "FF"', () => {
    expect(percentToHex(100)).toBe('FF')
  })

  it('should convert 50% to "80"', () => {
    expect(percentToHex(50)).toBe('80')
  })

  it('should convert decimal percentages correctly', () => {
    expect(percentToHex(25.5)).toBe('41')
    expect(percentToHex(75.3)).toBe('C0')
  })

  it('should round values correctly', () => {
    expect(percentToHex(49.8)).toBe('7F') // rounds to 127
    expect(percentToHex(50.2)).toBe('80') // rounds to 128
  })

  it('should always return uppercase hex values', () => {
    expect(percentToHex(66.7)).toBe('AA')
    expect(percentToHex(93.3)).toBe('EE')
  })

  it('should pad single digit hex values with leading zero', () => {
    expect(percentToHex(1)).toBe('03')
    expect(percentToHex(5)).toBe('0D')
  })
})

describe('getAllIds', () => {
  it('should return single ID for node without children', () => {
    const datum: DefaultTreeMapDatum = { id: 'root' }
    expect(getAllIds(datum)).toEqual(['root'])
  })

  it('should return all IDs from simple tree with children', () => {
    const datum: DefaultTreeMapDatum = {
      children: [{ id: 'child1' }, { id: 'child2' }],
      id: 'root',
    }
    expect(getAllIds(datum)).toEqual(['root', 'child1', 'child2'])
  })

  it('should return all IDs from nested tree structure', () => {
    const datum: DefaultTreeMapDatum = {
      children: [
        {
          children: [{ id: 'grandchild1' }, { id: 'grandchild2' }],
          id: 'child1',
        },
        { id: 'child2' },
      ],
      id: 'root',
    }
    expect(getAllIds(datum)).toEqual([
      'root',
      'child1',
      'grandchild1',
      'grandchild2',
      'child2',
    ])
  })

  it('should handle deeply nested structures', () => {
    const datum: DefaultTreeMapDatum = {
      children: [
        {
          children: [
            {
              children: [{ id: 'level4' }],
              id: 'level3',
            },
          ],
          id: 'level2',
        },
      ],
      id: 'level1',
    }
    expect(getAllIds(datum)).toEqual(['level1', 'level2', 'level3', 'level4'])
  })

  it('should handle empty children array', () => {
    const datum: DefaultTreeMapDatum = {
      children: [],
      id: 'root',
    }
    expect(getAllIds(datum)).toEqual(['root'])
  })
})

describe('getDataColors', () => {
  const mockTheme = {
    colors: {
      primary: {
        text: '#3B82F6',
      },
    },
  } as Theme

  it('should generate color for single node', () => {
    const data: DefaultTreeMapDatum = { id: 'root' }
    const colors = getDataColors(data, mockTheme)

    expect(colors).toHaveProperty('root')
    expect(colors['root']).toMatch(/^#3B82F6[0-9A-F]{2}$/)
  })

  it('should generate different colors for multiple nodes', () => {
    const data: DefaultTreeMapDatum = {
      children: [{ id: 'child1' }, { id: 'child2' }],
      id: 'root',
    }
    const colors = getDataColors(data, mockTheme)

    expect(Object.keys(colors)).toHaveLength(3)
    expect(colors['root']).not.toBe(colors['child1'])
    expect(colors['child1']).not.toBe(colors['child2'])
  })

  it('should use base color from theme', () => {
    const customTheme = {
      colors: {
        primary: {
          text: '#FF0000',
        },
      },
    } as Theme

    const data: DefaultTreeMapDatum = { id: 'root' }
    const colors = getDataColors(data, customTheme)

    expect(colors['root']).toContain('#FF0000')
  })

  it('should apply graduated opacity based on node order', () => {
    const data: DefaultTreeMapDatum = {
      children: [{ id: 'child1' }],
      id: 'root',
    }
    const colors = getDataColors(data, mockTheme)

    // First node (root) should have highest opacity (100 - 0 = 100 -> 0)
    expect(colors['root']).toBe('#3B82F6FF')
    // Second node (child1) should have next opacity (100 - 1 = 99 -> 99)
    expect(colors['child1']).toBe('#3B82F6FC')
  })

  it('should handle more than 100 nodes using modulo', () => {
    // Create a tree with 102 nodes
    const children: DefaultTreeMapDatum[] = []
    for (let i = 1; i <= 101; i += 1) {
      children.push({ id: `child${i}` })
    }
    const data: DefaultTreeMapDatum = {
      children,
      id: 'root',
    }

    const colors = getDataColors(data, mockTheme)

    expect(Object.keys(colors)).toHaveLength(102)
    // Should cycle back after 100 elements
    // Node at index 100 should have same opacity as node at index 0
    expect(colors['root'].slice(-2)).toBe(colors['child100'].slice(-2))
  })

  it('should generate colors for complex nested structure', () => {
    const data: DefaultTreeMapDatum = {
      children: [
        {
          children: [{ id: 'leaf1' }, { id: 'leaf2' }],
          id: 'branch1',
        },
        {
          children: [{ id: 'leaf3' }],
          id: 'branch2',
        },
      ],
      id: 'root',
    }
    const colors = getDataColors(data, mockTheme)

    expect(Object.keys(colors)).toHaveLength(6)
    expect(colors).toHaveProperty('root')
    expect(colors).toHaveProperty('branch1')
    expect(colors).toHaveProperty('leaf1')
    expect(colors).toHaveProperty('leaf2')
    expect(colors).toHaveProperty('branch2')
    expect(colors).toHaveProperty('leaf3')
  })
})
