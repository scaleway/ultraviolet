import { Template } from './Template'

export const Playground = Template.bind({})

Playground.parameters = {
  docs: {
    description: {
      story:
        'Use breadcrumbs to show the user’s location in a website or app. This helps users understand where they are in the site hierarchy and navigate back to higher levels. To do so use `to` prop on `Breacrumb.Item` to specify the link.',
    },
  },
}
