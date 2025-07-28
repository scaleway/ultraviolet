import { screen } from '@testing-library/react'
import { renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { ToggleField } from '..'

describe('ToggleField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<ToggleField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(<ToggleField disabled name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(<ToggleField name="test" />, {
      defaultValues: {
        test: true,
      },
    })
    const element = screen.getByRole<HTMLInputElement>('checkbox')
    expect(element.checked).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with label and checked', () => {
    const { asFragment } = renderWithForm(
      <ToggleField label="test" name="test" />,
      {
        defaultValues: {
          test: true,
        },
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
