import type { StoryFn } from '@storybook/react'
import { RestoreIcon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { useCallback, useState } from 'react'
import { Breadcrumbs } from '..'
import { Button } from '../../Button'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'

const ITEMS = ['Home', 'Products', 'Instance', 'Overview']

export const OnClick: StoryFn<ComponentProps<typeof Breadcrumbs>> = props => {
  const [value, setValue] = useState(ITEMS)

  const setPage = useCallback(
    (localValue: string) => {
      const index = value.indexOf(localValue)
      setValue(value.slice(0, index + 1))
    },
    [value, setValue],
  )

  return (
    <Stack gap={2}>
      <Breadcrumbs {...props}>
        {value.map(item => (
          <Breadcrumbs.Item
            key={item}
            onClick={() => {
              setPage(item)
            }}
          >
            {item}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
      <Stack gap={2}>
        <Separator />
        <Stack gap={1}>
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
        </Stack>
      </Stack>
    </Stack>
  )
}

OnClick.parameters = {
  docs: {
    description: {
      story:
        'You can use the `onClick` prop to handle the click event on each breadcrumb item. It will change the aspect of the item to style it like a button.',
    },
  },
}
