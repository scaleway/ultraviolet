import { IdIcon, LockIcon, PlusIcon } from '@ultraviolet/icons'
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
