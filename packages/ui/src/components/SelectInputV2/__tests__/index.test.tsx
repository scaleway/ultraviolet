import { describe, expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectInputV2 } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'
import {
  OptionalInfo,
  dataGrouped,
  dataUnGrouped,
} from '../__stories__/resources'

describe('SelectInputV2', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2 name="test" options={dataUnGrouped} label="label" />,
    ))
  test('renders correctly with fixed width', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        width={400}
        clearable={false}
        searchable={false}
      />,
    ))
  test('renders correctly ungrouped', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly grouped', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with default value', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4]}
      />,
      {
        transform: async () => {
          const input = screen.getByText('Pluto')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly multiselect', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4]}
        multiselect
      />,
      {
        transform: async () => {
          const input = screen.getByText('Pluto')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with label on the right and optional info on the left', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        direction="row"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with label on the right and optional info on the right', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        direction="row"
        optionalInfoPlacement="right"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with label on the bottom and optional info on the left', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        direction="column"
        optionalInfoPlacement="left"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with label on the bottom and optional info on the right', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={OptionalInfo}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        direction="column"
        optionalInfoPlacement="right"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with emptyState', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="emptystate"
        options={{}}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        emptyState="no option"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        disabled
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))

  test('renders correctly required', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        required
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly readOnly', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        readOnly
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with error', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        error="error"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with success', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        success="success"
      />,
      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly with not searchable', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,

      {
        transform: async () => {
          const input = screen.getByText('placeholder')
          await userEvent.click(input)
        },
      },
    ))
  test('renders correctly dropdown with clicks - grouped', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
        width={500}
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
  test('renders correctly dropdown with clicks - ungrouped', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
        width={500}
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

  test('renders correctly selected tags when multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        searchable={false}
        multiselect
        width={500}
        placeholder="placeholder"
      />,
    )
    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const options = screen.getAllByRole('option')

    await userEvent.click(options[0])
    await userEvent.click(options[1])
    await userEvent.click(options[2])
    await userEvent.click(options[3])
    await userEvent.click(options[4])
    await userEvent.click(options[5])

    // const plustag = screen.getByTestId('plus-tag')
    // expect(plustag).toBeInTheDocument()
  })
  test('renders correctly closed tags', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
        value={dataUnGrouped[1]}
        onChange={() => {}}
      />,
    )
    const venusCloseButton = screen.getByTestId('close-tag')
    const venus = screen.getByText('Venus')
    await userEvent.click(venusCloseButton)
    expect(venus).not.toBeVisible()
  })

  test('renders correctly dropdown with arrow down/up key press with ungrouped data', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,

      {
        transform: async () => {
          const input = screen.getByTestId('select-bar')
          await userEvent.tab()
          await userEvent.tab()
          expect(input).toHaveFocus()
          await userEvent.keyboard('[arrowDown]')
          const dropdown = screen.getByRole('dialog')
          expect(dropdown).toBeVisible()
          await userEvent.tab()
          await userEvent.keyboard('[arrowDown]')
          await userEvent.keyboard('[arrowUp]')
          const venus = screen.getByRole('option', {
            name: /mercury/i,
          })
          expect(venus).toHaveFocus()
        },
      },
    ))
  test('renders correctly dropdown with arrow down/up key press with grouped data', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,

      {
        transform: async () => {
          const input = screen.getByTestId('select-bar')
          await userEvent.tab()
          await userEvent.tab()
          expect(input).toHaveFocus()
          await userEvent.keyboard('[arrowDown]')
          const dropdown = screen.getByRole('dialog')
          expect(dropdown).toBeVisible()
          await userEvent.tab()
          await userEvent.keyboard('[arrowDown]')
          await userEvent.keyboard('[arrowUp]')
          const venus = screen.getByRole('option', {
            name: /mercury/i,
          })
          expect(venus).toHaveFocus()
        },
      },
    ))

  test('renders correctly clear all', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        value={dataUnGrouped[4]}
      />,
    )
    const clearAll = screen.getByTestId('clear-all')
    await userEvent.click(clearAll)
    expect(clearAll).not.toBeInTheDocument()
  })

  test('handles click outside', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
      />,
    )
    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
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
    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByRole('option', {
      name: /venus/i,
    })
    await userEvent.type(dropdown, 'v')
    expect(venus).toHaveFocus()
  })
  test('handles keydown when not searchable on grouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
      />,
    )
    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    const venus = screen.getByRole('option', {
      name: /venus/i,
    })
    await userEvent.type(dropdown, 'v')
    expect(venus).toHaveFocus()
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
    const input = screen.getByTestId('select-bar')
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
    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const earth = screen.getByText('Earth')
    await userEvent.click(earth)
    await userEvent.click(earth)
  })
  test('renders with searchable and closest value - grouped data', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        onChange={(values: (string | undefined)[]) => values}
      />,
    )
    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    const venus = screen.getByText('Venus')
    const earth = screen.getByText('Earth')

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
  })

  test('renders with searchable and closest value - multiselect', async () => {
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
    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
    const venus = screen.getByText('Venus')
    const earth = screen.getByText('Venus')
    const earthCheckbox = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    await userEvent.keyboard('[Enter]') // empty search doesn't do anything
    await userEvent.keyboard('e')
    expect(earth).toBeVisible()
    expect(venus).toBeVisible()

    await userEvent.keyboard('a')
    await userEvent.keyboard('[Enter]')
    await userEvent.keyboard('[Enter]') // do not add when already added
    expect(venus).not.toBeVisible()
    expect(earthCheckbox).toBeChecked()

    await userEvent.keyboard(
      '[Backspace][Backspace][Backspace][Backspace][Backspace]',
    )
    const mars = screen.getByText('Mars')
    expect(mars).toBeVisible()
    await userEvent.click(mars)
    await userEvent.click(screen.getByTestId('search-bar'))

    const options = screen.getAllByRole('option')
    await userEvent.keyboard('aaa')
    await userEvent.keyboard('[Enter]')

    for (const option of options) {
      expect(option).not.toBeVisible()
    }
    const emptyState = screen.getByText('No options')
    expect(emptyState).toBeVisible()
  })
})
