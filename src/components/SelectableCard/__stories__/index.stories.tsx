import { Meta, Story } from '@storybook/react'
import { ChangeEvent, ComponentProps } from 'react'
import SelectableCard from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import Badge from '../../Badge'

export default {
  component: SelectableCard,
  parameters: {
    docs: {
      description: {
        component:
          'SelectableCard is a simple card input component with complex children.',
      },
    },
  },
  title: 'Components/Data Entry/SelectableCard',
} as Meta

const Template: Story<ComponentProps<typeof SelectableCard>> = ({
  ...props
}) => (
  <SelectableCard {...props}>Beautiful Label of SelectableCard</SelectableCard>
)

export const Default = Template.bind({})

export const Controlled = Template.bind({})
Controlled.decorators = [
  () => (
    <ControlValue value="label-1">
      {({ value, onChange }) => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <SelectableCard
            name="label-1"
            checked={value === 'label-1'}
            value="label-1"
            type="radio"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Left Radio
          </SelectableCard>
          <SelectableCard
            name="label-2"
            checked={value === 'label-2'}
            value="label-2"
            type="radio"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Right Radio
          </SelectableCard>
        </div>
      )}
    </ControlValue>
  ),
]

export const Type = Template.bind({})
Type.parameters = {
  docs: {
    storyDescription:
      'Two types exists for this component, it can either be a checkbox or a radio.',
  },
}
Type.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ControlValue value="label-3">
        {({ value, onChange }) => (
          <div style={{ display: 'flex', gap: '16px' }}>
            <SelectableCard
              name="label-3"
              checked={value === 'label-3'}
              value="label-3"
              type="radio"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange(event.currentTarget.value)
              }
            >
              Radio Left
            </SelectableCard>
            <SelectableCard
              name="label-4"
              checked={value === 'label-4'}
              value="label-4"
              type="radio"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange(event.currentTarget.value)
              }
            >
              Radio Right
            </SelectableCard>
          </div>
        )}
      </ControlValue>
      <ControlValue value={{ 'label-1': true, 'label-2': true }}>
        {({ value, onChange }) => (
          <div style={{ display: 'flex', gap: '16px' }}>
            <SelectableCard
              name="label-1"
              checked={value['label-1']}
              value="label-1"
              type="checkbox"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange({ ...value, 'label-1': event.currentTarget.checked })
              }
            >
              Checkbox 1
            </SelectableCard>
            <SelectableCard
              name="label-2"
              checked={value['label-2']}
              value="label-2"
              type="checkbox"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange({ ...value, 'label-2': event.currentTarget.checked })
              }
            >
              Checkbox 2
            </SelectableCard>
          </div>
        )}
      </ControlValue>
    </div>
  ),
]

export const ShowTick = Template.bind({})
ShowTick.parameters = {
  docs: {
    storyDescription:
      'Depending on your need you may want to display radio or checkbox tick. It can easily be done by using prop `showTick`.',
  },
}
ShowTick.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ControlValue value="label-5">
        {({ value, onChange }) => (
          <div style={{ display: 'flex', gap: '16px' }}>
            <SelectableCard
              name="label-5"
              checked={value === 'label-5'}
              value="label-5"
              type="radio"
              showTick
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange(event.currentTarget.value)
              }
            >
              Radio Left
            </SelectableCard>
            <SelectableCard
              name="label-6"
              checked={value === 'label-6'}
              value="label-6"
              type="radio"
              showTick
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange(event.currentTarget.value)
              }
            >
              Radio Right
            </SelectableCard>
          </div>
        )}
      </ControlValue>
      <ControlValue value={{ 'label-1': true, 'label-2': true }}>
        {({ value, onChange }) => (
          <div style={{ display: 'flex', gap: '16px' }}>
            <SelectableCard
              name="label-1"
              checked={value['label-1']}
              value="label-1"
              type="checkbox"
              showTick
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange({ ...value, 'label-1': event.currentTarget.checked })
              }
            >
              Checkbox 1
            </SelectableCard>
            <SelectableCard
              name="label-2"
              checked={value['label-2']}
              value="label-2"
              type="checkbox"
              showTick
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange({ ...value, 'label-2': event.currentTarget.checked })
              }
            >
              Checkbox 2
            </SelectableCard>
          </div>
        )}
      </ControlValue>
    </div>
  ),
]

export const Disabled = Template.bind({})
Disabled.decorators = [
  () => (
    <ControlValue value="label-7">
      {({ value, onChange }) => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <SelectableCard
            name="label-7"
            checked={value === 'label-7'}
            value="label-7"
            type="radio"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Left Radio
          </SelectableCard>
          <SelectableCard
            name="label-8"
            checked={value === 'label-8'}
            value="label-8"
            type="radio"
            disabled
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Right Radio
          </SelectableCard>
        </div>
      )}
    </ControlValue>
  ),
]

export const isError = Template.bind({})
isError.parameters = {
  docs: {
    storyDescription:
      'Use `isError` prop to display SelectableCard with a error style.',
  },
}
isError.decorators = [
  () => (
    <ControlValue value="label-12">
      {({ value, onChange }) => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <SelectableCard
            name="label-12"
            checked={value === 'label-12'}
            value="label-12"
            type="radio"
            isError
            showTick
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Left Radio
          </SelectableCard>
          <SelectableCard
            name="label-13"
            checked={value === 'label-13'}
            value="label-13"
            type="radio"
            showTick
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Right Radio
          </SelectableCard>
        </div>
      )}
    </ControlValue>
  ),
]

export const Tooltip = Template.bind({})
Tooltip.decorators = [
  () => (
    <ControlValue value="label-7">
      {({ value, onChange }) => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <SelectableCard
            name="label-14"
            checked={value === 'label-14'}
            value="label-41"
            type="radio"
            tooltip="Click on me!"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Left Radio
          </SelectableCard>
          <SelectableCard
            name="label-15"
            checked={value === 'label-15'}
            value="label-15"
            type="radio"
            tooltip="No! Click on me instead!"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Right Radio
          </SelectableCard>
        </div>
      )}
    </ControlValue>
  ),
]

export const ComplexChildren = Template.bind({})
ComplexChildren.parameters = {
  docs: {
    storyDescription:
      'If your children is more than just a text you can use given function with parameters `checked` and `disabled` to customize you child style according to SelectableCard state.',
  },
}
ComplexChildren.decorators = [
  () => (
    <ControlValue value="label-9">
      {({ value, onChange }) => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <SelectableCard
            name="label-9"
            checked={value === 'label-9'}
            value="label-9"
            type="radio"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            {({ checked }) => (
              <>
                <Badge
                  variant={checked ? 'info' : 'neutral'}
                  prominence={checked ? 'default' : 'strong'}
                >
                  info
                </Badge>{' '}
                Left Radio
              </>
            )}
          </SelectableCard>
          <SelectableCard
            name="label-10"
            checked={value === 'label-10'}
            value="label-10"
            type="radio"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            Middle Radio
          </SelectableCard>
          <SelectableCard
            name="label-11"
            checked={value === 'label-11'}
            value="label-11"
            type="radio"
            disabled
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.currentTarget.value)
            }
          >
            {({ disabled }) => (
              <>
                <Badge disabled={disabled}>info</Badge> Right Radio
              </>
            )}
          </SelectableCard>
        </div>
      )}
    </ControlValue>
  ),
]
