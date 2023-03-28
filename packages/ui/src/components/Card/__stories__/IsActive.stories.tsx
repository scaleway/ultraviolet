import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Template } from './Template.stories'

export const IsActive = Template.bind({})
IsActive.args = {
  header: 'Active Card',
  children: (
    <Stack gap={1} direction="row" justifyContent="space-between">
      <Text as="p" variant="body">
        This card is currently highlighted through isActive prop. In this
        example we use it to show the content is being edited.
      </Text>
      <Stack gap={1} direction="row">
        <Button variant="success-bordered" icon="check" size="small" />
        <Button variant="warning-bordered" icon="cancel" size="small" />
      </Stack>
    </Stack>
  ),
  isActive: true,
}
