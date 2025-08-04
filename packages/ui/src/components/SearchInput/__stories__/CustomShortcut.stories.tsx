import { Template } from './Template.stories'

export const CustomShortcut = Template.bind({})

CustomShortcut.args = {
  shortcut: ['Shift', 'A'],
}

CustomShortcut.parameters = {
  docs: {
    description: {
      story:
        'If the default shortcut is not suitable, you can customize it by passing a `shortcut` prop with an array of string representing the keys. For example, `["Ctrl", "Shift", "A"]` will display `Ctrl + Shift + A` as the shortcut.\n\nImportant: You need to set the correct key for it to work. To know the name of a key visit [https://www.toptal.com/developers/keycode](https://www.toptal.com/developers/keycode) type your key and check `event.key`.',
    },
  },
}
