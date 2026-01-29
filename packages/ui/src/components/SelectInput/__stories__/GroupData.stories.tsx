import type { StoryFn } from '@storybook/react-vite'
import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataGrouped } from './resources'

const Error = (
  <Stack alignItems="center" direction="row" gap={1}>
    <AlertCircleIcon sentiment="danger" />
    An error occured
  </Stack>
)
export const GroupData: StoryFn<typeof SelectInput> = args => (
  <Stack gap="2" width="50%">
    <SelectInput
      {...args}
      groupEmptyState={{
        'jovian planets': 'No jovian planets :(',
        'terrestrial planets': 'No terrestrial planets !',
      }}
      helper="search to see the empty states"
      label="Group empty state"
      optionalInfoPlacement="right"
      options={dataGrouped}
      searchable
    />
    <SelectInput
      {...args}
      groupError={{
        'jovian planets': Error,
      }}
      label="Group error"
      optionalInfoPlacement="right"
      options={dataGrouped}
    />
  </Stack>
)

GroupData.args = {
  disabled: false,
  helper: 'helper',
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: false,
}

GroupData.parameters = {
  docs: {
    description: {
      story:
        'Use prop `groupEmptyState` and `groupError` to add en empty state or an error message to one or multiple groups. When a group error is defined, the group options are not displayed.',
    },
  },
}
