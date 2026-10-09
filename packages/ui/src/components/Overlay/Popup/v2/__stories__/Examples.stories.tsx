import { useInteractions, useListNavigation } from '@floating-ui/react'
import type { StoryFn } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { usePopupContext } from '../context'
import { PopupV2 } from '../index'

const MENU_ITEMS = ['Create', 'Edit', 'Delete']

/**
 * Dummy Popover built from the public `PopupV2` API
 */
const Popover = () => (
  <PopupV2.Root>
    <PopupV2.Trigger>
      <Button sentiment="neutral" variant="outlined">
        Popover (dialog)
      </Button>
    </PopupV2.Trigger>
    <PopupV2.Panel role="dialog" aria-labelledby="popover-title">
      <Stack gap={1}>
        <Text id="popover-title" as="p" variant="bodyStrong">
          Popover title
        </Text>
        <Text as="p" variant="bodySmall">
          A Popover with an accessible name and focus restoration.
        </Text>
      </Stack>
    </PopupV2.Panel>
  </PopupV2.Root>
)

const MenuList = () => {
  const { context } = usePopupContext()
  const close = () => context.onOpenChange(false)

  return (
    <>
      <PopupV2.Trigger>
        <Button sentiment="neutral" variant="outlined">
          Menu
        </Button>
      </PopupV2.Trigger>
      <PopupV2.Panel role="menu" accessibleLabel="Actions">
        <Stack>
          {MENU_ITEMS.map(item => (
            <Button
              key={item}
              variant="ghost"
              sentiment={item === 'Delete' ? 'danger' : 'neutral'}
              size="small"
              role="menuitem"
              onClick={close}
              style={{ justifyContent: 'flex-start' }}
            >
              {item}
            </Button>
          ))}
        </Stack>
      </PopupV2.Panel>
    </>
  )
}

/**
 * Dummy Menu built from the public `PopupV2` API
 */
const Menu = () => (
  <PopupV2.Root>
    <MenuList />
  </PopupV2.Root>
)

const OPTIONS = ['Option A', 'Option B', 'Option C']

const SelectList = () => {
  const { context } = usePopupContext()
  const [selected, setSelected] = useState(OPTIONS[0])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<(HTMLElement | null)[]>([])
  const initialFocusRef = useRef<HTMLElement>(null)
  const selectedIndex = OPTIONS.indexOf(selected)

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  })
  const { getFloatingProps, getItemProps } = useInteractions([listNavigation])

  const select = (option: string) => {
    setSelected(option)
    context.onOpenChange(false)
  }

  return (
    <>
      <PopupV2.Trigger>
        <Button sentiment="neutral" variant="outlined">
          {selected}
        </Button>
      </PopupV2.Trigger>
      <PopupV2.Panel role="listbox" accessibleLabel="Choose an option" matchTriggerWidth initialFocus={initialFocusRef}>
        <Stack gap={0.5} {...getFloatingProps()}>
          {OPTIONS.map((option, index) => (
            <Button
              key={option}
              ref={(node: HTMLElement) => {
                listRef.current[index] = node
                if (index === selectedIndex) {
                  initialFocusRef.current = node
                }
              }}
              size="small"
              variant="ghost"
              sentiment={selected === option ? 'primary' : 'neutral'}
              type="button"
              role="option"
              aria-selected={selected === option}
              tabIndex={index === activeIndex ? 0 : -1}
              style={{ justifyContent: 'flex-start' }}
              {...getItemProps({ onClick: () => select(option) })}
            >
              {option}
            </Button>
          ))}
        </Stack>
      </PopupV2.Panel>
    </>
  )
}

/**
 * Dummy Select built from the public `PopupV2` API.
 */
const Select = () => (
  <PopupV2.Root>
    <SelectList />
  </PopupV2.Root>
)

export const Examples: StoryFn<typeof PopupV2> = () => (
  <Stack gap={2} direction="row">
    <Popover />
    <Menu />
    <Select />
  </Stack>
)
