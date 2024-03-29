import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Template } from './Template.stories'
import { dataGrouped } from './resources'

export const PopupFooter = Template.bind({})

const Footer = () => (
  <Stack direction="row" gap="1" width="100%">
    <Button variant="outlined" sentiment="primary" fullWidth>
      Button 1
    </Button>
    <Button variant="filled" sentiment="primary" fullWidth>
      Button 2
    </Button>
  </Stack>
)

PopupFooter.args = {
  ...Template.args,
  options: dataGrouped,
  popupFooter: <Footer />,
}
PopupFooter.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
