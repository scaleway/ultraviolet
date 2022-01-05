import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Popper, { popperVariants } from '..'
import { FlexBox } from '../..'
import { getUUID } from '../../../utils'
import Button from '../../Button'

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

const defaultDisclosure: ComponentProps<typeof Popper>['disclosure'] = ({
  placement,
  visible,
}) => (
  <Button
    icon={visible ? 'chevron-up' : 'chevron-down'}
    iconSize={11}
    iconPosition="right"
  >
    test {placement}:
  </Button>
)

const Template: Story<ComponentProps<typeof Popper>> = ({
  disclosure = defaultDisclosure,
  ...props
}) => (
  <Popper aria-label="Custom popover" disclosure={disclosure} {...props}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Popper
          placement="left-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="left"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="left-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Popper
          placement="top-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="top"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="top-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Popper
          placement="right-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="right"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="right-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Popper
          placement="bottom-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="bottom"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
          )}
        >
          {({ placement }) => <div style={{ padding: 8 }}> {placement}</div>}
        </Popper>
        <Popper
          placement="bottom-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={disclosureProps => (
            <Button>{disclosureProps?.placement}</Button>
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
