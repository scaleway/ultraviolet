import type { StoryFn } from '@storybook/react-vite'
import { PencilIcon } from '@ultraviolet/icons'
import { Stack } from '../..'
import { Button, buttonVariants } from '..'

export const AsLink: StoryFn<typeof Button> = () => (
  <Stack alignItems="center" gap={2} direction="row">
    {buttonVariants.map(variant => (
      <Button
        href="https://ultraviolet.scaleway.com/"
        target="_blank"
        key={variant}
        onClick={() => {}}
        variant={variant}
      >
        <PencilIcon />
        Click me
      </Button>
    ))}
  </Stack>
)

AsLink.parameters = {
  docs: {
    description: {
      story:
        'Provide an `href` to turn the button as an anchor element. Adding `href` also allow to add `download` and `target` properties. `name` prop is not allowed in a anchor element.',
    },
  },
}
