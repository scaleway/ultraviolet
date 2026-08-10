import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SettingsIcon } from '@ultraviolet/icons'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Tooltip } from '..'
import { TextInput } from '../../TextInput'

describe('tooltip', () => {
  it('should render a focusable wrapper div around the children if a text is provided', () => {
    const { asFragment } = renderWithTheme(<Tooltip text="test">Hover me</Tooltip>, consoleLightTheme)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the children directly if no text is provided', () => {
    const { asFragment } = renderWithTheme(<Tooltip>Hover me</Tooltip>, consoleLightTheme)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not add a tabindex on the wrapper div if there is an interactive element in the children', () => {
    const { asFragment } = renderWithTheme(
      <Tooltip text="test">
        <div className="some complex component">
          <button type="button">interactive element</button>
        </div>
      </Tooltip>,
      consoleLightTheme,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not add a wrapper div if the children are a function', () => {
    const { asFragment } = renderWithTheme(
      <Tooltip delay={{ open: 0 }}>{() => <span>Hover me</span>}</Tooltip>,
      consoleLightTheme,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display the tooltip on hover and hide when exit', async () => {
    renderWithTheme(
      <Tooltip delay={{ open: 0 }} text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )
    expect(screen.queryByText('test success!')).not.toBeInTheDocument()

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByRole('tooltip', { name: 'test success!' })
    expect(tooltipPortal).toBeVisible()

    await userEvent.unhover(input)
    expect(tooltipPortal).not.toBeVisible()
  })

  it('should display the tooltip on hover with function children', async () => {
    renderWithTheme(
      <Tooltip delay={{ open: 0 }} text="test success!">
        {props => (
          <p {...props} data-testid="children">
            Hover me
          </p>
        )}
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByRole('tooltip', { name: 'test success!' })
    expect(tooltipPortal).toBeVisible()
  })

  it('should renders tooltip with maxWidth', async () => {
    renderWithTheme(
      <Tooltip delay={{ open: 0 }} maxWidth={100} text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByRole('tooltip', { name: 'test success!' })
    expect(tooltipPortal).toHaveStyle('max-width: 100px')
  })

  describe('defined placement', () => {
    it.each(['top', 'left', 'right', 'bottom'] as const)(
      `should renders tooltip with placement %s`,
      async placement => {
        renderWithTheme(
          <Tooltip
            delay={{ open: 0 }}
            placement={placement as ComponentProps<typeof Tooltip>['placement']}
            text="test success!"
          >
            <p data-testid="children">Hover me</p>
          </Tooltip>,
        )

        const children = screen.getByTestId('children')
        await userEvent.hover(children)

        const tooltipPortal = screen.getByRole('tooltip', { name: 'test success!' })
        expect(tooltipPortal).toBeVisible()
        expect(tooltipPortal).toHaveAttribute('data-placement', placement)
      },
    )
  })

  it('should open with focus (Tab) and close with Escape', async () => {
    renderWithTheme(
      <Tooltip delay={{ open: 0 }} maxWidth={100} text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    await userEvent.keyboard('{Tab}')

    const tooltipPortal = screen.getByRole('tooltip', { name: 'test success!' })
    expect(tooltipPortal).toBeVisible()

    await userEvent.keyboard('{Escape}')
    expect(tooltipPortal).not.toBeVisible()
  })

  it('should display tooltip when controlled with visible prop', () => {
    renderWithTheme(
      <Tooltip text="controlled content" visible>
        <p>Hover me</p>
      </Tooltip>,
    )

    expect(screen.getByText('controlled content')).toBeVisible()
  })

  it('should call onOpenChange when the tooltip opens', async () => {
    const onOpenChange = vi.fn()
    renderWithTheme(
      <Tooltip delay={{ open: 0 }} onOpenChange={onOpenChange} text="opened">
        <p>Hover me</p>
      </Tooltip>,
    )

    await userEvent.hover(screen.getByText('Hover me'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('should link the tooltip to an interactive trigger as an accessible description', async () => {
    renderWithTheme(
      <Tooltip delay={{ open: 0 }} text="description">
        <button type="button">Hover me</button>
      </Tooltip>,
    )

    const trigger = screen.getByRole('button', { name: 'Hover me' })
    expect(trigger).not.toHaveAccessibleDescription()

    await userEvent.hover(trigger)
    expect(trigger).toHaveAccessibleDescription('description')
    expect(trigger).toHaveAccessibleName('Hover me')
  })

  it('should link the tooltip to an interactive trigger as an accessible label', async () => {
    renderWithTheme(
      <Tooltip delay={{ open: 0 }} text="the label" role="label">
        <button type="button">
          <SettingsIcon aria-hidden />
        </button>
      </Tooltip>,
    )

    const trigger = screen.getByRole('button')
    expect(trigger).not.toHaveAccessibleDescription()
    expect(trigger).not.toHaveAccessibleName()

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
