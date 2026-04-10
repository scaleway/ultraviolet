import { describe, expect, test } from 'vitest'

import {
  formatPhoneNumber,
  parsePhoneValue,
  validatePhoneNumber,
} from '../helpers'

describe('phoneInput helpers', () => {
  describe(parsePhoneValue, () => {
    test('should parse valid French phone number', () => {
      const result = parsePhoneValue('+33612345678', 'FR')

      expect(result.valid).toBeTruthy()
      expect(result.country).toBe('FR')
      expect(result.e164).toBe('+33612345678')
      expect(result.international).toBe('+33 6 12 34 56 78')
      expect(result.national).toBe('06 12 34 56 78')
    })

    test('should parse US phone number', () => {
      const result = parsePhoneValue('+14155551234', 'US')

      expect(result.valid).toBeTruthy()
      expect(result.country).toBe('US')
      expect(result.e164).toBe('+14155551234')
    })

    test('should handle invalid phone number', () => {
      const result = parsePhoneValue('invalid', 'FR')

      expect(result.valid).toBeFalsy()
      expect(result.country).toBe('FR')
      expect(result.e164).toBeNull()
      expect(result.formatted).toBe('invalid')
    })

    test('should handle 10-digit French number without country code', () => {
      const result = parsePhoneValue('0612345678', 'FR')

      expect(result.valid).toBeTruthy()
      expect(result.country).toBe('FR')
    })

    test('should return input value when parsing fails', () => {
      const result = parsePhoneValue('', 'FR')

      expect(result.valid).toBeFalsy()
      expect(result.formatted).toBe('')
    })
  })

  describe(formatPhoneNumber, () => {
    test('should format phone number in international format', () => {
      const result = formatPhoneNumber('+33612345678', {
        format: 'international',
      })

      expect(result).toBe('+33 6 12 34 56 78')
    })

    test('should format phone number in national format', () => {
      const result = formatPhoneNumber('+33612345678', {
        format: 'national',
      })

      expect(result).toBe('06 12 34 56 78')
    })

    test('should format phone number in e164 format', () => {
      const result = formatPhoneNumber('+33612345678', {
        format: 'e164',
      })

      expect(result).toBe('+33612345678')
    })

    test('should default to international format', () => {
      const result = formatPhoneNumber('+33612345678')

      expect(result).toBe('+33 6 12 34 56 78')
    })

    test('should return original value if formatting fails', () => {
      const result = formatPhoneNumber('invalid')

      expect(result).toBe('invalid')
    })
  })

  describe(validatePhoneNumber, () => {
    test('should validate correct French phone number', () => {
      const result = validatePhoneNumber('+33612345678', { regionCode: 'FR' })

      expect(result).toBeTruthy()
    })

    test('should validate correct US phone number', () => {
      const result = validatePhoneNumber('+14155551234', { regionCode: 'US' })

      expect(result).toBeTruthy()
    })

    test('should reject invalid phone number', () => {
      const result = validatePhoneNumber('invalid')

      expect(result).toBeFalsy()
    })

    test('should reject incomplete phone number', () => {
      const result = validatePhoneNumber('+336')

      expect(result).toBeFalsy()
    })

    test('should validate without region code', () => {
      const result = validatePhoneNumber('+33612345678')

      expect(result).toBeTruthy()
    })
  })
})
