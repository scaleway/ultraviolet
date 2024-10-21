import { Template } from './Template.stories'

export const AutomaticRows = Template.bind({})

AutomaticRows.args = {
  ...Template.args,
  rows: 'auto',
  value:
    'A long time ago, in a galaxy far, far away, amidst the swirling constellations and distant star systems, there existed a realm of unimaginable wonders and ancient mysteries waiting to be discovered. This distant galaxy, filled with countless planets, moons, and celestial phenomena, was home to diverse civilizations, each with their own unique cultures, histories, and legends. Among the stars, epic tales of heroism, adventure, and conflict unfolded, shaping the destinies of countless beings and leaving an indelible mark on the fabric of the universe itself.',
}

AutomaticRows.parameters = {
  docs: {
    description: {
      story:
        'You can set `rows="auto"` and the textarea will automatically adjust its height based on the content. The `maxLength`',
    },
  },
}
