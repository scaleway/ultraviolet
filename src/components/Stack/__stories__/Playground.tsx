import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <div style={{ background: '#DDD', padding: '8px' }}>First child</div>,
    <div style={{ background: '#DDD', padding: '8px' }}>Second child</div>,
    <div style={{ background: '#DDD', padding: '8px' }}>Third child</div>,
  ],
  gap: 2,
}
