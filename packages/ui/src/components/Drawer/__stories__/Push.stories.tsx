import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Drawer } from '..'
import { Stack } from '../../Stack'
import { SelectInput } from '../../SelectInput'
import { useRef } from 'react'

export const DisclosureBody = <Button>Open Drawer (push = body)</Button>
export const DisclosureStack = <Button>Open Drawer (push = ref stack)</Button>

export const Push: StoryFn<typeof Drawer> = args => {
  const stackRef = useRef<HTMLDivElement>(null)

  return (
    <Stack alignItems="center" gap={2} ref={stackRef} width="100%">
      <Drawer {...args} disclosure={DisclosureBody} push="body">
        With a lot of content
      </Drawer>
      <Drawer {...args} disclosure={DisclosureStack} push={stackRef}>
        With a lot of content
      </Drawer>
      <SelectInput options={[]} />
    </Stack>
  )
}

Push.args = {
  header: 'Drawer',
  children: 'children',
}

Push.parameters = {
  docs: {
    description: {
      story:
        'When defined, the drawer will push content in order to appear on the right. When push is set to body, the whole page will be pushed. To specify which element to push, pass its ref to prop `push`.',
    },
  },
}
