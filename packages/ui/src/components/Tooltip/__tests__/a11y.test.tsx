import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SettingsIcon } from '@ultraviolet/icons'
import { consoleThemesMap } from '@ultraviolet/themes'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Tooltip } from '..'
import { TextInput } from '../../TextInput'

describe('tooltip - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])(
      'should not have violations when visible (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(
          <Tooltip text="helpful information" visible>
            <button type="button">Trigger</button>
          </Tooltip>,
          currentTheme,
        )

        await expectNoViolations(container)
      },
    )
  })

  describe('interactions', () => {
    it('should open with focus (Tab) and close with Escape', async () => {
      renderWithTheme(
        <Tooltip delay={{ open: 0 }} maxWidth={100} text="test success!">
          <p data-testid="children">Hover me</p>
        </Tooltip>,
      )

      await userEvent.tab()

      const tooltipPortal = screen.getByRole('tooltip', { name: 'test success!' })
      expect(tooltipPortal).toBeVisible()

      await userEvent.keyboard('{Escape}')
      expect(tooltipPortal).not.toBeVisible()
    })

    it('should link the tooltip to a focusable wrapper div if there is no interactive element inside', async () => {
      renderWithTheme(
        <Tooltip delay={{ open: 0 }} text="the description">
          <span>Hover me</span>
        </Tooltip>,
      )

      const textTrigger = screen.getByText('Hover me')
      const trigger = textTrigger.parentElement
      expect(trigger).toHaveAttribute('tabindex', '0')
      expect(trigger).not.toHaveAccessibleDescription()

      await userEvent.hover(textTrigger)

      expect(trigger).toHaveAccessibleDescription('the description')
    })

    it('should be hoverable (pointer-events not disabled)', async () => {
      renderWithTheme(
        <Tooltip delay={{ open: 0, close: 0 }} text="hoverable content">
          <p>Hover me</p>
        </Tooltip>,
      )

      await userEvent.hover(screen.getByText('Hover me'))

      const tooltip = await screen.findByText('hoverable content')
      await userEvent.hover(tooltip)
      expect(tooltip).toBeVisible()
    })
  })

  describe('label, description', () => {
    it('should link the tooltip to an interactive trigger as an accessible description', async () => {
      renderWithTheme(
        <Tooltip delay={{ open: 0 }} text="description">
          <button type="button">Hover me</button>
        </Tooltip>,
      )

      const trigger = screen.getByRole('button', { name: 'Hover me' })
      // don't render the tooltip at page load to avoid flooding the DOM
      expect(trigger).not.toHaveAccessibleDescription()

      await userEvent.hover(trigger)
      expect(trigger).toHaveAccessibleDescription('description')
      expect(trigger).toHaveAccessibleName('Hover me')
    })

    it('should link the tooltip to an interactive trigger as an accessible label', async () => {
      renderWithTheme(
        <Tooltip delay={{ open: 0 }} text="the label" relation="label">
          <button type="button">
            <SettingsIcon aria-hidden />
          </button>
        </Tooltip>,
      )

      const trigger = screen.getByRole('button')
      expect(trigger).toHaveAccessibleName('the label')
      expect(trigger).not.toHaveAccessibleDescription()

      await userEvent.hover(trigger)
      expect(trigger).toHaveAccessibleName('the label')
      expect(trigger).not.toHaveAccessibleDescription()
    })

    it('should ADD the tooltip text to an existing description', async () => {
      renderWithTheme(
        <Tooltip delay={{ open: 0 }} text="tooltip">
          <TextInput helper="existing description" label="Label" />
        </Tooltip>,
      )

      const trigger = screen.getByRole('textbox', { name: 'Label' })
      expect(trigger).toHaveAccessibleDescription('existing description')

      await userEvent.hover(trigger)
      expect(trigger).toHaveAccessibleDescription('existing description tooltip')
    })

    it('should forward aria-describedby to function children', async () => {
      renderWithTheme(
        <Tooltip delay={{ open: 0 }} id="fn-tooltip" text="description">
          {props => <p {...props}>Hover me</p>}
        </Tooltip>,
      )

      const children = screen.getByText('Hover me')
      await userEvent.hover(children)

      expect(children).toHaveAccessibleDescription('description')
    })
  })
})
