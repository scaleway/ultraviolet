import { screen } from '@testing-library/react'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { KEYS_MATCH } from '../constants'
import { Key } from '../index'

describe('key', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Key>A</Key>))
  test('renders primary', () =>
    shouldMatchEmotionSnapshot(<Key sentiment="primary">A</Key>))
  test('renders strong', () =>
    shouldMatchEmotionSnapshot(
      <Key prominence="strong" sentiment="neutral">
        A
      </Key>,
    ))
  test('renders strong primary', () =>
    shouldMatchEmotionSnapshot(
      <Key prominence="strong" sentiment="primary">
        A
      </Key>,
    ))

  test('renders disabled', () =>
    shouldMatchEmotionSnapshot(
      <Key disabled sentiment="neutral">
        A
      </Key>,
    ))

  test('renders disabled primary', () =>
    shouldMatchEmotionSnapshot(
      <Key disabled sentiment="primary">
        A
      </Key>,
    ))

  test('renders disabled strong', () =>
    shouldMatchEmotionSnapshot(
      <Key disabled prominence="strong" sentiment="neutral">
        A
      </Key>,
    ))

  test('renders disabled strong primary', () =>
    shouldMatchEmotionSnapshot(
      <Key disabled prominence="strong" sentiment="primary">
        A
      </Key>,
    ))

  test('renders small', () =>
    shouldMatchEmotionSnapshot(<Key size="small">A</Key>))

  Object.keys(KEYS_MATCH).map(key =>
    test(`renders with special key ${key}`, () => {
      renderWithTheme(<Key data-testid="key">{key}</Key>)

      const element = screen.getByTestId('key')
      expect(element.textContent).toBe(
        KEYS_MATCH[key as keyof typeof KEYS_MATCH],
      )
    }),
  )
})
