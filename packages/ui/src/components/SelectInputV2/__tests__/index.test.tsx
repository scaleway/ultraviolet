import { beforeAll, describe, expect, jest, test } from '@jest/globals'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { act } from 'react-dom/test-utils'
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

export type OptionType = {
  value: string
  label: ReactNode
  disabled: boolean
  description?: string
  optionalInfo?: ReactNode
}

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
  test('renders correctly not clearable', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        width={400}
        clearable={false}
        searchable={false}
        value={dataUnGrouped[4]}
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
  test('renders correctly with footer', () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        value={dataGrouped['terrestrial planets'][4]}
        footer="this is a footer"
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
        onChange={() => {}}
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
  test('renders correctly unclosable tags when readonly', async () =>
    shouldMatchEmotionSnapshot(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        readOnly
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        searchable={false}
        multiselect
        value={dataUnGrouped[1]}
        onChange={() => {}}
      />,
    ))

  test('renders correctly dropdown with arrow down/up key press with ungrouped data', async () => {
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
  test('renders correctly dropdown with arrow pressing enter or space', async () => {
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
    await userEvent.tab()
    await userEvent.tab()
    expect(input).toHaveFocus()
    await userEvent.keyboard(' ')
    const dropdown = screen.getByRole('dialog')
    expect(dropdown).toBeVisible()
  })
  test('renders correctly dropdown with arrow down/up key press with grouped data', async () => {
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
    const input = screen.getByTestId('select-bar')

    act(() => input.click())
    const dropdown = screen.getByRole('dialog')
    const outsideClick = screen.getByText('Test outside element')

    expect(dropdown).toBeVisible()
    await userEvent.click(outsideClick)
    await userEvent.click(outsideClick)

    expect(dropdown).not.toBeVisible()
  })
  test('handles click on item', async () => {
    const onChange = jest.fn()

    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataUnGrouped}
        placeholder="placeholder"
        placeholderSearch="placeholdersearch"
        onChange={onChange}
      />,
    )
    const input = screen.getByTestId('select-bar')

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
    const input = screen.getByTestId('select-bar')
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
    await userEvent.keyboard('aa')
    await userEvent.keyboard('[Enter]')

    for (const option of options) {
      expect(option).not.toBeVisible()
    }
    const emptyState = screen.getByText('No options')
    expect(emptyState).toBeVisible()

    await userEvent.keyboard('[Backspace]')
    await userEvent.keyboard('[Enter]')
    expect(screen.getByRole('checkbox', { name: /earth/i })).toBeChecked()
  })
  test('renders with searchable and closest value - multiselect & grouped data', async () => {
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
    const input = screen.getByTestId('select-bar')
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
    await userEvent.keyboard('aa')
    await userEvent.keyboard('[Enter]')

    for (const option of options) {
      expect(option).not.toBeVisible()
    }
    const emptyState = screen.getByText('No options')
    expect(emptyState).toBeVisible()

    await userEvent.keyboard('[Backspace]')
    await userEvent.keyboard('[Enter]')
    expect(screen.getByRole('checkbox', { name: /earth/i })).toBeChecked() // with searchText defined
    await userEvent.keyboard(
      '[Backspace][Backspace][Backspace][Backspace][Backspace]',
    )
    await userEvent.keyboard('mer')
    await userEvent.keyboard('[Enter]')
    expect(screen.getByRole('checkbox', { name: /mercury/i })).toBeChecked() // searchText undefined
  })

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    })
  })

  test('renders correctly selected tags when multiselect', async () => {
    renderWithTheme(
      <SelectInputV2
        name="test"
        options={dataGrouped}
        multiselect
        placeholder="placeholder"
        value={dataGrouped['jovian planets'][1]}
        onChange={(values: (string | undefined)[]) => values}
        optionalInfoPlacement="left"
        direction="column"
      />,
    )

    const closeTag = screen.getByTestId('close-tag')
    const tag = screen.getByTestId('selected-options-tags')
    expect(tag).toBeVisible()
    await userEvent.click(closeTag)
    expect(tag).not.toBeVisible()

    const input = screen.getByTestId('select-bar')
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

    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const selectAll = screen.getByRole('checkbox', {
      name: 'Select all',
    })
    await userEvent.click(selectAll)
    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()

    const venus = screen.getByRole('option', { name: /Venus/i })
    const earth = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    await userEvent.click(venus)
    expect(selectAll).not.toBeChecked()
    await userEvent.click(venus)
    expect(selectAll).toBeChecked()

    await userEvent.click(selectAll)
    expect(screen.getByText('placeholder')).toBeInTheDocument()

    await userEvent.click(selectAll)
    await userEvent.click(earth)
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(earth).toBeChecked()
  })
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

    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const selectAll = screen.getByRole('checkbox', {
      name: 'Select all',
    })
    await userEvent.click(selectAll)
    const plustag = screen.getByTestId('plus-tag')
    expect(plustag).toBeInTheDocument()

    const venus = screen.getByRole('option', { name: /Venus/i })
    const earth = screen.getByRole('checkbox', {
      name: /earth/i,
    })
    await userEvent.click(venus)
    expect(selectAll).not.toBeChecked()
    await userEvent.click(venus)
    expect(selectAll).toBeChecked()

    await userEvent.click(selectAll)
    expect(screen.getByText('placeholder')).toBeInTheDocument()

    await userEvent.click(selectAll)
    await userEvent.click(earth)
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(earth).toBeChecked()

    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(selectAll).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAll).toBeChecked()
  })

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

    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const selectAllGroup = screen.getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
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

    await userEvent.click(mercury)
    expect(selectAllGroup).not.toBeChecked()

    await userEvent.click(mercury)
    expect(selectAllGroup).toBeChecked()
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

    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const selectAllGroup = screen.getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
    await userEvent.click(selectAllGroup)
    const earth = screen.getByRole('checkbox', {
      name: /earth/i,
    })

    await userEvent.click(earth)
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ea')
    await userEvent.keyboard('[Enter]')

    expect(selectAllGroup).toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroup).not.toBeChecked()
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

    const input = screen.getByTestId('select-bar')
    await userEvent.click(input)
    const selectAllGroup = screen.getByRole('checkbox', {
      name: 'TERRESTRIAL PLANETS',
    })
    await userEvent.click(selectAllGroup)
    const venus = screen.getByRole('checkbox', {
      name: /venus/i,
    })

    const selectAll = screen.getByRole('checkbox', {
      name: 'Select all',
    })
    await userEvent.click(selectAll)

    await userEvent.click(venus)
    await userEvent.click(screen.getByTestId('search-bar'))

    await userEvent.keyboard('ve')
    await userEvent.keyboard('[Enter]')

    expect(venus).toBeChecked()
    expect(selectAllGroup).toBeChecked()
    expect(selectAll).toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroup).not.toBeChecked()
    expect(selectAll).not.toBeChecked()

    await userEvent.click(selectAllGroup)
    expect(selectAllGroup).toBeChecked()
    expect(selectAll).toBeChecked()

    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(selectAll).not.toBeChecked()
    await userEvent.keyboard('[Enter]')
    expect(selectAll).toBeChecked()
  }, 10000)
})
