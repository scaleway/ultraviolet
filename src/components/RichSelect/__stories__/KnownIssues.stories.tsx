import { Template } from './Template.stories'

export const KnownIssues = Template.bind({})

KnownIssues.parameters = {
  docs: {
    storyDescription: `### RichSelect doesn’t keep focus on selected option

RichSelect is based on the \`react-select\` library. To keep the focus on the selected option you need to use \`options\` prop with a memoized value or a memoized \`children\``,
  },
}
