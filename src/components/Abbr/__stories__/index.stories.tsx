import { Meta, Story } from '@storybook/react'
import React from 'react'
import Abbr, { AbbrProps } from '..'

export default {
  component: Abbr,
  parameters: {
    docs: {
      description: {
        component: 'Represents an abbreviation, optionally with a title.',
      },
    },
  },
  title: 'Components/Data Display/Abbr',
} as Meta

export const Default: Story<AbbrProps> = (...args) => (
  <Abbr {...args}>Abbreviation</Abbr>
)

export const Title: Story<AbbrProps> = () => (
  <Abbr title="Abbreviation">Abbr</Abbr>
)
Title.parameters = {
  docs: {
    description: {
      story: 'Use the `title` prop to provide a title for the abbreviation.',
    },
  },
}
