import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Popper, { popperVariants } from '..'
import { FlexBox } from '../..'
import { getUUID } from '../../../utils'
import Box from '../../Box'
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
    {({ placement }) => <Box p={2}> placement:{placement}</Box>}
  </Popper>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.decorators = [
  () => (
    <Box display="flex">
      {popperVariants.map(variant => (
        <Box m={1}>
          <Popper
            variant={variant}
            aria-label={`variant-${variant}`}
            disclosure={() => <Button>{variant}</Button>}
          >
            <Box p={2}>{variant}</Box>
          </Popper>
        </Box>
      ))}
    </Box>
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
                <Box key={uuid} width={30} height={30} m={2}>
                  {uuid.substr(0, 3)}
                </Box>
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
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="left"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="left-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
      </FlexBox>
      <div>
        <Popper
          placement="top-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
          ml={2}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="top"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
          ml={2}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="top-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
          ml={2}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
      </div>
      <FlexBox direction="column">
        <Popper
          placement="right-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="right"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="right-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
      </FlexBox>
      <div>
        <Popper
          placement="bottom-start"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="bottom"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
        </Popper>
        <Popper
          placement="bottom-end"
          variant="black"
          aria-label="Custom popover with button"
          disclosure={({ placement }) => <Button m={1}>{placement}</Button>}
        >
          {({ placement }) => <Box p={1}> {placement}</Box>}
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
