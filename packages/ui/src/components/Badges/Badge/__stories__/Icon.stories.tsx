import type { StoryFn } from '@storybook/react-vite'
import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { Badge } from '..'
import { Stack } from '../../../Layout/Stack'

export const Icon: StoryFn = props => (
  <Stack gap={2} alignItems="start">
    <Badge {...props}>
      <InformationOutlineIcon size={props['size'] === 'xsmall' || props['size'] === 'small' ? 'xsmall' : 'small'} />
      Badge
    </Badge>
    Avoid:
    <Badge {...props} accessibleLabel="Information">
      <InformationOutlineIcon size={props['size'] === 'xsmall' || props['size'] === 'small' ? 'xsmall' : 'small'} />
    </Badge>
  </Stack>
)

Icon.args = {
  sentiment: 'primary',
}

Icon.parameters = {
  docs: {
    description: {
      story:
        'Icons can be added inside a badge. If an icon-only badge is used and conveys meaning, label it with `accessibleLabel`.',
    },
  },
}
