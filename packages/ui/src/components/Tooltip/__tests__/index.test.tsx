import { act, waitFor } from '@testing-library/react'
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
    const node = renderWithTheme(
      <Tooltip id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    await act(async () => {
      await userEvent.hover(input)
    })
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  test(`should display tooltip on hover with function children`, async () => {
    const node = renderWithTheme(
      <Tooltip id="test" text="test success!">
        {props => (
          <p {...props} data-testid="children">
            Hover me
          </p>
        )}
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    await act(async () => {
      await userEvent.hover(input)
    })
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  test(`should display tooltip on hover and hide when exit`, async () => {
    const node = renderWithTheme(
      <Tooltip id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    await act(async () => {
      await userEvent.hover(input)
    })
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
    await act(async () => {
      await userEvent.unhover(input)
    })
    await waitFor(() => {
      expect(tooltipPortal).not.toBeVisible()
    })
  })

  test(`should display tooltip on hover and hide when exit and hover back before animation ends`, async () => {
    const node = renderWithTheme(
      <Tooltip id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    await act(async () => {
      await userEvent.hover(input)
    })
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
    await act(async () => {
      await userEvent.unhover(input)
      await userEvent.hover(input)
    })
    expect(tooltipPortal).toBeVisible()
  })

  test(`should create tooltip with random id`, async () => {
    const node = renderWithTheme(
      <Tooltip text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    await act(async () => {
      await userEvent.hover(input)
    })
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  test(`should renders tooltip with maxWidth`, async () => {
    const node = renderWithTheme(
      <Tooltip text="test success!" maxWidth={100}>
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    await act(async () => {
      await userEvent.hover(input)
    })
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  describe(`defined placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, async () => {
        const node = renderWithTheme(
          <Tooltip
            text="test success!"
            placement={placement as ComponentProps<typeof Tooltip>['placement']}
          >
            <p data-testid="children">Hover me</p>
          </Tooltip>,
        )

        const input = node.getByTestId('children') as HTMLInputElement
        await act(async () => {
          await userEvent.hover(input)
        })
        const tooltipPortal = node.getByText(
          'test success!',
        ) as HTMLInputElement
        expect(tooltipPortal).toBeVisible()
      })
    })
  })
})
