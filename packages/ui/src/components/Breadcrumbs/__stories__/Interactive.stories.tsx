import type { StoryFn } from '@storybook/react'
import { PlusIcon, RestoreIcon } from '@ultraviolet/icons'
import {
  type ComponentProps,
  type MouseEvent,
  useCallback,
  useState,
} from 'react'
import { Breadcrumbs } from '..'
import { Button } from '../../Button'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'

type ItemProp = { label: string; to?: string }[]

const ITEMS: ItemProp = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/' },
  { label: 'Instance', to: '/' },
  { label: 'Overview', to: '/' },
]

export const Interactive: StoryFn<
  ComponentProps<typeof Breadcrumbs>
> = props => {
  const [value, setValue] = useState(ITEMS)

  const setPage = useCallback(
    (event: MouseEvent<HTMLLIElement>, localValue: string) => {
      event?.preventDefault()

      const index = value.findIndex(item => item.label === localValue)
      setValue(value.slice(0, index + 1))
    },
    [value, setValue],
  )

  return (
    <Stack gap={2}>
      <Breadcrumbs {...props}>
        {value.map(item => (
          <Breadcrumbs.Item
            key={item.label}
            to={item.to}
            onClick={event => {
              setPage(event, item.label)
            }}
          >
            {item.label}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
      <Stack gap={2}>
        <Separator />
        <Stack gap={1} direction="row">
          <div style={{ width: 'fit-content' }}>
            <Button
              onClick={() => {
                setValue(ITEMS)
              }}
              size="small"
              sentiment="neutral"
            >
              <RestoreIcon />
              Reset
            </Button>
          </div>
          <div style={{ width: 'fit-content' }}>
            <Button
              onClick={() => {
                setValue([
                  ...value,
                  { label: `Page ${value.length + 1}`, to: '/' },
                ])
              }}
              size="small"
              sentiment="primary"
            >
              <PlusIcon />
              Add item
            </Button>
          </div>
          <div style={{ width: 'fit-content' }}>
            <Button
              onClick={() => {
                setValue([...value, { label: `Page ${value.length + 1}` }])
              }}
              size="small"
              sentiment="primary"
            >
              <PlusIcon />
              Add onClick item
            </Button>
          </div>
        </Stack>
      </Stack>
    </Stack>
  )
}

Interactive.parameters = {
  docs: {
    description: {
      story:
        'Try out the breadcrumbs with different items and see how it behaves with this interactive example.',
    },
  },
}
