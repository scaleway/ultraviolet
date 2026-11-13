import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { SelectInput } from '..'
import { dataGrouped, dataUnGrouped } from './resources'

describe('selectInput - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])(
      'should not have violations when closed (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<SelectInput label="Label" options={dataUnGrouped} />, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'should not have violations when open (theme: %s)',
      async ([, currentTheme]) => {
        renderWithTheme(
          <main>
            <SelectInput label="Label" options={dataUnGrouped} />
          </main>,
          currentTheme,
        )

        await userEvent.click(screen.getByRole('combobox', { name: 'Label' }))
        const dropdown = screen.getByRole('dialog')
        await waitFor(() => {
          expect(dropdown).toBeVisible()
        })

        // The panel is portaled to document.body, so scan the whole body
        await expectNoViolations(document.body)
      },
    )

    it('should not have violations in multiselect with select-all and group select', async () => {
      renderWithTheme(
        <main>
          <SelectInput
            label="Label"
            multiselect
            options={dataGrouped}
            selectAll={{ label: 'Select all' }}
            selectAllGroup
          />
        </main>,
      )

      await userEvent.click(screen.getByRole('combobox', { name: 'Label' }))
      const dropdown = screen.getByRole('dialog')
      await waitFor(() => {
        expect(dropdown).toBeVisible()
      })

      await expectNoViolations(document.body)
    })

    it('should not have violations with error and required', async () => {
      renderWithTheme(
        <main>
          <SelectInput error="Something went wrong" label="Label" options={dataUnGrouped} required />
        </main>,
      )
      await expectNoViolations(document.body)
    })
  })

  describe('combobox ARIA', () => {
    it('should point aria-controls at the listbox and expose aria-haspopup="listbox"', async () => {
      renderWithTheme(<SelectInput label="Label" options={dataUnGrouped} />)

      const combobox = screen.getByRole('combobox', { name: 'Label' })
      expect(combobox).toHaveAttribute('aria-haspopup', 'listbox')

      await userEvent.click(combobox)
      const dropdown = screen.getByRole('dialog')
      await waitFor(() => {
        expect(dropdown).toBeVisible()
      })

      const listbox = screen.getByRole('listbox', { name: 'Label' })
      expect(combobox).toHaveAttribute('aria-controls', listbox.id)
      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('should surface required and invalid state', () => {
      renderWithTheme(<SelectInput error="Something went wrong" label="Label" options={dataUnGrouped} required />)

      const combobox = screen.getByRole('combobox', { name: 'Label' })
      expect(combobox).toHaveAttribute('aria-required', 'true')
      expect(combobox).toHaveAttribute('aria-invalid', 'true')
    })

    it('should have anx accessible name from the visible label', () => {
      renderWithTheme(<SelectInput label="Pick a planet" options={dataUnGrouped} />)
      expect(screen.getByRole('combobox', { name: 'Pick a planet' })).toBeInTheDocument()
    })

    it('should have an accessible name from accessibleLabel when no label is provided', () => {
      renderWithTheme(<SelectInput accessibleLabel="Pick a planet" options={dataUnGrouped} />)
      expect(screen.getByRole('combobox', { name: 'Pick a planet' })).toBeInTheDocument()
    })
  })

  describe('listbox behaviour', () => {
    it('should use a roving tabindex (only the active option is tabindex 0)', async () => {
      renderWithTheme(<SelectInput label="Label" options={dataUnGrouped} />)

      await userEvent.click(screen.getByRole('combobox', { name: 'Label' }))
      const dropdown = screen.getByRole('dialog')
      await waitFor(() => {
        expect(dropdown).toBeVisible()
      })

      const searchBar = screen.getByRole('textbox', { name: 'search-bar' })
      await waitFor(() => {
        expect(searchBar).toHaveFocus()
      })
      await userEvent.keyboard('[arrowDown]')

      const mercury = screen.getByRole('option', { name: /mercury/i })
      const venus = screen.getByRole('option', { name: /venus/i })
      expect(mercury).toHaveFocus()
      expect(mercury).toHaveAttribute('tabindex', '0')
      expect(venus).toHaveAttribute('tabindex', '-1')
    })

    it('should name options by their visible label, not their value', async () => {
      renderWithTheme(<SelectInput label="Label" options={dataUnGrouped} />)

      await userEvent.click(screen.getByRole('combobox', { name: 'Label' }))
      const dropdown = screen.getByRole('dialog')
      await waitFor(() => {
        expect(dropdown).toBeVisible()
      })

      expect(screen.getByRole('option', { name: 'Mercury' })).toBeInTheDocument()
      expect(screen.queryByRole('option', { name: 'mercury' })).not.toBeInTheDocument()
    })

    it('should not expose nested checkboxes inside listbox options', async () => {
      renderWithTheme(
        <SelectInput
          label="Label"
          multiselect
          options={dataGrouped}
          selectAll={{ label: 'Select all' }}
          selectAllGroup
        />,
      )

      await userEvent.click(screen.getByRole('combobox', { name: 'Label' }))
      const dropdown = screen.getByRole('dialog')
      await waitFor(() => {
        expect(dropdown).toBeVisible()
      })

      const listbox = screen.getByRole('listbox', { name: 'Label' })
      expect(within(listbox).queryByRole('checkbox')).not.toBeInTheDocument()
    })
  })

  describe('status messages', () => {
    it('should announce the number of filtered results via a live region', async () => {
      renderWithTheme(<SelectInput label="Label" options={dataUnGrouped} />)

      await userEvent.click(screen.getByRole('combobox', { name: 'Label' }))
      const dropdown = screen.getByRole('dialog')
      await waitFor(() => {
        expect(dropdown).toBeVisible()
      })

      const searchBar = screen.getByRole('textbox', { name: 'search-bar' })
      const status = screen.getByRole('status')

      await userEvent.type(searchBar, 'venus')
      await waitFor(() => {
        expect(status).toHaveTextContent('1 option available')
      })

      await userEvent.clear(searchBar)
      await userEvent.type(searchBar, 'test-test-test')
      await waitFor(() => {
        expect(status).toHaveTextContent('0 options available')
      })
    })
  })
})
