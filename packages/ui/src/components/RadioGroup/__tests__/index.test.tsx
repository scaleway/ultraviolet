import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { RadioGroup } from '..'

describe('radioGroup', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <RadioGroup legend="Label" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with direction row', () => {
    const { asFragment } = renderWithTheme(
      <RadioGroup direction="row" legend="Label" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with helper content', () => {
    const { asFragment } = renderWithTheme(
      <RadioGroup helper="Helper content" legend="Label" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with error content', () => {
    const { asFragment } = renderWithTheme(
      <RadioGroup error="Eror content" legend="Label" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with size small', () => {
    const { asFragment } = renderWithTheme(
      <RadioGroup error="Eror content" legend="Label" name="radio" onChange={() => {}} value="value-1" size="small">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('throws if RadioGroup.Radio used without RadioGroup', () => {
    expect(() => renderWithTheme(<RadioGroup.Radio label="Radio 1" value="value-1" />)).toThrow(
      'RadioGroup.Radio can only be used inside a RadioGroup',
    )
  })
})
