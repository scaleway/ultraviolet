import { Popover } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'
import { ComponentProps } from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Tooltip', () => {
  test('should render correctly with required props', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test">
        Children
      </Popover>,
    ))

  test('should render correctly with required props and visible', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test" visible>
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
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  describe(`should render correctly with variant`, () => {
    ;['default', 'primary'].forEach(variant => {
      test(`should renders tooltip with placement ${variant}`, async () => {
        await shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            variant={variant as ComponentProps<typeof Popover>['variant']}
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
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  test(`should render visible on mount and close on click on close button`, async () => {
    renderWithTheme(
      <Popover title="Test" content="Test" visible data-testid="popover">
        Children
      </Popover>,
    )

    const popover = screen.getByTestId('popover')
    expect(popover).toBeVisible()

    const closeButton = screen.getByTitle('close')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(popover).not.toBeVisible()
    })
  })
})
