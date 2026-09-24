import type { StoryFn } from '@storybook/react-vite'
import { ProfileIcon } from '@ultraviolet/icons'
import { TagLink } from '..'
import { Stack } from '../../../Layout/Stack'
import { SENTIMENTS } from '../styles.css'

export const Sentiment: StoryFn<typeof TagLink> = args => (
  <Stack gap="1">
    {SENTIMENTS.map(sentiment => (
      <TagLink {...args} sentiment={sentiment} key={sentiment} />
    ))}
  </Stack>
)

Sentiment.args = {
  prefixText: 'id',
  link: 'link',
  prefixIcon: <ProfileIcon size="xsmall" />,
  href: '/',
  onClose: () => {},
  copiable: true,
}
