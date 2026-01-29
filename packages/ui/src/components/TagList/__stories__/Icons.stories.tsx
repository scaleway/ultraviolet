import { IdIcon } from '@ultraviolet/icons/IdIcon'
import { LockIcon } from '@ultraviolet/icons/LockIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { Template } from './Template.stories'

export const Icons = Template.bind({})

Icons.args = {
  tags: [
    { icon: <IdIcon />, label: 'smooth' },
    'code',
    { icon: <LockIcon />, label: 'hello' },
    { icon: <PlusIcon />, label: 'world' },
  ],
  threshold: 3,
}
