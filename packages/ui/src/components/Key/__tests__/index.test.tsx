import { screen } from '@testing-library/react'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { KEYS_MATCH } from '../constants'
import { Key } from '../index'

describe('key', () => {
  it('renders correctly', () => shouldMatchSnapshot(<Key>A</Key>))
  it('renders primary', () => shouldMatchSnapshot(<Key sentiment="primary">A</Key>))
  it('renders strong', () =>
    shouldMatchSnapshot(
      <Key prominence="strong" sentiment="neutral">
        A
      </Key>,
    ))
  it('renders strong primary', () =>
    shouldMatchSnapshot(
      <Key prominence="strong" sentiment="primary">
        A
      </Key>,
    ))

  it('renders disabled', () =>
    shouldMatchSnapshot(
      <Key disabled sentiment="neutral">
        A
      </Key>,
    ))

  it('renders disabled primary', () =>
    shouldMatchSnapshot(
      <Key disabled sentiment="primary">
        A
      </Key>,
    ))

  it('renders disabled strong', () =>
    shouldMatchSnapshot(
      <Key disabled prominence="strong" sentiment="neutral">
        A
      </Key>,
    ))

  it('renders disabled strong primary', () =>
    shouldMatchSnapshot(
      <Key disabled prominence="strong" sentiment="primary">
        A
      </Key>,
    ))

  it('renders small', () => shouldMatchSnapshot(<Key size="small">A</Key>))

  it.each(Object.keys(KEYS_MATCH))(`renders with special key %s`, key => {
    renderWithTheme(<Key data-testid="key">{key}</Key>)

    const element = screen.getByTestId('key')
    expect(element.textContent).toBe(KEYS_MATCH[key as keyof typeof KEYS_MATCH])
  })
})
