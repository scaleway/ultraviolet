import { Icon } from '@ultraviolet/icons/legacy'
import { Tooltip } from '../../Tooltip'
import { Template } from './Template.stories'

export const LabelInformation = Template.bind({})

LabelInformation.args = {
  ...Template.args,
  label: 'Label',
  labelInformation: (
    <Tooltip text="tooltip">
      <Icon name="information-outline" variant="outlined" />
    </Tooltip>
  ),
}
