import { screen } from '@testing-library/react'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { KEYS_MATCH } from '../constants'
import { Key } from '../index'

describe('key', () => {
  test('renders correctly', () => shouldMatchSnapshot(<Key>A</Key>))
  test('renders primary', () =>
    shouldMatchSnapshot(<Key sentiment="primary">A</Key>))
  test('renders strong', () =>
    shouldMatchSnapshot(
      <Key prominence="strong" sentiment="neutral">
        A
      </Key>,
    ))
  test('renders strong primary', () =>
    shouldMatchSnapshot(
      <Key prominence="strong" sentiment="primary">
        A
      </Key>,
    ))

  test('renders disabled', () =>
    shouldMatchSnapshot(
      <Key disabled sentiment="neutral">
        A
      </Key>,
    ))

  test('renders disabled primary', () =>
    shouldMatchSnapshot(
      <Key disabled sentiment="primary">
        A
      </Key>,
    ))

  test('renders disabled strong', () =>
    shouldMatchSnapshot(
      <Key disabled prominence="strong" sentiment="neutral">
        A
      </Key>,
    ))

  test('renders disabled strong primary', () =>
    shouldMatchSnapshot(
      <Key disabled prominence="strong" sentiment="primary">
        A
      </Key>,
    ))

  test('renders small', () => shouldMatchSnapshot(<Key size="small">A</Key>))

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
