import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Tooltip } from '..'

describe('tooltip', () => {
  describe('wrapper div', () => {
    it('should render a focusable wrapper div around the children if a text is provided', () => {
      const { asFragment, container } = renderWithTheme(<Tooltip text="test">Hover me</Tooltip>, consoleLightTheme)
      expect(container.querySelector('[tabindex="0"]')).toBeDefined()
      expect(asFragment()).toMatchSnapshot()
    })

    it('should render the children directly if no text is provided', () => {
      const { asFragment } = renderWithTheme(<Tooltip>Hover me</Tooltip>, consoleLightTheme)
      expect(asFragment()).toMatchSnapshot()
    })

    it('should not add a tabindex on the wrapper div if there is an interactive element in the children', () => {
      const { asFragment, container } = renderWithTheme(
        <Tooltip text="test">
          <div className="some complex component">
            <button type="button">interactive element</button>
          </div>
        </Tooltip>,
        consoleLightTheme,
      )
      expect(container.querySelector('[tabindex="0"]')).toBeNull()
      expect(asFragment()).toMatchSnapshot()
    })

    it('should not add a wrapper div if the children are a function', () => {
      const { asFragment } = renderWithTheme(<Tooltip>{() => <span>Hover me</span>}</Tooltip>, consoleLightTheme)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('open / close', () => {
    it('should display the tooltip on hover and hide when exit', async () => {
      renderWithTheme(
        <Tooltip text="test success!">
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
        <Tooltip text="test success!">
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
        <Tooltip onOpenChange={onOpenChange} text="opened">
          <p>Hover me</p>
        </Tooltip>,
      )

      await userEvent.hover(screen.getByText('Hover me'))
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('position / size', () => {
    it('should renders tooltip with maxWidth', async () => {
      renderWithTheme(
        <Tooltip maxWidth={100} text="test success!">
          <p data-testid="children">Hover me</p>
        </Tooltip>,
      )

      const input = screen.getByTestId('children')
      await userEvent.hover(input)

      const tooltipPortal = screen.getByRole('tooltip', { name: 'test success!' })
      expect(tooltipPortal).toHaveStyle('max-width: 100px')
    })

    it.each(['top', 'left', 'right', 'bottom'] as const)(
      `should renders tooltip with placement %s`,
      async placement => {
        renderWithTheme(
          <Tooltip placement={placement as ComponentProps<typeof Tooltip>['placement']} text="test success!">
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
})
