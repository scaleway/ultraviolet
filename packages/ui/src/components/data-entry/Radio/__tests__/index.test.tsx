import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Radio } from '..'

describe('radio', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(<Radio label="Choice" name="radio" onChange={() => {}} value="choice" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const { asFragment } = renderWithTheme(
      <Radio disabled label="Choice" name="radio" onChange={() => {}} value="choice" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with tooltip', () => {
    const { asFragment } = renderWithTheme(
      <Radio label="Choice" name="radio" onChange={() => {}} tooltip="test" value="choice" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders without name', () => {
    const { asFragment } = renderWithTheme(<Radio disabled label="Choice" onChange={() => {}} value="choice" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when checked', () => {
    const { asFragment } = renderWithTheme(
      <Radio checked label="Choice" name="radio" onChange={() => {}} value="choice" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when error', () => {
    const { asFragment } = renderWithTheme(
      <Radio error="Invalid value" label="Choice" name="radio" onChange={() => {}} value="choice" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when helper', () => {
    const { asFragment } = renderWithTheme(
      <Radio helper="Helper" label="Choice" name="radio" onChange={() => {}} value="choice" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly small', () => {
    const { asFragment } = renderWithTheme(
      <Radio helper="Helper" label="Choice" name="radio" onChange={() => {}} value="choice" size="small" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
