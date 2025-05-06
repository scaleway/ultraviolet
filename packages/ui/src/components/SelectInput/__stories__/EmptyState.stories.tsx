import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Stack, Text } from '../..'
import { Template } from './Template.stories'

export const EmptyState = Template.bind({})
EmptyState.args = {
  name: 'emptyState',
  emptyState: () => (
    <Stack justifyContent="center" alignItems="center" gap={1}>
      <InformationOutlineIcon
        size="large"
        prominence="strong"
        sentiment="neutral"
      />
      <Text as="p" variant="bodyStrong">
        There is currently no option available
      </Text>
      <Text as="small" variant="caption">
        Please reload or try again later
      </Text>
    </Stack>
  ),
}
EmptyState.parameters = {
  docs: {
    description: {
      story: 'This shows how to use `emptyState` on SelectInput.',
    },
  },
}
