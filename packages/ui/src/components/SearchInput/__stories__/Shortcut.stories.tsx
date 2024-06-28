import { Template } from './Template.stories'

export const Shortcut = Template.bind({})

Shortcut.args = {
  shortcut: true,
}

Shortcut.parameters = {
  docs: {
    description: {
      story:
        'If set to `true` it will display shortcut keys. When the keys are pressed the input will be focused. Depending on your navigator and operating system the keys might be different. For example, on Windows and Linux it will be `Ctrl + K` and on Mac it will be `⌘ + K`.',
    },
  },
}
