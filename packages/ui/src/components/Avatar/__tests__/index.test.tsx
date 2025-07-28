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
              <Avatar shape={shape} size={size} variant="user" />,
            ))

          it('renders correctly with variant image', () =>
            shouldMatchEmotionSnapshot(
              <Avatar
                image={support}
                shape={shape}
                size={size}
                variant="image"
              />,
            ))

          it('renders correctly with variant text', () =>
            shouldMatchEmotionSnapshot(
              <Avatar shape={shape} size={size} text="UV" variant="text" />,
            ))

          it('renders correctly with variant text and sentiment neutral', () =>
            shouldMatchEmotionSnapshot(
              <Avatar
                sentiment="neutral"
                shape={shape}
                size={size}
                text="UV"
                variant="text"
              />,
            ))

          it('renders correctly with variant icon', () =>
            shouldMatchEmotionSnapshot(
              <Avatar shape={shape} size={size} variant="icon">
                <MosaicIcon />
              </Avatar>,
            ))

          it('renders correctly with variant icon and sentiment neutral', () =>
            shouldMatchEmotionSnapshot(
              <Avatar
                sentiment="neutral"
                shape={shape}
                size={size}
                variant="icon"
              >
                <MosaicIcon />
              </Avatar>,
            ))

          it('renders correctly with variant colors', () =>
            shouldMatchEmotionSnapshot(
              <Avatar shape={shape} size={size} variant="colors" />,
            ))

          it('renders correctly with variant text and upload', async () => {
            const onClick = vi.fn()
            const { asFragment } = renderWithTheme(
              <Avatar
                data-testid="avatar"
                onClick={onClick}
                shape={shape}
                size={size}
                text="UV"
                upload
                variant="text"
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
