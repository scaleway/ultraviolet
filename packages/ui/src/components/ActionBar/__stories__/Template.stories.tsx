import type { StoryFn } from '@storybook/react'
import { DeleteIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { ActionBar } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Template: StoryFn<typeof ActionBar> = args => {
  const [state, setState] = useState(false)

  const toggle = () => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, 5000)
  }

  return (
    <>
      <Button onClick={toggle}>Click on me to display</Button>
      {state ? (
        <ActionBar {...args}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            flex="1 1 auto"
            width="100%"
          >
            <div>I am the Playground Action Bar</div>
            <Button variant="outlined" sentiment="danger" size="small">
              <DeleteIcon />
            </Button>
          </Stack>
        </ActionBar>
      ) : null}
    </>
  )
}
