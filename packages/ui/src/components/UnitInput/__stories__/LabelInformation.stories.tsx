import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { Tooltip } from '../../Tooltip'
import { Template } from './Template.stories'

export const LabelInformation = Template.bind({})

LabelInformation.args = {
  ...Template.args,
  label: 'Label',
  labelInformation: (
    <Tooltip text="tooltip">
      <InformationOutlineIcon />
    </Tooltip>
  ),
}
