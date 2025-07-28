import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
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
describe('UnitInput', () => {
  test(`renders with default props`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
      />,
    ))

  test(`renders with min max`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        max={100}
        min={10}
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
      />,
    ))
  test(`renders with size small`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        size="small"
      />,
    ))

  test(`renders with size medioum`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        size="medium"
      />,
    ))

  test(`renders click`, async () => {
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

  test(`renders with size large`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        size="large"
      />,
    ))

  test(`renders with disabled and placeHolder`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        disabled
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))

  test(`renders with dropdownAlign center`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        dropdownAlign="center"
        name="test"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        placeholder="100"
      />,
    ))

  test(`renders with success`, () =>
    shouldMatchEmotionSnapshot(
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

  test(`renders with error`, () =>
    shouldMatchEmotionSnapshot(
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
  test(`renders with error  and success`, () =>
    shouldMatchEmotionSnapshot(
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

  test('handles writing in input', async () => {
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

  test('handles selectintg input', async () => {
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

  test(`renders with label and no label information`, () =>
    shouldMatchEmotionSnapshot(
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
  test(`renders with label and label information`, () =>
    shouldMatchEmotionSnapshot(
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
  test(`renders with no label and label information`, () =>
    shouldMatchEmotionSnapshot(
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

  test(`renders with default value`, () =>
    shouldMatchEmotionSnapshot(
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
