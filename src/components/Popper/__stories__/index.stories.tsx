import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Popper, { popperVariants } from '..'
import { FlexBox } from '../..'
import { getUUID } from '../../../utils'
import Button from '../../Button'
import Icon from '../../Icon'

export default {
  component: Popper,
  parameters: {
    docs: {
      description: {
        component: 'Popper can be used to display content over main content.',
      },
    },
  },
  title: 'Components/Popper',
} as Meta

const disclosure: ComponentProps<typeof Popper>['disclosure'] = ({
  placement,
  visible,
}) => (
  <Button>
    test {placement}:
    <Icon
      ml={2}
      name={visible ? 'chevron-up' : 'chevron-down'}
      color="white"
      size={11}
    />
  </Button>
)

const Template: Story<ComponentProps<typeof Popper>> = args => (
  <Popper aria-label="Custom popover" disclosure={disclosure} {...args}>
    {({ placement }) => (
      <div style={{ padding: '16px' }}> placement:{placement}</div>
    )}
  </Popper>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.decorators = [
  () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      {popperVariants.map(variant => (
        <Popper
          variant={variant}
          aria-label={`variant-${variant}`}
          disclosure={() => <Button>{variant}</Button>}
        >
          <div style={{ padding: 16 }}>{variant}</div>
        </Popper>
      ))}
    </div>
  ),
]

export const ComplexChildren = Template.bind({})
ComplexChildren.decorators = [
  () => (
    <div>
      <Popper
        variant="black"
        aria-label="Custom popover"
        disclosure={({ placement }) => <Button>Popper {placement}:</Button>}
      >
        {() => (
          <FlexBox direction="column">
            {new Array(15).fill(0).map(() => {
              const uuid = getUUID()

              return (
                <div key={uuid} style={{ height: 30, margin: 16, width: 30 }}>
                  {uuid.substr(0, 3)}
                </div>
              )
            })}
          </FlexBox>
        )}
      </Popper>
    </div>
  ),
]

export const Placement = Template.bind({})
Placement.parameters = {
  docs: {
    storyDescription: 'Set placement using `placement` prop.',
  },
}
Placement.decorators = [
  () => (
    <div>
      <FlexBox direction="column">
        <Popper
          placement="left-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="left"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="left-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
      </FlexBox>
      <div>
        <Popper
          placement="top-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="top"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="top-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
      </div>
      <FlexBox direction="column">
        <Popper
          placement="right-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="right"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="right-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
      </FlexBox>
      <div>
        <Popper
          placement="bottom-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="bottom"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="bottom-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button m={1}>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
      </div>
    </div>
  ),
]

export const WithoutPortal = Template.bind({})
WithoutPortal.decorators = [
  () => (
    <Popper
      aria-label="Custom popover with button"
      disclosure={() => <Button>Test</Button>}
      placement="auto"
      modal={false}
    >
      {({ placement }) => <Button> {placement}</Button>}
    </Popper>
  ),
]

export const WithElementDisclosure = Template.bind({})
WithElementDisclosure.decorators = [
  () => (
    <Popper
      aria-label="Custom popover with button"
      disclosure={<Button>Test</Button>}
      placement="auto"
      modal={false}
      visible
    >
      {({ placement }) => <Button> {placement}</Button>}
    </Popper>
  ),
]

export const WithoutDisclosure = Template.bind({})
WithoutDisclosure.decorators = [
  () => (
    <Popper
      aria-label="Custom popover with button"
      placement="auto"
      modal={false}
      visible
    >
      {({ placement }) => <Button> {placement}</Button>}
    </Popper>
  ),
]
