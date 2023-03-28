import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})
Disabled.args = {
  header: 'Disabled Card',
  children: ({ disabled }) => (
    <Stack gap={1}>
      <Text as="p" variant="body" disabled={disabled}>
        We are using the disabled state returned from Card to disable its
        children
      </Text>
      <Button disabled={disabled}>Button</Button>
    </Stack>
  ),
  disabled: true,
}
