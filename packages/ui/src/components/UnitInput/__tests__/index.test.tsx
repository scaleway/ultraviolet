import { describe, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UnitInput } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('UnitInput', () => {
  test(`renders with default props`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={[
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
        ]}
      />,
    ))

  test(`renders with min max`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        options={[
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
        ]}
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
        options={[
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
        ]}
      />,
    ))

  test(`renders with size medioum`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        size="medium"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={[
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
        ]}
      />,
    ))

  test(`renders click`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        size="medium"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={[
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
        ]}
      />,
      {
        transform: async () => {
          const select = screen.getByTestId('select-bar')
          await userEvent.click(select)
        },
      },
    ))

  test(`renders with size large`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        size="large"
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={[
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
        ]}
      />,
    ))

  test(`renders with disabled and placeHolder`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={[
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
        ]}
        placeholder="100"
        disabled
      />,
    ))

  test(`renders with success`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={[
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
        ]}
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
        options={[
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
        ]}
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
        options={[
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
        ]}
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
          options={[
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
          ]}
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
          options={[
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
          ]}
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
    await userEvent.click(screen.getByTestId('select-bar'))
    await userEvent.click(screen.getByTestId('option-mb'))
  })

  test(`renders with label and no label information`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        onChange={() => {}}
        onChangeUnitValue={() => {}}
        name="test"
        options={[
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
        ]}
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
        options={[
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
        ]}
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
        options={[
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
        ]}
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
        options={[
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
        ]}
        placeholder="100"
        disabled
        labelInformation="label information"
        value={1}
        unitValue="kb"
      />,
    ))
})
