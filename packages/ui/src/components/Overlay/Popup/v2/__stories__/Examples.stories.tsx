import { useInteractions, useListNavigation } from '@floating-ui/react'
import type { StoryFn } from '@storybook/react-vite'
import { theme } from '@ultraviolet/themes'
import { useRef, useState } from 'react'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { usePopupContext } from '../context'
import { Popup } from '../index'

const MENU_ITEMS = ['Create', 'Edit', 'Delete']

/**
 * Dummy Popover built from the public `Popup` API
 */
const Popover = () => (
  <Popup.Root>
    <Popup.Trigger>
      <Button sentiment="neutral" variant="outlined">
        Popover (dialog)
      </Button>
    </Popup.Trigger>
    <Popup.Panel role="dialog" aria-labelledby="popover-title">
      <Stack gap={1} style={{ padding: theme.space['2'] }}>
        <Text id="popover-title" as="p" variant="bodyStrong">
          Popover title
        </Text>
        <Text as="p" variant="bodySmall">
          A Popover with an accessible name and focus restoration.
        </Text>
      </Stack>
    </Popup.Panel>
  </Popup.Root>
)

const MenuList = () => {
  const { context } = usePopupContext()
  const close = () => context.onOpenChange(false)

  return (
    <>
      <Popup.Trigger>
        <Button sentiment="neutral" variant="outlined">
          Menu
        </Button>
      </Popup.Trigger>
      <Popup.Panel role="menu" accessibleLabel="Actions">
        <Stack style={{ padding: theme.space['0.5'] }}>
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
      </Popup.Panel>
    </>
  )
}

/**
 * Dummy Menu built from the public `Popup` API
 */
const Menu = () => (
  <Popup.Root>
    <MenuList />
  </Popup.Root>
)

const OPTIONS = ['Option A', 'Option B', 'Option C']

const SelectList = () => {
  const { context } = usePopupContext()
  const [selected, setSelected] = useState(OPTIONS[0])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<(HTMLElement | null)[]>([])
  const selectedIndex = OPTIONS.indexOf(selected)

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  })
  const { getFloatingProps, getItemProps, getReferenceProps } = useInteractions([listNavigation])

  const select = (option: string) => {
    setSelected(option)
    context.onOpenChange(false)
  }

  return (
    <>
      <Popup.Trigger>
        <Button sentiment="neutral" variant="outlined" {...getReferenceProps()}>
          {selected}
        </Button>
      </Popup.Trigger>
      <Popup.Panel role="listbox" accessibleLabel="Choose an option" matchTriggerWidth>
        <Stack gap={0.5} style={{ padding: theme.space['0.5'] }} {...getFloatingProps()}>
          {OPTIONS.map((option, index) => (
            <Button
              key={option}
              ref={(node: HTMLElement) => {
                listRef.current[index] = node
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
      </Popup.Panel>
    </>
  )
}

/**
 * Dummy Select built from the public `Popup` API.
 */
const Select = () => (
  <Popup.Root>
    <SelectList />
  </Popup.Root>
)

export const Examples: StoryFn<typeof Popup> = () => (
  <Stack gap={2} direction="row">
    <Popover />
    <Menu />
    <Select />
  </Stack>
)
