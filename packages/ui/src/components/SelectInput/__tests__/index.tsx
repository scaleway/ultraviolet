import type { CSSObject } from '@emotion/react'
import userEvent from '@testing-library/user-event'
import { SelectInput } from '..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../../.jest/helpers'

const customStyles: Record<string, CSSObject> = {
  control: {},
  indicatorsContainer: {},
  indicatorSeparator: {},
  menu: {},
  menuList: {},
  menuPortal: {},
  multiValue: {},
  multiValueLabel: {},
  multiValueRemove: {},
  option: {},
  placeholder: {},
  singleValue: {},
  valueContainer: {},
}

describe('SelectInput', () => {
  test('renders correctly uncontrolled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="uncontrolled">
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
      {
        transform: async node => {
          const input = node.getByRole('combobox')
          await userEvent.click(input)
        },
      },
    ))

  test('renders correctly with emptyState', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="emptyState"
        emptyState={() => 'test'}
      />,
      {
        transform: async node => {
          const input = node.getByRole('combobox')
          await userEvent.click(input)
        },
      },
    ))

  test('renders correctly with custom styles', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="uncontrolled"
        customStyle={() => customStyles}
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('renders correctly controlled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="controlled"
        value="test"
        onChange={() => {}}
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="disabled" disabled>
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('renders correctly required', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="required" required>
        <SelectInput.Option value="11">11:00</SelectInput.Option>
        <SelectInput.Option value="12">12:00</SelectInput.Option>
      </SelectInput>,
    ))
  test('renders correctly timed', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="time" time>
        <SelectInput.Option value="11">11:00</SelectInput.Option>
        <SelectInput.Option value="12">12:00</SelectInput.Option>
      </SelectInput>,
    ))
  test('renders correctly timed with error', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="time-error"
        time
        error="Test error"
      >
        <SelectInput.Option value="11">11:00</SelectInput.Option>
        <SelectInput.Option value="12">12:00</SelectInput.Option>
      </SelectInput>,
    ))

  test('renders correctly with click', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="test">
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
      {
        transform: async node => {
          const input = node.getByRole('combobox')
          await userEvent.click(input)
        },
      },
    ))

  test('renders correctly with click and option disabled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="test">
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
        <SelectInput.Option value="c" disabled>
          Option C
        </SelectInput.Option>
      </SelectInput>,
      {
        transform: async node => {
          const input = node.getByRole('combobox')
          await userEvent.click(input)
        },
      },
    ))

  test('renders correctly with click and options', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="test">
        <SelectInput.Option value="a" isFocused>
          Option A
        </SelectInput.Option>
        <SelectInput.Option value="b" isSelected>
          Option B
        </SelectInput.Option>
        <SelectInput.Option value="c" disabled>
          Option C
        </SelectInput.Option>
      </SelectInput>,
      {
        transform: async node => {
          const input = node.getByRole('combobox')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly disabled with click', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="test" disabled>
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))
  test('renders correctly default values with click', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="test" value="a">
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
      {
        transform: async node => {
          const input = node.getByRole('combobox')
          await userEvent.click(input)
        },
      },
    ))

  test('renders correctly animated', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="animated"
        animationOnChange
        animation="pulse"
        animationDuration={1000}
        value="a"
        onChange={() => {}}
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))
  test('renders correctly multi', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="multi" isMulti>
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
        <SelectInput.Option value="c">Option C</SelectInput.Option>
        <SelectInput.Option value="d">Option D</SelectInput.Option>
        <SelectInput.Option value="e">Option E</SelectInput.Option>
        <SelectInput.Option value="f">Option F</SelectInput.Option>
      </SelectInput>,
    ))
  test('renders correctly multi disabled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="multi-disabled"
        value={{ label: 'Option A', value: 'a' }}
        isMulti
        disabled
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('should render correctly multi isClearable', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isClearable
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('should render correctly multi isClearable disabled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isClearable
        disabled
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))
  test('should render correctly multi isSearchable', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isSearchable
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('should render correctly multi isSearchable disabled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isSearchable
        disabled
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('should render correctly isLoading', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="loading" isLoading>
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))

  test('should render correctly with portal', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <>
        <SelectInput
          inputId="test"
          labelId="test-label"
          name="test"
          menuPortalTarget={document.getElementById('test-portal')}
        >
          <SelectInput.Option value="a">Option A</SelectInput.Option>
          <SelectInput.Option value="b">Option B</SelectInput.Option>
        </SelectInput>
        <div id="test-portal" />
      </>,
    ))

  test('should render correctly without children', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <SelectInput inputId="test" labelId="test-label" name="test" />,
    ))
  test('should render correctly custom isLoading', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput
        inputId="test"
        labelId="test-label"
        name="test-loading"
        isLoading
        customComponents={{
          LoadingIndicator: () => <div>Loading...</div>,
        }}
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        <SelectInput.Option value="b">Option B</SelectInput.Option>
      </SelectInput>,
    ))
  test('should render correctly description and inlineDescription', () =>
    shouldMatchEmotionSnapshot(
      <SelectInput inputId="test" labelId="test-label" name="test-loading">
        <SelectInput.Option
          value="a"
          inlineDescription="This is an inline description"
        >
          Option A
        </SelectInput.Option>
        <SelectInput.Option value="b" description="This is a description">
          Option B
        </SelectInput.Option>
      </SelectInput>,
    ))
})
