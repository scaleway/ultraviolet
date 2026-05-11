import { screen } from '@testing-library/react'
import { renderWithForm } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { ToggleField } from '..'

describe('toggleField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<ToggleField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(<ToggleField disabled name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly checked', () => {
    const { asFragment } = renderWithForm(<ToggleField name="test" />, {
      defaultValues: {
        test: true,
      },
    })
    const element = screen.getByRole<HTMLInputElement>('checkbox')
    expect(element.checked).toBe(true)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with label and checked', () => {
    const { asFragment } = renderWithForm(<ToggleField label="test" name="test" />, {
      defaultValues: {
        test: true,
      },
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
