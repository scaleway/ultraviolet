import { Template } from './Template.stories'

export const KnownIssues = Template.bind({})

KnownIssues.parameters = {
  docs: {
    storyDescription: `#### SelectInput doesn’t keep focus on selected option

SelectInput is based on the \`react-select\` library. To keep the focus on the selected option you need to use \`options\` prop with a memoized value or a memoized \`children\`

#### OnChange signature is broken and will cause typescript type check error

Use @ts-expect-error if needed.
`,
  },
}
