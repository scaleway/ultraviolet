import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { OptionSelector } from '..'
import { firstSelectorOptions, franceOptions } from '../__mock__/resources'

const value = { first: firstSelectorOptions[0].value }
const valueBoth = {
  first: firstSelectorOptions[0].value,
  second: franceOptions[0].value,
}
const valueSecond = { second: franceOptions[0].value }

describe('optionSelector', () => {
  it('should work with default props', () =>
    shouldMatchSnapshot(
      <OptionSelector
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
      />,
    ))

  it('should work with direction vertical', () =>
    shouldMatchSnapshot(
      <OptionSelector
        direction="vertical"
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
      />,
    ))

  it('should work without hideWhenEmpty', () => {
    const { asFragment } = renderWithTheme(
      <OptionSelector
        direction="vertical"
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
      />,
    )
    const secondSelector = screen.getByTestId('second-selector')
    expect(secondSelector).toBeInTheDocument()
    expect(secondSelector).toHaveAttribute('data-disabled', 'true')

    expect(asFragment).toMatchSnapshot()
  })

  it('should work with hideWhenEmpty', () => {
    const { asFragment } = renderWithTheme(
      <OptionSelector
        direction="vertical"
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        hideWhenEmpty
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
      />,
    )

    expect(screen.queryByTestId('second-selector')).not.toBeInTheDocument()
    expect(asFragment).toMatchSnapshot()
  })

  it('should work with default values', () => {
    const { asFragment } = renderWithTheme(
      <OptionSelector
        firstSelector={{
          error: 'error',
          label: 'Region',
          options: firstSelectorOptions,
        }}
        hideWhenEmpty
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
        value={value}
      />,
    )

    const secondSelector = screen.getByTestId('second-selector')
    expect(secondSelector).toBeInTheDocument()
    expect(asFragment).toMatchSnapshot()
  })

  it('should work with error - first selector', () => {
    const { asFragment } = renderWithTheme(
      <OptionSelector
        firstSelector={{
          error: 'error',
          label: 'Region',
          options: firstSelectorOptions,
        }}
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
        value={value}
      />,
    )

    const secondSelector = screen.getByTestId('second-selector')
    expect(secondSelector).toHaveAttribute('data-disabled', 'true')
    expect(asFragment).toMatchSnapshot()
  })

  it('should work with error - second selector', () => {
    const { asFragment } = renderWithTheme(
      <OptionSelector
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        secondSelector={{
          error: 'error',
          label: 'Zone',
          options: franceOptions,
        }}
        value={valueBoth}
      />,
    )

    expect(asFragment).toMatchSnapshot()
  })

  it('should work with disabled', () =>
    shouldMatchSnapshot(
      <OptionSelector
        disabled
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
      />,
    ))

  it('should work readonly', () =>
    shouldMatchSnapshot(
      <OptionSelector
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        readOnly
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
      />,
    ))

  it('should work with only one option', () => {
    const { asFragment } = renderWithTheme(
      <OptionSelector
        firstSelector={{
          label: 'Region',
          options: [firstSelectorOptions[0]],
        }}
        secondSelector={{
          label: 'Zone',
          options: [franceOptions[0]],
        }}
        value={value}
      />,
    )
    const paris = screen.getByText('PARIS')
    expect(paris).toBeVisible()

    const secondSelector = screen.getByTestId('second-selector')
    const firstSelector = screen.getByTestId('first-selector')

    expect(firstSelector).toHaveAttribute('data-readonly', 'true')
    expect(secondSelector).toBeVisible()
    expect(secondSelector).toHaveAttribute('data-readonly', 'true')
    expect(screen.getAllByText('PAR 1')[0]).toBeVisible()
    expect(asFragment).toMatchSnapshot()
  })

  it('should work onChange - first selector', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <OptionSelector
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
          placeholder: 'placeholder',
        }}
        hideWhenEmpty
        onChange={onChange}
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
        }}
        value={valueSecond}
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)

    expect(screen.queryByTestId('second-selector')).not.toBeInTheDocument()

    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    await userEvent.click(screen.getByTestId('option-pl'))
    expect(dropdown).not.toBeVisible()
    expect(screen.getByText('WARSAW')).toBeVisible()
    expect(onChange).toHaveBeenCalledOnce()
    expect(asFragment).toMatchSnapshot()
  })

  it('should work onChang - second selector', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <OptionSelector
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        onChange={onChange}
        secondSelector={{
          label: 'Zone',
          options: franceOptions,
          placeholder: 'placeholder',
        }}
        value={value}
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)

    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    await userEvent.click(screen.getByTestId('option-par-1'))
    expect(dropdown).not.toBeVisible()
    expect(screen.getAllByText('PAR 1')[0]).toBeVisible()
    expect(onChange).toHaveBeenCalledOnce()
    expect(asFragment).toMatchSnapshot()
  })
})
