import { Meta, Story } from '@storybook/react'
import { ComponentPropsWithRef } from 'react'
import ButtonV2, { buttonSizes } from '..'
import { SENTIMENTS_WITHOUT_NEUTRAL } from '../../../theme'

// @note: Workaround which make storybook able to generate Control Args
// github.com/storybookjs/storybook/issues/15334#issuecomment-995427487
export const Playground = (props: ComponentPropsWithRef<typeof ButtonV2>) => (
  <ButtonV2 text="text" {...props} />
)

export default {
  args: {
    text: 'text',
  },
  component: Playground,
  title: 'Components/Button/ButtonV2',
} as Meta

const Template: Story<ComponentPropsWithRef<typeof ButtonV2>> = args => (
  <ButtonV2 {...args} />
)

export const Colors = Template.bind({})
Colors.parameters = {
  docs: {
    storyDescription:
      'Set `variant` (default = primary) and `prominence` (default = strong) properties to choose the button color.',
  },
}
Colors.decorators = [
  () => (
    <div>
      <h5>Prominence : Strong</h5>
      <div style={{ display: 'flex', gap: 16 }}>
        {SENTIMENTS_WITHOUT_NEUTRAL.map(variant => (
          <ButtonV2
            key={variant}
            variant={variant}
            icon="pencil"
            text={variant}
          />
        ))}
      </div>
      <h5>Prominence : Weak</h5>
      <div style={{ display: 'flex', gap: 16 }}>
        {SENTIMENTS_WITHOUT_NEUTRAL.map(variant => (
          <ButtonV2
            key={variant}
            variant={variant}
            prominence="weak"
            icon="pencil"
            text={variant}
          />
        ))}
      </div>
      <h5>
        Variant : Neutral (prominence doesn&apos;t apply to variant `neutral`)
      </h5>
      <div style={{ display: 'flex', gap: 16 }}>
        <ButtonV2
          variant="neutral"
          prominence="weak"
          icon="pencil"
          text="neutral"
        />
      </div>
    </div>
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription: 'Set `size` using size property.',
  },
}
Sizes.decorators = [
  () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      {buttonSizes.map(size => (
        <div key={size}>
          <ButtonV2 size={size} icon="pencil" text={size} />
        </div>
      ))}
    </div>
  ),
]

export const Icon = Template.bind({})
Icon.parameters = {
  docs: {
    storyDescription: 'Add an `icon` using icon property.',
  },
}
Icon.decorators = [() => <ButtonV2 icon="pencil" text="Click me" />]

export const IconPosition = Template.bind({})
IconPosition.parameters = {
  docs: {
    storyDescription:
      'You can choose `iconPosition` using iconPosition property (`left` or `right`).',
  },
}
IconPosition.decorators = [
  () => <ButtonV2 icon="pencil" iconPosition="right" text="Click me" />,
]

export const IsLoading = Template.bind({})
IsLoading.parameters = {
  docs: {
    storyDescription:
      'You can set property `isLoading` to add a Loader (it replaces potential icon and button will be disabled)',
  },
}
IsLoading.decorators = [
  () => (
    <ButtonV2 isLoading icon="pencil" iconPosition="right" text="Click me" />
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'Set `disabled` using disabled property.',
  },
}
Disabled.decorators = [
  () => (
    <div>
      <h5>Prominence : Strong</h5>
      <div style={{ display: 'flex', gap: 16 }}>
        {SENTIMENTS_WITHOUT_NEUTRAL.map(variant => (
          <ButtonV2
            disabled
            key={variant}
            variant={variant}
            icon="pencil"
            text={variant}
          />
        ))}
      </div>
      <h5>Prominence : Weak</h5>
      <div style={{ display: 'flex', gap: 16 }}>
        {SENTIMENTS_WITHOUT_NEUTRAL.map(variant => (
          <ButtonV2
            disabled
            key={variant}
            variant={variant}
            prominence="weak"
            icon="pencil"
            text={variant}
          />
        ))}
      </div>
      <h5>
        Variant : Neutral (prominence doesn&apos;t apply to variant `neutral`)
      </h5>
      <div style={{ display: 'flex', gap: 16 }}>
        <ButtonV2
          disabled
          variant="neutral"
          prominence="weak"
          icon="pencil"
          text="neutral"
        />
      </div>
    </div>
  ),
]

export const WithoutText = Template.bind({})
WithoutText.parameters = {
  docs: {
    storyDescription:
      '`text` property is optional. So you can create Action button using only an icon (add ariaLabel in this situation)',
  },
}
WithoutText.decorators = [() => <ButtonV2 icon="pencil" ariaLabel="edit" />]

export const Extend = Template.bind({})
Extend.parameters = {
  docs: {
    storyDescription:
      '`extend` property to display `text` only on hover. Better to use this with an icon',
  },
}
Extend.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ButtonV2 extend icon="plus" text="Create" />
        <ButtonV2 extend icon="plus" iconPosition="right" text="Create" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ButtonV2 size="small" extend icon="plus" text="Create" />
        <ButtonV2
          size="small"
          extend
          icon="plus"
          iconPosition="right"
          text="Create"
        />
      </div>
    </div>
  ),
]

export const Tooltip = Template.bind({})
Tooltip.parameters = {
  docs: {
    storyDescription:
      'Use `tooltip` property to add tooltip message visible on hover',
  },
}
Tooltip.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <ButtonV2 icon="pencil" text="hover me" tooltip="Click to edit" />
    </div>
  ),
]
