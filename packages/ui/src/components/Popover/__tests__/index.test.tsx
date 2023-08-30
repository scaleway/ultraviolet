import { describe, expect, jest, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { Popover } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('Tooltip', () => {
  test('should render correctly with required props', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test" onClose={() => {}}>
        Children
      </Popover>,
    ))

  test('should render correctly with required props and visible', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test" onClose={() => {}} visible>
        Children
      </Popover>,
    ))

  test('should render correctly with component in content prop', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content={<p>Test</p>} onClose={() => {}} visible>
        Children
      </Popover>,
    ))

  describe(`should render correctly with placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, async () => {
        await shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            placement={placement as ComponentProps<typeof Popover>['placement']}
            onClose={() => {}}
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  describe(`should render correctly with sentiment`, () => {
    ;(['neutral', 'primary'] as const).forEach(sentiment => {
      test(`should renders tooltip with placement ${sentiment}`, async () => {
        await shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            sentiment={sentiment}
            onClose={() => {}}
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  describe(`should render correctly with sizes`, () => {
    ;['small', 'medium', 'large'].forEach(size => {
      test(`should renders tooltip with placement ${size}`, async () => {
        await shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            size={size as ComponentProps<typeof Popover>['size']}
            onClose={() => {}}
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  test(`should render visible on mount and close on click on close button`, async () => {
    const onClose = jest.fn(() => {})

    renderWithTheme(
      <Popover
        title="Test"
        content="Test"
        visible
        data-testid="popover"
        onClose={onClose}
      >
        Children
      </Popover>,
    )

    const popover = screen.getByTestId('popover')
    expect(popover).toBeVisible()

    const closeButton = screen.getByLabelText('close')
    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test(`should render visible on mount and close on click outside`, async () => {
    const onClose = jest.fn(() => {})

    renderWithTheme(
      <div>
        <div style={{ height: '500px', width: '500px' }}>
          <Popover
            title="Test"
            content="Test"
            visible
            data-testid="popover"
            onClose={onClose}
          >
            Children
          </Popover>
        </div>
        <div data-testid="outside-element">Outside element</div>
      </div>,
    )

    const popover = screen.getByTestId('popover')
    expect(popover).toBeVisible()

    const outsideElement = screen.getByTestId('outside-element')
    await userEvent.click(outsideElement)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
