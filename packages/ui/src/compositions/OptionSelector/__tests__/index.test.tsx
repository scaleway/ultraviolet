import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { OptionSelector } from '..'
import { renderWithTheme } from '../../../__tests__/helpers'
import { firstSelectorOptions, franceOptions } from '../__mock__/resources'

const value = { first: firstSelectorOptions[0].value }
const valueBoth = {
  first: firstSelectorOptions[0].value,
  second: franceOptions[0].value,
}
const valueSecond = { second: franceOptions[0].value }

describe('optionSelector', () => {
  it('should work with default props', () => {
    const { asFragment } = renderWithTheme(
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
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with direction vertical', () => {
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

    expect(asFragment()).toMatchSnapshot()
  })

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
    const secondSelector = screen.getByRole('combobox', { name: 'Zone' })
    expect(secondSelector).toBeInTheDocument()
    expect(secondSelector).toHaveAttribute('aria-disabled', 'true')

    expect(asFragment()).toMatchSnapshot()
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

    expect(screen.queryByRole('combobox', { name: 'Zone' })).not.toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
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

    const secondSelector = screen.getAllByRole('combobox')[1]
    expect(secondSelector).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
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

    const secondSelector = screen.getAllByRole('combobox')[1]
    expect(secondSelector).toHaveAttribute('aria-disabled', 'true')
    expect(asFragment()).toMatchSnapshot()
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

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with disabled', () => {
    const { asFragment } = renderWithTheme(
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
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work readonly', () => {
    const { asFragment } = renderWithTheme(
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
    )

    expect(asFragment()).toMatchSnapshot()
  })

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

    const [firstSelector, secondSelector] = screen.getAllByRole('combobox')

    expect(firstSelector).toHaveAttribute('aria-readonly', 'true')
    expect(secondSelector).toBeVisible()
    expect(secondSelector).toHaveAttribute('aria-readonly', 'true')
    expect(screen.getAllByText('PAR 1')[0]).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
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

    expect(screen.getAllByRole('combobox')).toHaveLength(1)

    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    await userEvent.click(screen.getByRole('option', { name: 'WARSAW' }))
    expect(dropdown).not.toBeVisible()
    expect(screen.getByText('WARSAW')).toBeVisible()
    expect(onChange).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
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

    await userEvent.click(screen.getByRole('option', { name: /^PAR 1/v }))
    expect(dropdown).not.toBeVisible()
    expect(screen.getAllByText('PAR 1')[0]).toBeVisible()
    expect(onChange).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })
})
