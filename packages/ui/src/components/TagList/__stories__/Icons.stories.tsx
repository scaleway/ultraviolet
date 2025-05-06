import { IdIcon, LockIcon, PlusIcon } from '@ultraviolet/icons'
import { Template } from './Template.stories'

export const Icons = Template.bind({})

Icons.args = {
  tags: [
    { label: 'smooth', icon: <IdIcon /> },
    'code',
    { label: 'hello', icon: <LockIcon /> },
    { label: 'world', icon: <PlusIcon /> },
  ],
  threshold: 3,
}
