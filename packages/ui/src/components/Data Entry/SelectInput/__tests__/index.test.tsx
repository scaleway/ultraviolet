import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SelectInput } from '..'
import { cities, dataGrouped, dataGroupedSmall, dataGroupEmpty, dataUnGrouped, OptionalInfo } from './resources'

// checkboxes are hidden (to avoid inputs inside a button)
const getDecorativeCheckbox = (container: HTMLElement) => within(container).getByRole('checkbox', { hidden: true })

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
    const { asFragment } = renderWithTheme(<SelectInput label="label" options={dataUnGrouped} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly small', () => {
    const { asFragment } = renderWithTheme(<SelectInput label="label" options={dataUnGrouped} size="small" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with tooltip', () => {
    const { asFragment } = renderWithTheme(<SelectInput label="label" options={dataUnGrouped} tooltip="tooltip" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly not clearable', () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        clearable={false}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataUnGrouped[4].value}
        label="label"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly ungrouped', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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

  it('keeps the dropdown at least 320px wide', async () => {
    renderWithTheme(<SelectInput name="test" options={dataUnGrouped} placeholder="placeholder" />)
    await userEvent.click(screen.getByText('placeholder'))

    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(dropdown).toHaveStyle({ minWidth: '320px' })
    })
  })

  it('renders correctly grouped', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })

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
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={[dataGrouped['terrestrial planets'][4].value]}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        options={dataGroupEmpty}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        onChange={() => {}}
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        optionalInfoPlacement="right"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        optionalInfoPlacement="left"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        optionalInfoPlacement="right"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
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
        options={{}}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })

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
        label="label"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })

    await userEvent.click(input) // it shouldn't open the dropdown
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly required', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        label="label"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        required
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })

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
        label="label"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        readOnly
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })

    await userEvent.click(input) // it shouldn't open the dropdown
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with error', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        error="error"
        label="label"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })

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
        label="label"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        success="success"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        options={[dataUnGrouped[0]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(screen.queryByRole('textbox', { name: 'search-bar' })).not.toBeInTheDocument()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('focuses the first option when opening a non-searchable dropdown', async () => {
    renderWithTheme(
      <SelectInput
        options={[dataUnGrouped[1]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )

    await userEvent.click(screen.getByRole('combobox', { name: 'label' }))
    const option = screen.getByRole('option', { name: 'Venus' })

    await waitFor(() => {
      expect(option).toHaveFocus()
    })
  })

  it('should be searchable when there are less than 6 items but addOption is enabled', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        label="label"
        options={[dataUnGrouped[0]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        addOption={{ text: 'text', onClick: vi.fn() }}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        options={[dataUnGrouped[0]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        addOption={{ text: 'text', onClick: vi.fn() }}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(screen.getByRole('textbox', { name: 'search-bar' })).toBeInTheDocument()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('keeps focus in the search bar and announces the number of results', async () => {
    renderWithTheme(
      <SelectInput
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )

    await userEvent.click(screen.getByRole('combobox', { name: 'label' }))
    const searchBar = screen.getByRole('textbox', { name: 'search-bar' })

    expect(searchBar).toHaveAccessibleDescription('8 options available')

    await userEvent.type(searchBar, 'venus')
    await waitFor(() => {
      expect(searchBar).toHaveFocus()
      expect(screen.getAllByRole('status')[0]).toHaveTextContent('1 option available')
    })

    await userEvent.keyboard('{ArrowDown}')
    expect(screen.getByRole('option', { name: 'Venus' })).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}')
    expect(searchBar).toHaveFocus()

    await userEvent.clear(searchBar)
    await userEvent.type(searchBar, 'test-test-test')
    await waitFor(() => {
      expect(searchBar).toHaveFocus()
      expect(screen.getAllByRole('status')[0]).toHaveTextContent('0 options available')
    })
  })

  it('announces selection changes', async () => {
    renderWithTheme(<SelectInput multiselect options={dataUnGrouped} label="label" />)

    const combobox = screen.getByRole('combobox', { name: 'label' })
    expect(combobox).not.toHaveAttribute('aria-live')

    await userEvent.click(combobox)
    await userEvent.click(screen.getByRole('option', { name: /Jupiter/iv }))
    await waitFor(() => {
      expect(screen.getByRole('status', { name: 'Selected options' })).toHaveTextContent('Jupiter')
    })
    await userEvent.click(screen.getByRole('option', { name: 'Saturn' }))

    await waitFor(() => {
      expect(screen.getByRole('status', { name: 'Selected options' })).toHaveTextContent('Jupiter, Saturn')
    })
  })

  it('announces a single selected value from the value text', async () => {
    renderWithTheme(<SelectInput options={dataUnGrouped} label="label" />)

    const combobox = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(combobox)
    await userEvent.click(screen.getByRole('option', { name: /Jupiter/iv }))

    const selectedValue = screen.getByText('Jupiter')
    expect(selectedValue).toHaveAttribute('aria-live', 'polite')
    expect(combobox).not.toHaveAttribute('aria-live')
  })

  it('handles correctly dropdown with clicks - grouped', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        size="medium"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
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
        onChange={() => {}}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={[dataUnGrouped[1].value]}
      />,
    )
    const venusCloseButton = screen.getByRole('button', { name: /remove tag venus/iv })
    await userEvent.click(venusCloseButton)
    expect(venusCloseButton).not.toBeVisible()
  })

  it('renders correctly unclosable tags when readonly', () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        multiselect
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
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard('[arrowDown]')
    const searchbar = screen.getByRole('textbox', { name: 'search-bar' })
    await waitFor(() => {
      expect(searchbar).toBeVisible()
      expect(searchbar).toHaveFocus()
    })

    await userEvent.keyboard('[arrowDown]')
    const mercury = screen.getByRole('option', { name: /mercury/iv })
    expect(mercury).toHaveFocus()

    await userEvent.keyboard('[arrowDown]')
    const venus = screen.getByRole('option', { name: /venus/iv })
    expect(venus).toHaveFocus()

    await userEvent.keyboard('[arrowUp]')
    expect(mercury).toHaveFocus()
  })

  it('uses roving tab stops for options', async () => {
    renderWithTheme(<SelectInput label="label" options={dataUnGrouped} placeholder="placeholder" />)

    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'search-bar' })).toHaveFocus())

    await userEvent.keyboard('[arrowDown]')
    const mercury = screen.getByRole('option', { name: 'Mercury' })
    const venus = screen.getByRole('option', { name: 'Venus' })

    expect(mercury).toHaveFocus()
    expect(mercury).toHaveAttribute('tabindex', '0')
    expect(venus).toHaveAttribute('tabindex', '-1')

    await userEvent.keyboard('[arrowDown]')

    expect(venus).toHaveFocus()
    expect(mercury).toHaveAttribute('tabindex', '-1')
    expect(venus).toHaveAttribute('tabindex', '0')
  })

  it('handles correctly dropdown with arrow pressing enter or space', async () => {
    renderWithTheme(
      <SelectInput
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
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
        options={dataGroupedSmall}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard('[arrowDown]')
    const dropdown = screen.getByRole('dialog')
    const jupiter = screen.getByRole('option', {
      name: /jupiter/iv,
    })
    await waitFor(() => {
      expect(dropdown).toBeVisible()
      expect(jupiter).toHaveFocus() // focus on first element when opening the dropdown (and there is no searchbar)
    })
    await userEvent.keyboard('[arrowDown]')
    const saturn = screen.getByRole('option', {
      name: /saturn/iv,
    })
    expect(saturn).toHaveFocus()
    await userEvent.keyboard('[arrowUp]')
    expect(jupiter).toHaveFocus()
  })

  it('handles correctly clear all', async () => {
    renderWithTheme(
      <SelectInput
        clearable
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
        value={dataUnGrouped[4].value}
      />,
    )
    const clearAll = screen.getByRole('button', { name: 'clear value' })
    await userEvent.click(clearAll)
    expect(clearAll).not.toBeInTheDocument()
  })

  it('handles click autoclose when outside click', async () => {
    renderWithTheme(
      <>
        Test outside element
        <SelectInput
          options={dataUnGrouped}
          placeholder="placeholder"
          placeholderSearch="placeholdersearch"
          label="label"
        />
      </>,
    )
    const input = screen.getByRole('combobox', { name: 'label' })

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
        onChange={onChange}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })

    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByRole('option', { name: /venus/iv })

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    await userEvent.click(venus)

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('handles keydown when not searchable on ungrouped data', async () => {
    renderWithTheme(
      <SelectInput
        options={[dataUnGrouped[1]]}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByRole('option', {
      name: /venus/iv,
    })
    await userEvent.type(dropdown, 'v')
    expect(venus).toHaveFocus()
    await userEvent.type(dropdown, 'a')
  })

  it('handles keydown when not searchable on grouped data', async () => {
    renderWithTheme(
      <SelectInput
        options={dataGroupedSmall}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        size="medium"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    // Venus lives in the second group, so type-ahead must search every group, not only the first one
    const venus = screen.getByRole('option', { name: /venus/iv })
    await userEvent.type(dropdown, 'v')
    expect(venus).toHaveFocus()
  })

  it('renders with onChange', async () => {
    renderWithTheme(
      <SelectInput
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
    await userEvent.click(earth)
  })

  it('renders with onChange - multiselect', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
    await userEvent.click(earth)
  })

  it('handles correctly searchable and closest value - grouped data', async () => {
    renderWithTheme(
      <SelectInput
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByRole('option', { name: 'Venus' })
    const earth = screen.getByRole('option', { name: /earth/iv })

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
    const mars = screen.getByRole('option', { name: /mars/iv })
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
        onChange={(values: (string | undefined)[]) => values}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByRole('option', { name: /venus/iv })
    const earth = screen.getByRole('option', { name: /earth/iv })
    const earthCheckbox = getDecorativeCheckbox(earth)
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
    const mars = screen.getByRole('option', { name: 'mars' })
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
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const jupiter = screen.getByRole('option', { name: /jupiter/iv })
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.keyboard('e')
    await waitFor(() => expect(jupiter).toBeVisible())

    await userEvent.keyboard('ea')
    await waitFor(() => expect(earth).toBeVisible())
    await waitFor(() => {
      expect(screen.queryByText('jupiter')).not.toBeVisible()
    })

    await userEvent.keyboard('[Backspace][Backspace][Backspace][Backspace][Backspace]')
    const mars = screen.getByRole('option', { name: 'mars' })
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
        onChange={(values: (string | undefined)[]) => values}
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
        value={[dataGrouped['jovian planets'][1].value]}
        label="label"
      />,
    )

    const closeTag = screen.getByRole('button', { name: /remove tag/iv })
    expect(closeTag).toBeVisible()
    await userEvent.click(closeTag)
    expect(closeTag).not.toBeVisible()

    const input = screen.getByRole('combobox', { name: 'label' })
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
        onChange={onChange}
        options={dataGrouped}
        placeholder="placeholder"
        selectAll={{
          description: 'all',
          label: 'Select',
        }}
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const selectAll = screen.getByRole('option', {
      name: /select.*all/iv,
    })
    const selectAllCheckbox = getDecorativeCheckbox(selectAll)
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

    const venus = screen.getByRole('option', { name: 'Venus' })
    const earth = screen.getByRole('option', { name: /earth/iv })
    const earthCheckbox = getDecorativeCheckbox(earth)
    await userEvent.click(venus)
    expect(selectAllCheckbox).not.toBeChecked()
    await userEvent.click(venus)
    expect(selectAllCheckbox).toBeChecked()
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
    expect(selectAllCheckbox).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAllCheckbox).toBeChecked()
  }, 15_000)

  it.each([dataGrouped, dataUnGrouped])('handles correctly selectAll when the value is controlled', async () => {
    const ControlledSelect = () => {
      const [values, setValues] = useState<string[]>([])

      return (
        <SelectInput
          multiselect
          label="label"
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

    await userEvent.click(screen.getByRole('combobox', { name: 'label' }))

    const selectAll = screen.getByRole('option', { name: 'Selectall' })
    expect(selectAll).toBeVisible()

    await userEvent.click(selectAll)
    expect(selectAll).toHaveAttribute('aria-selected', 'true')
  })

  it('handles correcty selectAll ungrouped data', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <SelectInput
        multiselect
        onChange={onChange}
        options={dataUnGrouped}
        placeholder="placeholder"
        selectAll={{
          description: 'all',
          label: 'Select',
        }}
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const selectAll = screen.getByRole('option', { name: /select.*all/iv })
    const selectAllCheckBox = getDecorativeCheckbox(selectAll)
    await userEvent.click(selectAll)
    expect(onChange).toHaveBeenCalledWith(['mercury', 'venus', 'earth', 'jupiter', 'saturn', 'uranus', 'neptune'])
    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()

    const venus = screen.getByRole('option', { name: 'Venus' })
    const earth = screen.getByRole('option', { name: /earth/iv })
    const earthCheckbox = getDecorativeCheckbox(earth)
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
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        selectAllGroup
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })

    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(
      () => {
        expect(dropdown).toBeVisible()
      },
      { timeout: 1000 },
    )
    const selectAllGroup = screen.getByRole('option', { name: 'TERRESTRIAL PLANETS' })
    const selectAllGroupCheckBox = getDecorativeCheckbox(selectAllGroup)
    await userEvent.click(selectAllGroup)
    const mercury = getDecorativeCheckbox(screen.getByRole('option', { name: /mercury/iv }))
    const venus = getDecorativeCheckbox(screen.getByRole('option', { name: /venus/iv }))
    const earth = getDecorativeCheckbox(screen.getByRole('option', { name: /earth/iv }))
    const jupiter = getDecorativeCheckbox(screen.getByRole('option', { name: /jupiter/iv }))

    expect(mercury).toBeChecked()
    expect(venus).toBeChecked()
    expect(earth).toBeChecked()
    expect(jupiter).not.toBeChecked()

    await userEvent.click(screen.getByRole('option', { name: 'Mercury' }))
    expect(selectAllGroupCheckBox).not.toBeChecked()

    await userEvent.click(screen.getByRole('option', { name: 'Mercury' }))
    expect(selectAllGroupCheckBox).toBeChecked()
  }, 10_000)

  it('handles correcty selectAllGroup - keyboard events', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        selectAllGroup
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(
      () => {
        expect(dropdown).toBeVisible()
      },
      { timeout: 1000 },
    )

    const selectAllGroup = within(dropdown).getByRole('option', { name: 'TERRESTRIAL PLANETS' })
    const selectAllGroupCheckBox = getDecorativeCheckbox(selectAllGroup)
    await userEvent.click(selectAllGroup)
    const earth = screen.getByRole('option', { name: /earth/iv })

    await userEvent.click(earth)
    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(selectAllGroupCheckBox).toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroupCheckBox).not.toBeChecked()
  }, 10_000)

  it('does not expose nested checkboxes inside listbox options', async () => {
    renderWithTheme(
      <SelectInput
        multiselect
        options={dataGrouped}
        placeholder="placeholder"
        selectAll={{ label: 'Select all' }}
        selectAllGroup
        label="label"
      />,
    )

    await userEvent.click(screen.getByRole('combobox', { name: 'label' }))
    const dropdown = screen.getByRole('dialog')
    const listbox = dropdown

    expect(within(listbox).queryByRole('checkbox')).not.toBeInTheDocument()
    expect(within(listbox).getByRole('option', { name: /jupiter/i })).toBeInTheDocument()
    expect(within(listbox).getByRole('option', { name: 'JOVIAN PLANETS' })).toBeInTheDocument()
  })

  it('handles correcty selectAllGroup with selectAll - grouped data', async () => {
    renderWithTheme(
      <SelectInput
        clearable={false}
        multiselect
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        selectAll={{
          description: 'all',
          label: 'Select',
        }}
        selectAllGroup
        label="label"
      />,
    )

    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(
      () => {
        expect(dropdown).toBeVisible()
      },
      { timeout: 1000 },
    )

    const selectAllGroup = within(dropdown).getByRole('option', { name: 'TERRESTRIAL PLANETS' })
    const selectAllGroupCheckBox = getDecorativeCheckbox(selectAllGroup)

    await userEvent.click(selectAllGroup)
    const venus = getDecorativeCheckbox(screen.getByRole('option', { name: /venus/iv }))

    const selectAll = within(dropdown).getByRole('option', { name: /select.*all/iv })
    const selectAllCheckBox = getDecorativeCheckbox(selectAll)
    await userEvent.click(selectAll)

    await userEvent.click(screen.getByRole('option', { name: 'Venus' }))
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
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="row" & multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        multiselect
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="column" & multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        multiselect
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="column" & multiselect', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        multiselect
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="row"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="row"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('handles correctly click on item - optionalInfoPlacement="left" & descriptionDirection="column"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        optionalInfoPlacement="left"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('handles correctly click on item - optionalInfoPlacement="right" & descriptionDirection="column"', async () => {
    renderWithTheme(
      <SelectInput
        descriptionDirection="column"
        optionalInfoPlacement="right"
        options={dataGrouped}
        placeholder="placeholder"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    const earth = screen.getByRole('option', { name: /earth/iv })
    await userEvent.click(earth)
  })

  it('renders correctly loading - grouped data', async () => {
    const { asFragment } = renderWithTheme(
      <SelectInput
        descriptionDirection="row"
        isLoading
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
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
        label="label"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders skeleton instead of empty state when loading with empty data', async () => {
    renderWithTheme(
      <SelectInput
        isLoading
        label="label"
        options={{}}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    expect(dropdown.querySelector('[aria-busy="true"]')).not.toBeNull()
    expect(screen.queryByText('No options')).not.toBeInTheDocument()
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
        label="label"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4].value}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)

    const footer = screen.getByRole('button', { name: 'click' })
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
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByRole('option', { name: 'Venus' })

    expect(venus).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new value')

    expect(venus).not.toBeVisible()

    const addOption = screen.getByRole('option', { name: 'create new value' })

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
        onChange={(values: (string | undefined)[]) => values}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByRole('option', { name: 'Venus' })

    expect(venus).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new value')

    expect(venus).not.toBeVisible()

    const addOption = screen.getByRole('option', { name: 'create new value' })

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
        onChange={(values: (string | undefined)[]) => values}
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByRole('option', { name: 'Venus' })
    const earth = screen.getByRole('option', { name: /earth/iv })

    expect(venus).toBeVisible()
    expect(earth).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('ven')

    expect(venus).toBeVisible()
    expect(earth).not.toBeVisible()

    const addOption = screen.getByRole('option', { name: 'create ven' })

    expect(addOption).toBeVisible()

    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[Enter]')

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new-planet')

    expect(screen.getByRole('option', { name: 'create new-planet' })).toBeVisible()
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
        onChange={(values: (string | undefined)[]) => values}
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        label="label"
      />,
    )
    const input = screen.getByRole('combobox', { name: 'label' })
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })
    const venus = screen.getByRole('option', { name: 'Venus' })
    const earth = screen.getByRole('option', { name: /earth/iv })

    expect(venus).toBeVisible()
    expect(earth).toBeVisible()

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('ven')

    expect(venus).toBeVisible()
    expect(earth).not.toBeVisible()

    const addOption = screen.getByRole('option', { name: 'create ven' })

    expect(addOption).toBeVisible()

    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[Enter]')

    await userEvent.click(screen.getByRole('textbox', { name: 'search-bar' }))
    await userEvent.keyboard('new-planet')

    expect(screen.getByRole('option', { name: 'create new-planet' })).toBeVisible()
    expect(venus).not.toBeVisible()
    expect(earth).not.toBeVisible()

    await userEvent.keyboard('[arrowDown]')
    await userEvent.keyboard('[Enter]')

    expect(onClick).toHaveBeenCalledTimes(2)
  })
})
