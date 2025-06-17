import type { StoryFn } from '@storybook/react'
import { SelectInput } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Template } from './Template.stories'
import { dataGrouped } from './resources'

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

const PopupFooteronClick = ({
  closeDropdown,
}: { closeDropdown: () => void }) => (
  <Stack direction="row" gap="1" width="100%">
    <Button
      variant="outlined"
      sentiment="primary"
      fullWidth
      onClick={() => closeDropdown()}
    >
      Click me (close the dropdown)
    </Button>
    <Button variant="filled" sentiment="primary" fullWidth>
      Click me (do not close the dropdown)
    </Button>
  </Stack>
)

export const Footer: StoryFn<typeof SelectInput> = args => (
  <Stack gap={2}>
    <SelectInput
      {...args}
      label="Default footer"
      options={dataGrouped}
      footer={<PopupFooter />}
    />
    <SelectInput
      {...args}
      label="Function footer"
      options={dataGrouped}
      footer={closeDropdown => (
        <PopupFooteronClick closeDropdown={closeDropdown} />
      )}
    />
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
      story:
        'Set a custom footer to the dropdown using the `Footer` prop. Footer can be a function with prop `closeDropdown` to hide the dropdown',
    },
  },
}
