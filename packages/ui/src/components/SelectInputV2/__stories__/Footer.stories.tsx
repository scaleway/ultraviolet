import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Template } from './Template.stories'
import { dataGrouped } from './resources'

export const Footer = Template.bind({})

const PopupFooter = () => (
  <Stack direction="row" gap="1" width="100%">
    <Button variant="outlined" sentiment="primary" fullWidth>
      Button 1
    </Button>
    <Button variant="filled" sentiment="primary" fullWidth>
      Button 2
    </Button>
  </Stack>
)

Footer.args = {
  ...Template.args,
  options: dataGrouped,
  footer: <PopupFooter />,
}
Footer.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

Footer.parameters = {
  docs: {
    description: {
      story: 'Set a custom footer to the dropdown using the `Footer` prop.',
    },
  },
}
