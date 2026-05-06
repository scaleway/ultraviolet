import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it } from 'vitest'

import { UnitInput } from '..'

const options = [
  {
    label: 'KB',
    value: 'kb',
  },
  {
    label: 'MB',
    value: 'mb',
  },
  {
    label: 'GB',
    value: 'gb',
  },
]
describe('unitInput', () => {
  it('renders with default props', () =>
    shouldMatchSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
      />,
    ))

  it('renders with min max', () =>
    shouldMatchSnapshot(
      <UnitInput
        max={100}
        min={10}
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
      />,
    ))
  it('renders with size small', () =>
    shouldMatchSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        size="small"
      />,
    ))

  it('renders with size medioum', () =>
    shouldMatchSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        size="medium"
      />,
    ))

  it('renders click', async () => {
    const { asFragment } = renderWithTheme(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        size="medium"
      />,
    )

    const select = screen.getByTestId('select-input-test-unit')
    await userEvent.click(select)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with size large', () =>
    shouldMatchSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        size="large"
      />,
    ))

  it('renders with disabled and placeHolder', () =>
    shouldMatchSnapshot(
      <UnitInput
        disabled
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))

  it('renders with dropdownAlign center', () =>
    shouldMatchSnapshot(
      <UnitInput
        dropdownAlign="center"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))

  it('renders with success', () =>
    shouldMatchSnapshot(
      <UnitInput
        helper="text"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
        success
      />,
    ))

  it('renders with error', () =>
    shouldMatchSnapshot(
      <UnitInput
        error="error"
        helper="test"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))
  it('renders with error  and success', () =>
    shouldMatchSnapshot(
      <UnitInput
        error
        helper="helper"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
        success="success"
      />,
    ))

  it('handles writing in input', async () => {
    renderWithTheme(
      <div>
        <UnitInput
          error
          helper="test"
          id="test"
          max={30}
          min={2}
          name="test"
          onChange={() => {}}
          onChangeUnitValue={() => {}}
          options={options}
          placeholder="100"
        />
        <button data-testid="test" type="button">
          button
        </button>
      </div>,
    )
    await userEvent.click(screen.getByTestId('unit-input'))
    await userEvent.keyboard('1')
    await userEvent.click(screen.getByTestId('test'))
    await userEvent.click(screen.getByTestId('unit-input'))
    await userEvent.keyboard('0')
    await userEvent.click(screen.getByTestId('test'))
    await userEvent.click(screen.getByTestId('unit-input'))
    await userEvent.keyboard('100')
    await userEvent.click(screen.getByTestId('test'))
  })

  it('handles selectintg input', async () => {
    renderWithTheme(
      <div>
        <UnitInput
          error
          helper="test"
          id="test"
          max={30}
          min={2}
          name="test"
          onChange={() => {}}
          onChangeUnitValue={() => {}}
          options={options}
          placeholder="100"
        />
        <button data-testid="test" type="button">
          button
        </button>
      </div>,
    )
    await userEvent.click(screen.getByTestId('select-input-test-unit'))
    await userEvent.click(screen.getByTestId('option-mb'))
  })

  it('renders with label and no label information', () =>
    shouldMatchSnapshot(
      <UnitInput
        disabled
        label="label"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))
  it('renders with label and label information', () =>
    shouldMatchSnapshot(
      <UnitInput
        disabled
        label="label"
        labelInformation="label information"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))
  it('renders with no label and label information', () =>
    shouldMatchSnapshot(
      <UnitInput
        disabled
        labelInformation="label information"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))

  it('renders with default value', () =>
    shouldMatchSnapshot(
      <UnitInput
        disabled
        labelInformation="label information"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
        unitValue="kb"
        value={1}
      />,
    ))
})
