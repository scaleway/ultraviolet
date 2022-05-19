import { CSSObject } from '@emotion/react'
import userEvent from '@testing-library/user-event'
import RichSelect from '..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../helpers/jestHelpers'

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

describe('RichSelect', () => {
  test('renders correctly uncontrolled', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="uncontrolled">
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
      {
        transform: node => {
          const input = node.getByRole('combobox')
          userEvent.click(input)
        },
      },
    ))

  test('renders correctly with custom styles', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="uncontrolled"
        customStyle={() => customStyles}
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('renders correctly controlled', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="controlled"
        value="test"
        onChange={() => {}}
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="disabled" disabled>
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('renders correctly required', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="required" required>
        <RichSelect.Option value="11">11:00</RichSelect.Option>
        <RichSelect.Option value="12">12:00</RichSelect.Option>
      </RichSelect>,
    ))
  test('renders correctly timed', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="time" time>
        <RichSelect.Option value="11">11:00</RichSelect.Option>
        <RichSelect.Option value="12">12:00</RichSelect.Option>
      </RichSelect>,
    ))
  test('renders correctly timed with error', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="time-error"
        time
        error="Test error"
      >
        <RichSelect.Option value="11">11:00</RichSelect.Option>
        <RichSelect.Option value="12">12:00</RichSelect.Option>
      </RichSelect>,
    ))

  test('renders correctly with click', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="test">
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
      {
        transform: node => {
          const input = node.getByRole('combobox')
          userEvent.click(input)
        },
      },
    ))

  test('renders correctly with click and option disabled', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="test">
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
        <RichSelect.Option value="c" disabled>
          Option C
        </RichSelect.Option>
      </RichSelect>,
      {
        transform: node => {
          const input = node.getByRole('combobox')
          userEvent.click(input)
        },
      },
    ))

  test('renders correctly with click and options', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="test">
        <RichSelect.Option value="a" isFocused>
          Option A
        </RichSelect.Option>
        <RichSelect.Option value="b" isSelected>
          Option B
        </RichSelect.Option>
        <RichSelect.Option value="c" disabled>
          Option C
        </RichSelect.Option>
      </RichSelect>,
      {
        transform: node => {
          const input = node.getByRole('combobox')
          userEvent.click(input)
        },
      },
    ))
  test('renders correctly disabled with click', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="test" disabled>
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))
  test('renders correctly default values with click', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="test" value="a">
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
      {
        transform: node => {
          const input = node.getByRole('combobox')
          userEvent.click(input)
        },
      },
    ))

  test('renders correctly animated', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="animated"
        animationOnChange
        animation="pulse"
        animationDuration={1000}
        value="a"
        onChange={() => {}}
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))
  test('renders correctly multi', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="multi" isMulti>
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
        <RichSelect.Option value="c">Option C</RichSelect.Option>
        <RichSelect.Option value="d">Option D</RichSelect.Option>
        <RichSelect.Option value="e">Option E</RichSelect.Option>
        <RichSelect.Option value="f">Option F</RichSelect.Option>
      </RichSelect>,
    ))
  test('renders correctly multi disabled', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="multi-disabled"
        value={{ label: 'Option A', value: 'a' }}
        isMulti
        disabled
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('should render correctly multi isClearable', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isClearable
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('should render correctly multi isClearable disabled', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isClearable
        disabled
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))
  test('should render correctly multi isSearchable', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isSearchable
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('should render correctly multi isSearchable disabled', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="loading"
        value={{ label: 'Option A', value: 'a' }}
        isSearchable
        disabled
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('should render correctly isLoading', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="loading" isLoading>
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))

  test('should render correctly with portal', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <>
        <RichSelect
          inputId="test"
          labelId="test-label"
          name="test"
          menuPortalTarget={document.getElementById('test-portal')}
        >
          <RichSelect.Option value="a">Option A</RichSelect.Option>
          <RichSelect.Option value="b">Option B</RichSelect.Option>
        </RichSelect>
        <div id="test-portal" />
      </>,
    ))

  test('should render correctly without children', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <RichSelect inputId="test" labelId="test-label" name="test" />,
    ))
  test('should render correctly custom isLoading', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect
        inputId="test"
        labelId="test-label"
        name="test-loading"
        isLoading
        customComponents={{
          LoadingIndicator: () => <div>Loading...</div>,
        }}
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>,
    ))
  test('should render correctly description and inlineDescription', () =>
    shouldMatchEmotionSnapshot(
      <RichSelect inputId="test" labelId="test-label" name="test-loading">
        <RichSelect.Option
          value="a"
          inlineDescription="This is an inline description"
        >
          Option A
        </RichSelect.Option>
        <RichSelect.Option value="b" description="This is a description">
          Option B
        </RichSelect.Option>
      </RichSelect>,
    ))
})
