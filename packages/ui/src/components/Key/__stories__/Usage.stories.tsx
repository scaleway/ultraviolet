import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { Key } from '..'

export const Usage: StoryFn<typeof Key> = () => {
  const [counter, setCounter] = useState(0)
  const updateCounter = useCallback(
    (amount?: number) => setCounter(counter + (amount ?? 1)),
    [counter],
  )

  useEffect(() => {
    const shortcutFunction = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'c') {
        updateCounter()
      }
      if (key === 'T') {
        updateCounter(10)
      }
      if (key === 'r') {
        setCounter(0)
      }
    }

    document.addEventListener('keydown', shortcutFunction)

    return () => document.removeEventListener('keydown', shortcutFunction)
  }, [updateCounter])

  return (
    <Stack gap={1}>
      To add to counter, click on the button or use the shortcut (see tooltip on
      hover of the button)
      <Tooltip
        text={
          <Stack direction="row" gap={1}>
            Or use a shortcut: <Key prominence="strong">C</Key>
          </Stack>
        }
      >
        <Button fullWidth onClick={() => updateCounter()}>
          Click me
        </Button>
      </Tooltip>
      <Stack direction="row" gap="0.5">
        Or you can add even more to the counter using <Key>shift</Key>
        <Key>T</Key>
      </Stack>
      <Stack direction="row" gap="0.5">
        And you can reset using
        <Key>R</Key>
      </Stack>
      Counter: {counter}
    </Stack>
  )
}

Usage.args = {
  disabled: false,
  prominence: 'default',
  sentiment: 'neutral',
  size: 'medium',
}

Usage.parameters = {
  docs: {
    description: {
      story: 'The component can be used to display shortcuts',
    },
  },
}
