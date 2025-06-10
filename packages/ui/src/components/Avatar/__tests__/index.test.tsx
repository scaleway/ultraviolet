import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MosaicIcon } from '@ultraviolet/icons'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Avatar } from '..'
import support from '../__stories__/assets/avatar.svg'

describe('Avatar', () => {
  describe.each(['circle', 'square'] as const)(
    `renders correctly with shape %s`,
    shape => {
      describe.each(['xsmall', 'small', 'medium', 'large'] as const)(
        `renders correctly with shape ${shape} and size %s`,
        size => {
          it('renders correctly with variant user', () =>
            shouldMatchEmotionSnapshot(
              <Avatar shape={shape} variant="user" size={size} />,
            ))

          it('renders correctly with variant image', () =>
            shouldMatchEmotionSnapshot(
              <Avatar
                shape={shape}
                variant="image"
                image={support}
                size={size}
              />,
            ))

          it('renders correctly with variant text', () =>
            shouldMatchEmotionSnapshot(
              <Avatar shape={shape} variant="text" text="UV" size={size} />,
            ))

          it('renders correctly with variant text and sentiment neutral', () =>
            shouldMatchEmotionSnapshot(
              <Avatar
                shape={shape}
                variant="text"
                text="UV"
                sentiment="neutral"
                size={size}
              />,
            ))

          it('renders correctly with variant icon', () =>
            shouldMatchEmotionSnapshot(
              <Avatar shape={shape} variant="icon" size={size}>
                <MosaicIcon />
              </Avatar>,
            ))

          it('renders correctly with variant icon and sentiment neutral', () =>
            shouldMatchEmotionSnapshot(
              <Avatar
                shape={shape}
                variant="icon"
                sentiment="neutral"
                size={size}
              >
                <MosaicIcon />
              </Avatar>,
            ))

          it('renders correctly with variant colors', () =>
            shouldMatchEmotionSnapshot(
              <Avatar shape={shape} variant="colors" size={size} />,
            ))

          it('renders correctly with variant text and upload', async () => {
            const onClick = vi.fn()
            const { asFragment } = renderWithTheme(
              <Avatar
                shape={shape}
                variant="text"
                text="UV"
                size={size}
                upload
                data-testid="avatar"
                onClick={onClick}
              />,
            )
            const avatar = screen.getByTestId('avatar')

            await userEvent.hover(avatar)
            expect(asFragment()).toMatchSnapshot()

            await userEvent.click(avatar)
            expect(onClick).toHaveBeenCalledOnce()
          })
        },
      )
    },
  )
})
