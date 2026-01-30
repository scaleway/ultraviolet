import type { StoryFn } from '@storybook/react-vite'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { Stack } from '../..'
import { Button } from '..'

const buttonVariants = ['ghost', 'filled', 'outlined'] as const

export const AsLink: StoryFn<typeof Button> = () => (
  <Stack alignItems="center" direction="row" gap={2}>
    {buttonVariants.map(variant => (
      <Button
        href="https://ultraviolet.scaleway.com/"
        key={variant}
        onClick={() => {}}
        target="_blank"
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
