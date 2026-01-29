import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { RestoreIcon } from '@ultraviolet/icons/RestoreIcon'
import type { ComponentProps, MouseEvent } from 'react'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'
import { Breadcrumbs } from '..'

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
            onClick={event => {
              setPage(event, item.label)
            }}
            to={item.to}
          >
            {item.label}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
      <Stack gap={2}>
        <Separator />
        <Stack direction="row" gap={1}>
          <div style={{ width: 'fit-content' }}>
            <Button
              onClick={() => {
                setValue(ITEMS)
              }}
              sentiment="neutral"
              size="small"
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
              sentiment="primary"
              size="small"
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
              sentiment="primary"
              size="small"
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
