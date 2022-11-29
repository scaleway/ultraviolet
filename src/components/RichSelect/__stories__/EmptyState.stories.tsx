import { ComponentStory } from '@storybook/react'
import RichSelect from '..'
import { Icon, Stack, Text } from '../..'

export const EmptyState: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect
    name="emptyState"
    emptyState={() => (
      <Stack justifyContent="center" alignItems="center" gap={1}>
        <Icon
          color="neutral"
          name="information-outline"
          size={32}
          prominence="strong"
        />
        <Text as="p" variant="bodyStrong">
          There is currently no option available
        </Text>
        <Text as="small" variant="caption">
          Please reload or try again later
        </Text>
      </Stack>
    )}
    {...props}
  />
)

EmptyState.parameters = {
  docs: {
    description: {
      story: 'This shows how to use `emptyState` on RichSelect.',
    },
  },
}
