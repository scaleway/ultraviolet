import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ToggleField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('toggleField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm({ children: <ToggleField name="test" /> })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm({ children: <ToggleField disabled name="test" /> })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly checked', () => {
    const { asFragment } = renderWithForm({
      children: <ToggleField name="test" />,
      useFormProps: {
        defaultValues: {
          test: true,
        },
      },
    })
    const element = screen.getByRole<HTMLInputElement>('checkbox')
    expect(element.checked).toBe(true)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with label and checked', () => {
    const { asFragment } = renderWithForm({
      children: <ToggleField label="test" name="test" />,
      useFormProps: {
        defaultValues: {
          test: true,
        },
      },
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
