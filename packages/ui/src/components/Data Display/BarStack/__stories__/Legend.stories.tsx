import { Template } from './Template.stories'

export const Legend = Template.bind({})

Legend.args = {
  label: 'Label',
  labelInformation: '54.32GB used from 1.02TB',
  legend: 'outside',
}

Legend.parameters = {
  docs: {
    description: {
      story:
        'When the `legend = "outside"`, hovering over the legend displays a tooltip with the `text` content on the corresponding block. If a `tooltip` is defined for the data, hovering over the legend shows the `text` content, while hovering the block itself shows the `tooltip` content.',
    },
  },
}
