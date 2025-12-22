import { FileInputField } from '..'
import { Template } from './Template.stories'

export const AsOverlay = Template.bind({})

AsOverlay.args = {
  children: (
    <>
      I am an overlay (drag and drop){' '}
      <FileInputField.Button>Or click here</FileInputField.Button>
      <FileInputField.List />
    </>
  ),
  multiple: true,
  name: 'overlay',
  title: 'drag here',
  variant: 'overlay',
}
