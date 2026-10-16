import type { TupleUnion } from '@scaleway/types'
import { act, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MacMiniProductIcon } from '@ultraviolet/icons/product/MacMiniProductIcon'
import { renderWithTheme } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { SelectableCard } from '..'
import { IllustrationExample } from './illustrationTest'

describe('selectableCard', () => {
  const types: TupleUnion<NonNullable<ComponentProps<typeof SelectableCard>['type']>> = [
    'radio',
    'checkbox',
    'toggle',
  ] as const

  describe.each(types)('%s', type => {
    it('renders correctly with default props', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          label="test"
          name="test"
          onChange={() => {
            /* empty */
          }}
          value="choice"
        >
          SelectableCard
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with aria label', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          aria-label="test"
          name="test"
          onChange={() => {
            /* empty */
          }}
          value="choice"
        >
          SelectableCard
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with showTick', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          aria-label="test"
          name="test"
          onChange={() => {
            /* empty */
          }}
          showTick
          type={type}
          value="choice"
        >
          SelectableCard
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with checked prop', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          aria-label="test"
          checked
          name="test"
          onChange={() => {
            /* empty */
          }}
          type={type}
          value="choice"
        >
          SelectableCard
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with disabled prop', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          aria-label="test"
          disabled
          name="test"
          onChange={() => {
            /* empty */
          }}
          type={type}
          value="choice"
        >
          SelectableCard
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with isError prop', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          isError
          label="test"
          name="test"
          onChange={() => {
            /* empty */
          }}
          type={type}
          value="choice"
        >
          SelectableCard
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with tooltip prop', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          label="test"
          name="test"
          onChange={() => {
            /* empty */
          }}
          tooltip="test"
          type={type}
          value="choice"
        >
          SelectableCard
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with complex children', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          disabled
          label="test"
          name="test"
          onChange={() => {
            /* empty */
          }}
          type={type}
          value="choice"
        >
          {({ checked, disabled }) => (
            <div
              style={{
                // oxlint-disable-next-line vitest/no-conditional-in-test
                background: disabled ? 'gray' : 'green',
                // oxlint-disable-next-line vitest/no-conditional-in-test
                color: checked ? 'green' : 'gray',
              }}
            >
              Complex SelectableCard
            </div>
          )}
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with labelDescription', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          disabled
          label="test"
          name="test"
          onChange={() => {
            /* empty */
          }}
          type={type}
          value="choice"
          labelDescription="description"
          labelDescriptionInline
        >
          child
        </SelectableCard>,
      )

      const radio = screen.getByRole(type === 'toggle' ? 'checkbox' : type)
      expect(radio).toHaveAccessibleName('test')
      expect(screen.getByText('description')).toBeInTheDocument()
      expect(screen.getByText('child')).toBeInTheDocument()

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with illustration', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          illustration={<IllustrationExample />}
          label="label"
          name="label-14"
          onChange={() => {
            /* empty */
          }}
          showTick
          type={type}
          value="label-14"
        >
          Offer the best experience to your Mac, iPhone and iPad users with VNC, the remote desktop-sharing protocol.
          Learn more
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with indented disabled', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          indented={false}
          label="label"
          name="label-14"
          onChange={() => {
            /* empty */
          }}
          showTick
          type={type}
          value="label-14"
        >
          Offer the best experience to your Mac, iPhone and iPad users with VNC, the remote desktop-sharing protocol.
          Learn more
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with productIcon', () => {
      const { asFragment } = renderWithTheme(
        <SelectableCard
          label="label"
          name="label-14"
          onChange={() => {
            /* empty */
          }}
          productIcon={<MacMiniProductIcon size="xlarge" />}
          showTick
          type={type}
          value="label-14"
        >
          Offer the best experience to your Mac, iPhone and iPad users with VNC, the remote desktop-sharing protocol.
          Learn more
        </SelectableCard>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('accessibility working with space key pressed to select', async () => {
      const onChange = vi.fn()

      renderWithTheme(
        <SelectableCard label="test" name="test" onChange={onChange} type={type} value="choice">
          {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
        </SelectableCard>,
      )

      const button = screen.getByRole('button')
      act(() => button.focus())

      await userEvent.keyboard('[Space]')
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('should trigger onChange when click on the label using getByLabelText', async () => {
      const onChange = vi.fn()

      renderWithTheme(
        <SelectableCard label="test" name="test" onChange={onChange} type={type} value="choice">
          {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
        </SelectableCard>,
      )

      const label = screen.getByLabelText('test')
      await userEvent.click(label)

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('should trigger onChange when click on the label using getByRole', async () => {
      const onChange = vi.fn()

      renderWithTheme(
        <SelectableCard label="labelName" name="test" onChange={onChange} type={type} value="choice">
          {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
        </SelectableCard>,
      )

      // oxlint-disable-next-line vitest/no-conditional-in-test
      const role = type === 'toggle' ? 'checkbox' : type
      const label = screen.getByRole(role, {
        name: 'labelName',
      })
      await userEvent.click(label)

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('should trigger onChange when click on the card', async () => {
      const onChange = vi.fn()

      renderWithTheme(
        <SelectableCard label="test" name="test" onChange={onChange} type={type} value="choice">
          {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
        </SelectableCard>,
      )

      const card = screen.getByRole('button')
      await userEvent.click(card)

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })
  })
})
