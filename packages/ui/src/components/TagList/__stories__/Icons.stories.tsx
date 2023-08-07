import { Template } from './Template.stories'

export const Icons = Template.bind({})

Icons.args = {
  tags: [
    { label: 'smooth', icon: 'id' },
    'code',
    { label: 'hello', icon: 'lock' },
    { label: 'world', icon: 'plus' },
  ],
  threshold: 3,
}
