import { Template } from './Template.stories'

export const KeyValue = Template.bind({})

KeyValue.args = {
  tags: [{ key: 'key', value: 'value' }, 'code', 'hello', { key: 'key2', value: 'value2' }],
  threshold: 2,
}
