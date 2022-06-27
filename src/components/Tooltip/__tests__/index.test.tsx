import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'
import Tooltip from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'

describe('Tooltip', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should render correctly', () =>
    shouldMatchEmotionSnapshot(<Tooltip text="test">Hover me</Tooltip>))

  test('should render correctly without text', () =>
    shouldMatchEmotionSnapshot(<Tooltip>Hover me</Tooltip>))

  test(`should display tooltip on hover`, () => {
    const node = renderWithTheme(
      <Tooltip id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    userEvent.hover(input)
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  test(`should display tooltip on hover with function children`, () => {
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
    userEvent.hover(input)
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  test(`should display tooltip on hover and hide when exit`, () => {
    const node = renderWithTheme(
      <Tooltip id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    userEvent.hover(input)
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
    userEvent.unhover(input)
    jest.advanceTimersByTime(230)
    expect(tooltipPortal).not.toBeVisible()
  })

  test(`should display tooltip on hover and hide when exit and hover back before animation ends`, () => {
    const node = renderWithTheme(
      <Tooltip id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    userEvent.hover(input)
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
    userEvent.unhover(input)
    userEvent.hover(input)
    expect(tooltipPortal).toBeVisible()
  })

  test(`should create tooltip with random id`, () => {
    const node = renderWithTheme(
      <Tooltip text="test success!">
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    userEvent.hover(input)
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  test(`should renders tooltip with maxWidth`, () => {
    const node = renderWithTheme(
      <Tooltip text="test success!" maxWidth={100}>
        <p data-testid="children">Hover me</p>
      </Tooltip>,
    )

    const input = node.getByTestId('children') as HTMLInputElement
    userEvent.hover(input)
    const tooltipPortal = node.getByText('test success!') as HTMLInputElement
    expect(tooltipPortal).toBeVisible()
  })

  describe(`placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, () => {
        const node = renderWithTheme(
          <Tooltip
            text="test success!"
            placement={placement as ComponentProps<typeof Tooltip>['placement']}
          >
            <p data-testid="children">Hover me</p>
          </Tooltip>,
        )

        const input = node.getByTestId('children') as HTMLInputElement
        userEvent.hover(input)
        const tooltipPortal = node.getByText(
          'test success!',
        ) as HTMLInputElement
        expect(tooltipPortal).toBeVisible()
      })
    })
  })
})
