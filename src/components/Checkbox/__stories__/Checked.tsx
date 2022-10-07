import Checkbox from '..'

const codeSnippet = `
<Checkbox checked onChange={() => {}}>
  Checked checkbox
</Checkbox>
<Checkbox checked="indeterminate" onChange={() => {}}>
  Indeterminate checkbox
</Checkbox>
`
export const Checked = () => (
  <>
    <Checkbox checked onChange={() => {}}>
      Checked checkbox
    </Checkbox>
    <Checkbox checked="indeterminate" onChange={() => {}}>
      Indeterminate checkbox
    </Checkbox>
  </>
)

Checked.parameters = {
  docs: {
    storyDescription:
      'Checkbox can have two state `checked` or `indeterminate` defined by prop `checked`.',
    source: {
      code: codeSnippet,
      format: true,
    },
  },
}
