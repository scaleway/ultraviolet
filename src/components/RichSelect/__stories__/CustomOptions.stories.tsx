import { ComponentStory } from '@storybook/react'
import RichSelect from '..'
import Badge from '../../Badge'

export const CustomOptions: ComponentStory<typeof RichSelect> = ({
  ...props
}) => (
  <RichSelect name="custom-options" {...props}>
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Option B<Badge size="small">Awesome badge</Badge>
      </div>
    </RichSelect.Option>
  </RichSelect>
)
CustomOptions.parameters = {
  docs: {
    storyDescription: 'This shows how to customize options in a RichSelect.',
  },
}
