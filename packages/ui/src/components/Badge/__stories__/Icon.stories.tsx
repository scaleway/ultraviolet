import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Template } from './Template'

export const Icon = Template.bind({})

Icon.args = {
  children: (
    <>
      <InformationOutlineIcon size="small" />
      Badge
    </>
  ),
  sentiment: 'primary',
}
