import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon } from '@ultraviolet/icons'
import { VisuallyHidden } from '..'
import { Button } from '../../../action/Button'
import { TextInput } from '../../../data-entry/TextInput'
import { Stack } from '../../../layout/Stack'

export const Example: StoryFn<typeof VisuallyHidden> = props => (
  <Stack gap={2} width="fit-content">
    <Button>
      <PlusIcon aria-hidden />
      <VisuallyHidden>Add to cart</VisuallyHidden>
    </Button>
    <TextInput placeholder="John Doe" aria-labelledby="hc_ex_uv" />
    <VisuallyHidden {...props} id="hc_ex_uv">
      Full Name
    </VisuallyHidden>
  </Stack>
)

Example.parameters = {
  docs: {
    description: {
      story:
        'This component can be use to correctly label elements without a clear label: icon-only buttons, inputs without label (do not forget to add `aria-labelledBy`), etc.',
    },
  },
}
