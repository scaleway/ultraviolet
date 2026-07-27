import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { useState } from 'react'
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import { SelectInput } from '..'
import { cities, dataGroupEmpty, dataGrouped, dataUnGrouped, OptionalInfo, dataGroupedSmall } from './resources'

describe('selectInput', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    })
  })

  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {})
  })

  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(<SelectInput label="label" name="test" options={dataUnGrouped} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly small', () => {
    const { asFragment } = renderWithTheme(
      <SelectInput label="label" name="test" options={dataUnGrouped} size="small" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with tooltip', () => {
    const { asFragment } = renderWithTheme(
      <SelectInput label="label" name="test" options={dataUnGrouped} tooltip="tooltip" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly not clearable', () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        clearable={false}
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataUnGrouped[4].value}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly ungrouped', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(
      () => {
        expect(dropdown).toBeVisible()
      },
      { timeout: 1000 },
    )
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly grouped', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput name="test" options={dataGrouped} placeholder="placeholder" placeholderSearch="placeholdersearch" />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with default value', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
      />,
    )
    const input = screen.getByText('Pluto')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with footer', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        footer="this is a footer"
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
      />,
    )
    const input = screen.getByText('Pluto')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly multiselect', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={[dataGrouped['terrestrial planets'][4].value]}
      />,
    )
    const input = screen.getByText('Pluto')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with group error', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        groupError={{
          'jovian planets': 'error',
        }}
        multiselect
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    expect(screen.getByText('error')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with group empty state', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        groupEmptyState={{
          'jovian planets': 'No jovian planets :(',
          'terrestrial planets': 'No terrestrial planets !',
        }}
        multiselect
        name="test"
        options={dataGroupEmpty}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    expect(screen.getByText('No jovian planets :(')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label on the right and optional info on the left', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        name="test"
        onChange={() => {}}
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label on the right and optional info on the right', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        name="test"
        optionalInfoPlacement="right"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label on the bottom and optional info on the left', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        name="test"
        optionalInfoPlacement="left"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label on the bottom and optional info on the right', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        name="test"
        optionalInfoPlacement="right"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly loadMore', () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        clearable={false}
        loadMore="LoadMore"
        name="test"
        options={cities}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with emptyState', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        emptyState="no option"
        name="emptystate"
        options={{}}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly disabled', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        disabled
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input) // it shouldn't open the dropdown
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly required', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        required
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with dropdownAlign', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        dropdownAlign="center"
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        required
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly readOnly', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        readOnly
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input) // it shouldn't open the dropdown
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with error', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        error="error"
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with success', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        success="success"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not be searchable when there are less than 6 items', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={[dataUnGrouped[0]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(screen.queryByRole('textbox', { name: 'search-bar' })).not.toBeInTheDocument()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be searchable when there are less than 6 items but addOption is enabled', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={[dataUnGrouped[0]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        addOption={{ text: 'text', onClick: vi.fn() }}
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(screen.getByRole('textbox', { name: 'search-bar' })).toBeInTheDocument()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be searchable when there are more than 6 items', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        name="test"
        options={[dataUnGrouped[0]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        addOption={{ text: 'text', onClick: vi.fn() }}
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(screen.getByRole('textbox', { name: 'search-bar' })).toBeInTheDocument()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('handles correctly dropdown with clicks - grouped', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    await userEvent.click(input)
    await userEvent.click(input)
    expect(dropdown).not.toBeInTheDocument()
  })

  it('handles correctly dropdown with clicks - ungrouped', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        size="medium"
      />,
    )

    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    await userEvent.click(input)
    await userEvent.click(input)
    expect(dropdown).not.toBeInTheDocument()
  })

  it('handles correctly closable tags', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={() => {}}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={[dataUnGrouped[1].value]}
      />,
    )
    const venusCloseButton = screen.getByTestId('close-tag')
    const venus = screen.getByText('Venus')
    await userEvent.click(venusCloseButton)
    expect(venus).not.toBeVisible()
  })

  it('renders correctly unclosable tags when readonly', () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={() => {}}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        readOnly
        value={[dataUnGrouped[1].value]}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles correctly dropdown with arrow down/up key press with ungrouped data', async () => {
    renderWithTheme(
      <SelectInput
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard('[arrowDown]')
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[arrowUp]')
    const mercury = screen.getByRole('option', {
      name: /mercury/iu,
    })
    expect(mercury).toHaveFocus()
  })
  it('handles correctly dropdown with arrow pressing enter or space', async () => {
    renderWithTheme(
      <SelectInput
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard(' ')
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
  })

  it('handles correctly dropdown with arrow down/up key press with grouped data', async () => {
    renderWithTheme(
      <SelectInput
        name="test"
        options={dataGroupedSmall}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard('[arrowDown]')
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.tab()
    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[arrowUp]')
    const jupiter = screen.getByRole('option', {
      name: /jupiter/iu,
    })
    expect(jupiter).toHaveFocus()
  })

  it('handles correctly clear all', async () => {
    renderWithTheme(
      <SelectInput
        clearable
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataUnGrouped[4].value}
      />,
    )
    const clearAll = screen.getByTestId('clear-all')
    await userEvent.click(clearAll)
    expect(clearAll).not.toBeInTheDocument()
  })

  it('handles click autoclose when outside click', async () => {
    renderWithTheme(
      <>
        Test outside element
        <SelectInput
          name="test"
          options={dataUnGrouped}
          placeholder="placeholder"
          placeholderSearch="placeholdersearch"
        />
      </>,
    )
    const input = screen.getByTestId('select-input-test')

    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const outsideClick = screen.getByText('Test outside element')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(outsideClick)
    await userEvent.click(outsideClick)

    expect(dropdown).not.toBeVisible()
  })
  it('handles click on item', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <SelectInput
        name="test"
        onChange={onChange}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')

    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByText('Venus')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(venus)

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('handles keydown when not searchable on ungrouped data', async () => {
    renderWithTheme(
      <SelectInput
        name="test"
        options={[dataUnGrouped[1]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByRole('option', {
      name: /venus/iu,
    })
    await userEvent.type(dropdown, 'v')
    expect(venus).toHaveFocus()
    await userEvent.type(dropdown, 'a')
  })

  it('handles keydown when not searchable on grouped data', async () => {
    renderWithTheme(
      <SelectInput
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        size="medium"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await userEvent.type(dropdown, 'v')
    await userEvent.type(dropdown, 'a')
  })

  it('renders with onChange', async () => {
    renderWithTheme(
      <SelectInput
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByText('Earth')
    await userEvent.click(earth)
    await userEvent.click(earth)
  })
  it('renders with onChange - multiselect', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
    await userEvent.click(earth)
  })

  it('handles correctly searchable and closest value - grouped data', async () => {
    renderWithTheme(
      <SelectInput
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByTestId('option-venus')
    const earth = screen.getByTestId('option-earth')

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('e')

    expect(earth).toBeVisible()
    expect(venus).toBeVisible()

    await userEvent.keyboard('a')
    await userEvent.keyboard('[Enter]')
    await userEvent.keyboard('[Enter]') // do not add when already added
    expect(earth).toBeVisible()
    expect(venus).not.toBeVisible()

    expect(input.textContent).toContain('Earth')
    await userEvent.keyboard('[Backspace][Backspace][Backspace][Backspace][Backspace]')
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

  // oxlint-disable-next-line vitest/no-disabled-tests
  it.skip('handles correctly with searchable and closest value - multiselect', async () => {
    // There is issues with this test
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByText('Venus')
    const earth = screen.getByText('Earth')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/iu,
    })
    await userEvent.keyboard('[Enter]') // empty search doesn't do anything
    await userEvent.keyboard('e')
    await waitFor(() => {
      expect(earth).toBeVisible()
    })
    await waitFor(() => {
      expect(venus).toBeVisible()
    })

    await userEvent.keyboard('a')
    await userEvent.keyboard('[Enter]')
    await waitFor(() => {
      expect(venus).not.toBeVisible()
    })
    await waitFor(() => {
      expect(earthCheckbox).toBeChecked()
    })

    await userEvent.keyboard('[Backspace][Backspace][Backspace][Backspace][Backspace]')
    const mars = screen.getByTestId('option-mars')
    expect(mars).toBeVisible()
    await userEvent.click(mars)
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))

    const options = screen.getAllByRole('option')
    await userEvent.keyboard('aa')
    await userEvent.keyboard('[Enter]')

    for (const option of options) {
      expect(option).not.toBeVisible()
    }
    const emptyState = screen.getByText('No options')
    expect(emptyState).toBeVisible()
  })

  // oxlint-disable-next-line vitest/no-disabled-tests
  it.skip('handles correctly with searchable and closest value - multiselect & grouped data', async () => {
    // There is issues with this test
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const jupiter = screen.getByText('Jupiter')
    const earth = screen.getByText('Earth')
    await userEvent.keyboard('e')
    await waitFor(() => expect(jupiter).toBeVisible())

    await userEvent.keyboard('ea')
    await waitFor(() => expect(earth).toBeVisible())
    await waitFor(() => {
      expect(screen.queryByText('jupiter')).not.toBeVisible()
    })

    await userEvent.keyboard('[Backspace][Backspace][Backspace][Backspace][Backspace]')
    const mars = screen.getByTestId('option-mars')
    expect(mars).toBeVisible()
    await userEvent.click(mars)
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))

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
  }, 10_000)

  it('renders correctly selected tags when multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
        value={[dataGrouped['jovian planets'][1].value]}
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

    await userEvent.click(options[1])
    await userEvent.click(options[2])
    await userEvent.click(options[4])
    await userEvent.click(options[5])
    await userEvent.click(options[6])

    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()
  })

  it('handles correcty selectAll grouped data', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={onChange}
        options={dataGrouped}
        placeholder="placeholder"
        selectAll={{
          description: 'all',
          label: 'Select',
        }}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const selectAllCheckBox = screen.getByRole('checkbox', {
      name: /select.*all/iu,
    })
    const selectAll = screen.getByTestId('select-all')
    await userEvent.click(selectAll)
    expect(onChange).toHaveBeenCalledWith([
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
      'mercury',
      'venus',
      'earth',
      'pluto',
    ])
    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()

    const venus = screen.getByTestId('option-venus')
    const earth = screen.getByTestId('option-earth')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/iu,
    })
    await userEvent.click(venus)
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.click(venus)
    expect(selectAllCheckBox).toBeChecked()
    expect(onChange).toHaveBeenCalledWith([
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
      'mercury',
      'earth',
      'pluto',
      'venus',
    ])

    await userEvent.click(selectAll)
    expect(onChange).toHaveBeenCalledWith([])
    expect(screen.getByText('placeholder')).toBeInTheDocument()

    await userEvent.click(selectAll)
    await userEvent.click(earth)
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(earthCheckbox).toBeChecked()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAllCheckBox).toBeChecked()
  }, 15_000)

  it.each([dataGrouped, dataUnGrouped])('handles correctly selectAll when the value is controlled', async () => {
    function ControlledSelect() {
      const [values, setValues] = useState<string[]>([])

      return (
        <SelectInput
          multiselect
          name="test"
          value={values}
          onChange={setValues}
          options={dataGrouped}
          placeholder="placeholder"
          selectAll={{
            description: 'all',
            label: 'Select',
          }}
        />
      )
    }

    renderWithTheme(<ControlledSelect />)

    await userEvent.click(screen.getByRole('combobox'))

    const selectAll = screen.getByRole('option', { name: 'select-all' })
    expect(selectAll).toBeVisible()

    await userEvent.click(selectAll)
    expect(selectAll).toHaveAttribute('aria-selected', 'true')
  })

  it('handles correcty selectAll ungrouped data', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={onChange}
        options={dataUnGrouped}
        placeholder="placeholder"
        selectAll={{
          description: 'all',
          label: 'Select',
        }}
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const selectAllCheckBox = screen.getByRole('checkbox', {
      name: /select.*all/iu,
    })
    const selectAll = screen.getByTestId('select-all')
    await userEvent.click(selectAll)
    expect(onChange).toHaveBeenCalledWith(['mercury', 'venus', 'earth', 'jupiter', 'saturn', 'uranus', 'neptune'])
    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()

    const venus = screen.getByTestId('option-venus')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/iu,
    })
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(venus)
    expect(onChange).toHaveBeenLastCalledWith(['mercury', 'earth', 'jupiter', 'saturn', 'uranus', 'neptune'])
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.click(venus)
    expect(selectAllCheckBox).toBeChecked()

    await userEvent.click(selectAll)
    expect(screen.getByText('placeholder')).toBeInTheDocument()
    expect(onChange).toHaveBeenLastCalledWith([])

    await userEvent.click(selectAll)
    await userEvent.click(earth)
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(earthCheckbox).toBeChecked()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(selectAllCheckBox).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAllCheckBox).toBeChecked()
  }, 10_000)

  it('handles correcty selectAllGroup', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        selectAllGroup
      />,
    )

    const input = screen.getByTestId('select-input-test')

    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(
      () => {
        expect(dropdown).toBeVisible()
      },
      { timeout: 1000 },
    )
    const selectAllGroupCheckBox = within(dropdown).getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
    const selectAllGroup = within(dropdown).getByTestId('group-1')
    await userEvent.click(selectAllGroup)
    const mercury = within(dropdown).getByRole('checkbox', {
      name: /mercury/iu,
    })
    const venus = within(dropdown).getByRole('checkbox', {
      name: /venus/iu,
    })
    const earth = within(dropdown).getByRole('checkbox', {
      name: /earth/iu,
    })
    const jupiter = within(dropdown).getByRole('checkbox', {
      name: /jupiter/iu,
    })

    expect(mercury).toBeChecked()
    expect(venus).toBeChecked()
    expect(earth).toBeChecked()
    expect(jupiter).not.toBeChecked()

    await userEvent.click(screen.getByTestId('option-mercury'))
    expect(selectAllGroup).not.toBeChecked()

    await userEvent.click(screen.getByTestId('option-mercury'))
    expect(selectAllGroupCheckBox).toBeChecked()
  }, 10_000)

  it('handles correcty selectAllGroup - keyboard events', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        selectAllGroup
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(
      () => {
        expect(dropdown).toBeVisible()
      },
      { timeout: 1000 },
    )

    const selectAllGroupCheckBox = within(dropdown).getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
    const selectAllGroup = within(dropdown).getByTestId('group-1')
    await userEvent.click(selectAllGroup)
    const earth = screen.getByTestId('option-earth')

    await userEvent.click(earth)
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(selectAllGroupCheckBox).toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroupCheckBox).not.toBeChecked()
  }, 10_000)

  it('handles correcty selectAllGroup with selectAll - grouped data', async () => {
    renderWithTheme(
      <SelectInput
        clearable={false}
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        selectAll={{
          description: 'all',
          label: 'Select',
        }}
        selectAllGroup
      />,
    )

    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(
      () => {
        expect(dropdown).toBeVisible()
      },
      { timeout: 1000 },
    )

    const selectAllGroupCheckBox = within(dropdown).getByRole('checkbox', {
      name: /terrestrial planets/iu,
    })

    const selectAllGroup = within(dropdown).getByTestId('group-1')

    await userEvent.click(selectAllGroup)
    const venus = within(dropdown).getByRole('checkbox', {
      name: /venus/iu,
    })

    const selectAllCheckBox = within(dropdown).getByRole('checkbox', {
      name: /select.*all/iu,
    })
    const selectAll = within(dropdown).getByTestId('select-all')
    await userEvent.click(selectAll)

    await userEvent.click(screen.getByTestId('option-venus'))
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))

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
  }, 15_000)

  it('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="row" & multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        multiselect
        name="test"
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="row" & multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        multiselect
        name="test"
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="column" & multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        multiselect
        name="test"
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="column" & multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        multiselect
        name="test"
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="row"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        name="test"
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="row"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        name="test"
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="column"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        name="test"
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="column"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        name="test"
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    const earth = screen.getByTestId('option-earth')
    await userEvent.click(earth)
  })
  it('renders correctly loading - grouped data', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        isLoading
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)

    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly loading - ungrouped data', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        isLoading
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByText('placeholder')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with function footer', async () => {
    const f = vi.fn(() => {})

    const { asFragment } = renderWithTheme(
      <SelectInput
        footer={closeDropdown => (
          <button
            data-testid="buttonclose"
            onClick={() => {
              f()
              closeDropdown()
            }}
            type="button"
          >
            click
          </button>
        )}
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
      />,
    )
    const input = screen.getByText('Pluto')
    await userEvent.click(input)

    const footer = screen.getByTestId('buttonclose')
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(footer).toBeVisible()
    })

    await userEvent.click(footer)

    expect(f).toHaveBeenCalledOnce()

    await waitFor(() => {
      expect(dropdown).not.toBeVisible()
      expect(footer).not.toBeVisible()
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('handles correctly when adding options - single select', async () => {
    const onClick = vi.fn()

    renderWithTheme(
      <SelectInput
        addOption={{ onClick, text: 'create' }}
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByTestId('option-venus')

    expect(venus).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new value')

    expect(venus).not.toBeVisible()

    const addOption = screen.getByTestId('add-option')

    expect(addOption).toBeVisible()
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('handles correctly when adding options - single select and ungrouped options', async () => {
    const onClick = vi.fn()

    renderWithTheme(
      <SelectInput
        addOption={{ onClick, text: 'create' }}
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByTestId('option-venus')

    expect(venus).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new value')

    expect(venus).not.toBeVisible()

    const addOption = screen.getByTestId('add-option')

    expect(addOption).toBeVisible()
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('handles correctly when adding options - multiselect select', async () => {
    const onClick = vi.fn()

    renderWithTheme(
      <SelectInput
        addOption={{ onClick, text: 'create' }}
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByTestId('option-venus')
    const earth = screen.getByTestId('option-earth')

    expect(venus).toBeVisible()
    expect(earth).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('ven')

    expect(venus).toBeVisible()
    expect(earth).not.toBeVisible()

    const addOption = screen.getByTestId('add-option')

    expect(addOption).toBeVisible()

    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[Enter]')

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new-planet')

    expect(screen.getByTestId('add-option')).toBeVisible()
    expect(venus).not.toBeVisible()
    expect(earth).not.toBeVisible()

    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[Enter]')

    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('handles correctly when adding options - multiselect select and ungrouped data', async () => {
    const onClick = vi.fn()

    renderWithTheme(
      <SelectInput
        addOption={{ onClick, text: 'create' }}
        multiselect
        name="test"
        onChange={(values: (string | undefined)[]) => values}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-input-test')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByTestId('option-venus')
    const earth = screen.getByTestId('option-earth')

    expect(venus).toBeVisible()
    expect(earth).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('ven')

    expect(venus).toBeVisible()
    expect(earth).not.toBeVisible()

    const addOption = screen.getByTestId('add-option')

    expect(addOption).toBeVisible()

    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[Enter]')

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new-planet')

    expect(screen.getByTestId('add-option')).toBeVisible()
    expect(venus).not.toBeVisible()
    expect(earth).not.toBeVisible()

    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[Enter]')

    expect(onClick).toHaveBeenCalledTimes(2)
  })
})
