import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, test } from 'vitest'
import { Tooltip } from '..'

describe('tooltip', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithTheme(
      <Tooltip debounceDelay={0} text="test">
        Hover me
      </Tooltip>,
      consoleLightTheme,
      {
        container: document.body,
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly without text', () => {
    const { asFragment } = renderWithTheme(
      <Tooltip debounceDelay={0}>Hover me</Tooltip>,
      consoleLightTheme,
      {
        container: document.body,
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should display tooltip on hover', async () => {
    renderWithTheme(
      <Tooltip debounceDelay={0} id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
  })

  test('should display tooltip on hover with function children', async () => {
    renderWithTheme(
      <Tooltip debounceDelay={0} id="test" text="test success!">
        {props => (
          <p {...props} data-testid="children">
            Hover me
          </p>
        )}
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
  })

  test('should display tooltip on hover and hide when exit', async () => {
    renderWithTheme(
      <Tooltip debounceDelay={0} id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
    await userEvent.unhover(input)

    await waitFor(() => {
      expect(tooltipPortal).not.toBeVisible()
    })
  })

  test('should display tooltip on hover and hide when exit and hover back before animation ends', async () => {
    renderWithTheme(
      <Tooltip debounceDelay={0} id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
    await userEvent.unhover(input)
    await userEvent.hover(input)
    expect(tooltipPortal).toBeVisible()
  })

  test('should create tooltip with random id', async () => {
    renderWithTheme(
      <Tooltip debounceDelay={0} text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
  })

  test('should renders tooltip with maxWidth', async () => {
    renderWithTheme(
      <Tooltip debounceDelay={0} maxWidth={100} text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
  })

  describe('defined placement', () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, async () => {
        renderWithTheme(
          <Tooltip
            debounceDelay={0}
            placement={placement as ComponentProps<typeof Tooltip>['placement']}
            text="test success!"
          >
            <p data-testid="children">Hover me</p>
          </Tooltip>,
        )

        const children = screen.getByTestId('children')
        await userEvent.hover(children)

        const tooltipPortal = screen.getByText('test success!')
        expect(tooltipPortal).toBeVisible()
      })
    })
  })

  test('should verify accessibility', async () => {
    renderWithTheme(
      <Tooltip debounceDelay={0} maxWidth={100} text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    await userEvent.keyboard('{Tab}')

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(tooltipPortal).not.toBeVisible()
    })
  })
})
