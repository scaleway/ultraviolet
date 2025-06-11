import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { getUUID } from '../ids'
import {
  isFuzzyMatch,
  levenshteinDistance,
  normalizeString,
} from '../searchAlgorithm'

describe('ids', () => {
  describe('getUUID', () => {
    beforeEach(() => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
    })

    afterEach(() => {
      vi.spyOn(global.Math, 'random').mockRestore()
    })

    test('returns correctly without arguments', () => {
      expect(getUUID()).toMatchSnapshot()
    })

    test('returns correctly with a prefix', () => {
      expect(getUUID('ah')).toMatchSnapshot()
    })
  })
})

describe('fuzzySearch', () => {
  describe('normalizeString', () => {
    test('returns correct string', () => {
      expect(normalizeString('île-de-France')).toBe('ile de france')
    })
  })

  describe('levenshteinDistance', () => {
    test('returns correct lenvenshtein distance', () => {
      expect(levenshteinDistance('test', 'test')).toBe(0)

      expect(levenshteinDistance('tests', 'test')).toBe(1)
      expect(levenshteinDistance('test', 'tests')).toBe(1)

      expect(levenshteinDistance('tset', 'test')).toBe(2)

      expect(levenshteinDistance('hello', 'test')).toBe(4)

      expect(levenshteinDistance('', 'test')).toBe(4)
      expect(levenshteinDistance('test', '0')).toBe(4)
    })
  })
  describe('fuzzySearch', () => {
    test('with default distance (1)', () => {
      expect(isFuzzyMatch('test', 'test')).toBeTruthy()
      expect(isFuzzyMatch('tests', 'test')).toBeFalsy()
      expect(isFuzzyMatch('test', 'tests')).toBeTruthy()
      expect(isFuzzyMatch('tset', 'test')).toBeFalsy()
      expect(isFuzzyMatch('hello', 'test')).toBeFalsy()
      expect(isFuzzyMatch('', 'test')).toBeTruthy()
    })

    test('with distance = 0 (exact match)', () => {
      expect(isFuzzyMatch('test', 'test', 0)).toBeTruthy()
      expect(isFuzzyMatch('tests', 'test', 0)).toBeFalsy()
      expect(isFuzzyMatch('test', 'tests', 0)).toBeTruthy()
      expect(isFuzzyMatch('tset', 'test', 0)).toBeFalsy()
      expect(isFuzzyMatch('hello', 'test', 0)).toBeFalsy()
      expect(isFuzzyMatch('', 'test')).toBeTruthy()
    })

    test('with distance = 2 (swap tolerant)', () => {
      expect(isFuzzyMatch('test', 'test', 2)).toBeTruthy()
      expect(isFuzzyMatch('tests', 'test', 2)).toBeFalsy()
      expect(isFuzzyMatch('test', 'tests', 2)).toBeTruthy()
      expect(isFuzzyMatch('tset', 'test', 2)).toBeTruthy()
      expect(isFuzzyMatch('hello', 'test', 2)).toBeFalsy()
      expect(isFuzzyMatch('', 'test')).toBeTruthy()
    })
  })
})
