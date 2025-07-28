import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataGrouped } from './resources'
import { Template } from './Template.stories'

const PopupFooter = () => (
  <Stack direction="row" gap="1" width="100%">
    <Button fullWidth sentiment="primary" variant="outlined">
      Button 1
    </Button>
    <Button fullWidth sentiment="primary" variant="filled">
      Button 2
    </Button>
  </Stack>
)

const PopupFooteronClick = ({
  closeDropdown,
}: {
  closeDropdown: () => void
}) => (
  <Stack direction="row" gap="1" width="100%">
    <Button
      fullWidth
      onClick={() => closeDropdown()}
      sentiment="primary"
      variant="outlined"
    >
      Click me (close the dropdown)
    </Button>
    <Button fullWidth sentiment="primary" variant="filled">
      Click me (do not close the dropdown)
    </Button>
  </Stack>
)

export const Footer: StoryFn<typeof SelectInput> = args => (
  <Stack gap={2}>
    <SelectInput
      {...args}
      footer={<PopupFooter />}
      label="Default footer"
      options={dataGrouped}
    />
    <SelectInput
      {...args}
      footer={closeDropdown => (
        <PopupFooteronClick closeDropdown={closeDropdown} />
      )}
      label="Function footer"
      options={dataGrouped}
    />
  </Stack>
)

Footer.args = {
  ...Template.args,
  footer: <PopupFooter />,
  options: dataGrouped,
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
