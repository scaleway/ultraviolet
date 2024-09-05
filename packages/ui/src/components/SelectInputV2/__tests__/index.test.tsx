import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import type { ReactNode } from 'react'
import { act } from 'react'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'
import { SelectInputV2 } from '..'
import { OptionalInfo, cities, dataGrouped, dataUnGrouped } from './resources'

export type OptionType = {
  value: string
  label: ReactNode
  disabled: boolean
  description?: string
  optionalInfo?: ReactNode
}

describe('SelectInputV2', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    })
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {})
  })

  test('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2 name="test" options={dataUnGrouped} label="label" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly small', () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        label="label"
        size="small"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with tooltip', () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        label="label"
        tooltip="tooltip"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly required', () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        label="label"
        required
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly not clearable', () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        clearable={false}
        searchable={false}
        value={dataUnGrouped[4].value}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly ungrouped', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly grouped', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with default value', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
      />,
    )
    const input = screen.getByText('Pluto')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with footer', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
        footer="this is a footer"
      />,
    )
    const input = screen.getByText('Pluto')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly multiselect', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={[dataGrouped['terrestrial planets'][4].value]}
        multiselect
      />,
    )
    const input = screen.getByText('Pluto')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with label on the right and optional info on the left', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        descriptionDirection="row"
        onChange={() => {}}
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with label on the right and optional info on the right', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        descriptionDirection="row"
        optionalInfoPlacement="right"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with label on the bottom and optional info on the left', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        descriptionDirection="column"
        optionalInfoPlacement="left"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with label on the bottom and optional info on the right', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        descriptionDirection="column"
        optionalInfoPlacement="right"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly loadMore', () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={cities}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        clearable={false}
        searchable={false}
        loadMore="LoadMore"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with emptyState', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="emptystate"
        options={{}}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        emptyState="no option"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        disabled
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly required', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        required
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly readOnly', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        readOnly
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        error="error"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with success', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        success="success"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with not searchable', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles correctly dropdown with clicks - grouped', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()

    await userEvent.click(input)
    await userEvent.click(input)
    expect(dropdown).not.toBeInTheDocument()
  })

  test('handles correctly dropdown with clicks - ungrouped', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
        size="medium"
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()

    await userEvent.click(input)
    await userEvent.click(input)
    expect(dropdown).not.toBeInTheDocument()
  })

  test('handles correctly closable tags', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
        value={[dataUnGrouped[1].value]}
        onChange={() => {}}
      />,
    )
    const venusCloseButton = screen.getByTestId('close-tag')
    const venus = screen.getByText('Venus')
    await userEvent.click(venusCloseButton)
    expect(venus).not.toBeVisible()
  })
  test('renders correctly unclosable tags when readonly', () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        readOnly
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
        value={[dataUnGrouped[1].value]}
        onChange={() => {}}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles correctly dropdown with arrow down/up key press with ungrouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.tab()
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard('[arrowDown]')
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[arrowUp]')
    const mercury = screen.getByRole('option', {
      name: /mercury/i,
    })
    expect(mercury).toHaveFocus()
  })
  test('handles correctly dropdown with arrow pressing enter or space', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.tab()
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard(' ')
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
  })
  test('handles correctly dropdown with arrow down/up key press with grouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.tab()
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard('[arrowDown]')
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    await userEvent.tab()
    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[arrowUp]')
    const mercury = screen.getByRole('option', {
      name: /mercury/i,
    })
    expect(mercury).toHaveFocus()
  })

  test('handles correctly clear all', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        value={dataUnGrouped[4].value}
      />,
    )
    const clearAll = screen.getByTestId('clear-all')
    await userEvent.click(clearAll)
    expect(clearAll).not.toBeInTheDocument()
  })

  test('handles click autoclose when outside click', async () => {
    renderWithTheme(
      <>
        Test outside element
        <SelectInputV2
          name="test"
          options={dataUnGrouped}
          placeholder="placeholder"
          placeholderSearch="placeholdersearch"
        />
      </>,
    )
    const input = screen.getByTestId('select-input-test')

    act(() => input.click())
    const dropdown = screen.getByRole('dialog')
    const outsideClick = screen.getByText('Test outside element')

    expect(dropdown).toBeVisible()
    await userEvent.click(outsideClick)
    await userEvent.click(outsideClick)

    expect(dropdown).not.toBeVisible()
  })
  test('handles click on item', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        onChange={onChange}
      />,
    )
    const input = screen.getByTestId('select-input-test')

    act(() => input.click())
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByText('Venus')

    expect(dropdown).toBeVisible()
    await userEvent.click(venus)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('handles keydown when not searchable on ungrouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByRole('option', {
      name: /venus/i,
    })
    await userEvent.type(dropdown, 'v')
    expect(venus).toHaveFocus()
    await userEvent.type(dropdown, 'a')
  })

  test('handles keydown when not searchable on grouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        size="medium"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByRole('option', {
      name: /venus/i,
    })
    await userEvent.type(dropdown, 'v')
    expect(venus).toHaveFocus()
    await userEvent.type(dropdown, 'a')
  })

  test('renders with onChange', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        onChange={(values: (string | undefined)[]) => values}
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByText('Earth')
    await userEvent.click(earth)
    await userEvent.click(earth)
  })
  test('renders with onChange - multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        onChange={(values: (string | undefined)[]) => values}
        multiselect
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
    await userEvent.click(earth)
  })
  test('handles correctly searchable and closest value - grouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        onChange={(values: (string | undefined)[]) => values}
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    const venus = screen.getByTestId('option-venus')
    const earth = screen.getByTestId('option-earth')

    await userEvent.click(screen.getByTestId('search-bar'))
    await userEvent.keyboard('e')

    expect(earth).toBeVisible()
    expect(venus).toBeVisible()

    await userEvent.keyboard('a')
    await userEvent.keyboard('[Enter]')
    await userEvent.keyboard('[Enter]') // do not add when already added
    expect(earth).toBeVisible()
    expect(venus).not.toBeVisible()

    expect(input.textContent).toContain('Earth')
    await userEvent.keyboard(
      '[Backspace][Backspace][Backspace][Backspace][Backspace]',
    )
    const mars = screen.getByText('Mars')
    expect(mars).toBeVisible()

    const options = screen.getAllByRole('option')
    await userEvent.keyboard('aa')
    await userEvent.keyboard('[Enter]')

    for (const option of options) {
      expect(option).not.toBeVisible()
    }

    const emptyState = screen.getByText('No options')
    expect(emptyState).toBeVisible()

    await userEvent.keyboard('[Backspace][Backspace]')
    await userEvent.keyboard('ju')
    await userEvent.keyboard('[Enter]')
    expect(input.textContent).toContain('Jupiter')
  })

  test('handles correctly with searchable and closest value - multiselect', async () => {
    // There is issues with this test
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        multiselect
        onChange={(values: (string | undefined)[]) => values}
        searchable
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    const venus = screen.getByText('Venus')
    const earth = screen.getByText('Earth')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    await userEvent.keyboard('[Enter]') // empty search doesn't do anything
    await userEvent.keyboard('e')
    expect(earth).toBeVisible()
    expect(venus).toBeVisible()

    await userEvent.keyboard('a')
    await userEvent.keyboard('[Enter]')
    expect(venus).not.toBeVisible()
    expect(earthCheckbox).toBeChecked()

    await userEvent.keyboard(
      '[Backspace][Backspace][Backspace][Backspace][Backspace]',
    )
    const mars = screen.getByTestId('option-mars')
    expect(mars).toBeVisible()
    await userEvent.click(mars)
    await userEvent.click(screen.getByTestId('search-bar'))

    const options = screen.getAllByRole('option')
    await userEvent.keyboard('aa')
    await userEvent.keyboard('[Enter]')

    for (const option of options) {
      expect(option).not.toBeVisible()
    }
    const emptyState = screen.getByText('No options')
    expect(emptyState).toBeVisible()
  })
  test('handles correctly with searchable and closest value - multiselect & grouped data', async () => {
    // There is issues with this test
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        multiselect
        onChange={(values: (string | undefined)[]) => values}
        searchable
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    const venus = screen.getByText('Venus')
    const earth = screen.getByText('Earth')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    await userEvent.keyboard('[Enter]') // empty search doesn't do anything
    await userEvent.keyboard('e')
    expect(earth).toBeVisible()
    expect(venus).toBeVisible()

    await userEvent.keyboard('a')
    await userEvent.keyboard('[Enter]')
    expect(venus).not.toBeVisible()
    expect(earthCheckbox).toBeChecked()

    await userEvent.keyboard(
      '[Backspace][Backspace][Backspace][Backspace][Backspace]',
    )
    const mars = screen.getByTestId('option-mars')
    expect(mars).toBeVisible()
    await userEvent.click(mars)
    await userEvent.click(screen.getByTestId('search-bar'))

    const options = screen.getAllByRole('option')
    await userEvent.keyboard('aa')
    await userEvent.keyboard('[Enter]')

    for (const option of options) {
      expect(option).not.toBeVisible()
    }
    const emptyState = screen.getByText('No options')
    expect(emptyState).toBeVisible()

    await userEvent.keyboard('[Backspace]')
    await userEvent.keyboard('[Enter]')
  }, 10000)

  test('renders correctly selected tags when multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        value={[dataGrouped['jovian planets'][1].value]}
        onChange={(values: (string | undefined)[]) => values}
        optionalInfoPlacement="left"
        descriptionDirection="column"
      />,
    )

    const closeTag = screen.getByTestId('close-tag')
    const tag = screen.getByTestId('selected-options-tags')
    expect(tag).toBeVisible()
    await userEvent.click(closeTag)
    expect(tag).not.toBeVisible()

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const options = screen.getAllByRole('option')

    fireEvent.click(options[1])
    fireEvent.click(options[2])
    fireEvent.click(options[4])
    fireEvent.click(options[5])
    fireEvent.click(options[6])

    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()
  })

  test('handles correcty selectAll grouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        onChange={(values: (string | undefined)[]) => values}
        selectAll={{
          label: 'Select',
          description: 'all',
        }}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const selectAllCheckBox = screen.getByRole('checkbox', {
      name: 'Select all',
    })
    const selectAll = screen.getByTestId('select-all')
    await userEvent.click(selectAll)
    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()

    const venus = screen.getByTestId('option-venus')
    const earth = screen.getByTestId('option-earth')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    await userEvent.click(venus)
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.click(venus)
    expect(selectAllCheckBox).toBeChecked()

    await userEvent.click(selectAll)
    expect(screen.getByText('placeholder')).toBeInTheDocument()

    await userEvent.click(selectAll)
    await userEvent.click(earth)
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(earthCheckbox).toBeChecked()

    await userEvent.click(screen.getByTestId('search-bar'))
    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAllCheckBox).toBeChecked()
    await userEvent.keyboard('<') // Nothing when the user press any key
    expect(selectAllCheckBox).toBeChecked()
  }, 15000)

  test('handles correcty selectAll ungrouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        multiselect
        placeholder="placeholder"
        onChange={(values: (string | undefined)[]) => values}
        selectAll={{
          label: 'Select',
          description: 'all',
        }}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const selectAllCheckBox = screen.getByRole('checkbox', {
      name: 'Select all',
    })
    const selectAll = screen.getByTestId('select-all')
    await userEvent.click(selectAll)
    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()

    const venus = screen.getByTestId('option-venus')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(venus)
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.click(venus)
    expect(selectAllCheckBox).toBeChecked()

    await userEvent.click(selectAll)
    expect(screen.getByText('placeholder')).toBeInTheDocument()

    await userEvent.click(selectAll)
    await userEvent.click(earth)
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(earthCheckbox).toBeChecked()

    await userEvent.click(screen.getByTestId('search-bar'))
    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAllCheckBox).toBeChecked()
    await userEvent.keyboard('<') // Nothing when the user press any key
    expect(selectAllCheckBox).toBeChecked()
  }, 10000)

  test('handles correcty selectAllGroup', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        onChange={(values: (string | undefined)[]) => values}
        selectAllGroup
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const selectAllGroupCheckBox = screen.getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
    const selectAllGroup = screen.getByTestId('group-0')
    await userEvent.click(selectAllGroup)
    const mercury = screen.getByRole('checkbox', {
      name: /mercury/i,
    })
    const venus = screen.getByRole('checkbox', {
      name: /venus/i,
    })
    const earth = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    const jupiter = screen.getByRole('checkbox', {
      name: /jupiter/i,
    })

    expect(mercury).toBeChecked()
    expect(venus).toBeChecked()
    expect(earth).toBeChecked()
    expect(jupiter).not.toBeChecked()

    await userEvent.click(screen.getByTestId('option-mercury'))
    expect(selectAllGroup).not.toBeChecked()

    await userEvent.click(screen.getByTestId('option-mercury'))
    expect(selectAllGroupCheckBox).toBeChecked()
  }, 10000)

  test('handles correcty selectAllGroup - keyboard events', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        onChange={(values: (string | undefined)[]) => values}
        selectAllGroup
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const selectAllGroupCheckBox = screen.getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
    const selectAllGroup = screen.getByTestId('group-0')
    await userEvent.click(selectAllGroup)
    const earth = screen.getByTestId('option-earth')

    await userEvent.click(earth)
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(selectAllGroupCheckBox).toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroupCheckBox).not.toBeChecked()
  }, 10000)

  test('handles correcty selectAllGroup with selectAll - grouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        clearable={false}
        placeholder="placeholder"
        onChange={(values: (string | undefined)[]) => values}
        selectAllGroup
        selectAll={{
          label: 'Select',
          description: 'all',
        }}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const selectAllGroupCheckBox = screen.getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
    const selectAllGroup = screen.getByTestId('group-0')
    await userEvent.click(selectAllGroup)
    const venus = screen.getByRole('checkbox', {
      name: /venus/i,
    })

    const selectAllCheckBox = screen.getByRole('checkbox', {
      name: 'Select all',
    })
    const selectAll = screen.getByTestId('select-all')
    await userEvent.click(selectAll)

    await userEvent.click(screen.getByTestId('option-venus'))
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ve')
    await userEvent.keyboard('[Enter]')

    expect(venus).toBeChecked()
    expect(selectAllGroupCheckBox).toBeChecked()
    expect(selectAllCheckBox).toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroupCheckBox).not.toBeChecked()
    expect(selectAllCheckBox).not.toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroupCheckBox).toBeChecked()
    expect(selectAllCheckBox).toBeChecked()

    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAllCheckBox).toBeChecked()
  }, 10000)

  test('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="row" & multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        optionalInfoPlacement="left"
        descriptionDirection="row"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="row" & multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        optionalInfoPlacement="right"
        descriptionDirection="row"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="column" & multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        optionalInfoPlacement="left"
        descriptionDirection="column"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="column" & multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        optionalInfoPlacement="right"
        descriptionDirection="column"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="row"', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        optionalInfoPlacement="left"
        descriptionDirection="row"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="row"', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        optionalInfoPlacement="right"
        descriptionDirection="row"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="column"', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        optionalInfoPlacement="left"
        descriptionDirection="column"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="column"', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        optionalInfoPlacement="right"
        descriptionDirection="column"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  test('renders correctly loading - grouped data', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        descriptionDirection="row"
        isLoading
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly loading - ungrouped data', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        descriptionDirection="row"
        isLoading
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    expect(asFragment()).toMatchSnapshot()
  })
})
