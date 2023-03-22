import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { Tooltip } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('Tooltip', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshot(<Tooltip text="test">Hover me</Tooltip>))

  test('should render correctly without text', () =>
    shouldMatchEmotionSnapshot(<Tooltip>Hover me</Tooltip>))

  test(`should display tooltip on hover`, async () => {
    renderWithTheme(
      <Tooltip id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
  })

  test(`should display tooltip on hover with function children`, async () => {
    renderWithTheme(
      <Tooltip id="test" text="test success!">
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

  test(`should display tooltip on hover and hide when exit`, async () => {
    renderWithTheme(
      <Tooltip id="test" text="test success!">
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

  test(`should display tooltip on hover and hide when exit and hover back before animation ends`, async () => {
    renderWithTheme(
      <Tooltip id="test" text="test success!">
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

  test(`should create tooltip with random id`, async () => {
    renderWithTheme(
      <Tooltip text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
  })

  test(`should renders tooltip with maxWidth`, async () => {
    renderWithTheme(
      <Tooltip text="test success!" maxWidth={100}>
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const tooltipPortal = screen.getByText('test success!')
    expect(tooltipPortal).toBeVisible()
  })

  describe(`defined placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, async () => {
        renderWithTheme(
          <Tooltip
            text="test success!"
            placement={placement as ComponentProps<typeof Tooltip>['placement']}
          >
            <p data-testid="children">Hover me</p>
          </Tooltip>,
        )

        const input = screen.getByTestId('children')
        await userEvent.hover(input)

        const tooltipPortal = screen.getByText('test success!')
        expect(tooltipPortal).toBeVisible()
      })
    })
  })
})
