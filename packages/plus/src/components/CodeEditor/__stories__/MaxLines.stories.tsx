import { Template } from './Template.stories'

const DEFAULT_VALUE = `// Here, maxHeight = 100
function findSequence(goal) {
    function find(start, history) {
      if (start == goal)
        return history;
      else if (start > goal)
        return null;
      else
        return find(start + 5, "(" + history + " + 5)") ||
               find(start * 3, "(" + history + " * 3)");
    }
    return find(1, "1");
  }
`

export const MaxLines = Template.bind({})

MaxLines.args = {
  ...Template.args,
  expandableHeight: 100,
  showText: 'Show',
  hideText: 'Hide',
  value: DEFAULT_VALUE,
}

MaxLines.parameters = {
  docs: {
    description: {
      story:
        'Use prop `expandableHeight` to add an expand button when the content is too long. Use props `showText` and `hideText` to customize the text of the expand button. When `expandableHeight` is defined, prop `height` is ignored. **A non-expanded code editor is not editable**',
    },
  },
}
