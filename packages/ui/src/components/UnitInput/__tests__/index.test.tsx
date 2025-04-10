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
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
      />,
    ))

  test(`renders with min max`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={options}
        min={10}
        max={100}
      />,
    ))
  test(`renders with size small`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        size="small"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
      />,
    ))

  test(`renders with size medioum`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        size="medium"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
      />,
    ))

  test(`renders click`, async () => {
    const { asFragment } = renderWithTheme(
      <UnitInput
        size="medium"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
      />,
    )

    const select = screen.getByTestId('select-input-test-unit')
    await userEvent.click(select)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders with size large`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        size="large"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
      />,
    ))

  test(`renders with disabled and placeHolder`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        disabled
      />,
    ))

  test(`renders with dropdownAlign center`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        dropdownAlign="center"
      />,
    ))

  test(`renders with success`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        success
        helper="text"
      />,
    ))

  test(`renders with error`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        error="error"
        helper="test"
      />,
    ))
  test(`renders with error  and success`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        error
        helper="helper"
        success="success"
      />,
    ))

  test('handles writing in input', async () => {
    renderWithTheme(
      <div>
        <UnitInput
          onChange={() => {}}
          onChangeUnitValue={() => {}}
          name="test"
          max={30}
          min={2}
          options={options}
          placeholder="100"
          error
          helper="test"
          id="test"
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
          onChange={() => {}}
          onChangeUnitValue={() => {}}
          name="test"
          max={30}
          min={2}
          options={options}
          placeholder="100"
          error
          helper="test"
          id="test"
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
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        disabled
        label="label"
      />,
    ))
  test(`renders with label and label information`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        disabled
        label="label"
        labelInformation="label information"
      />,
    ))
  test(`renders with no label and label information`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        disabled
        labelInformation="label information"
      />,
    ))

  test(`renders with default value`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={options}
        placeholder="100"
        disabled
        labelInformation="label information"
        value={1}
        unitValue="kb"
      />,
    ))
})
