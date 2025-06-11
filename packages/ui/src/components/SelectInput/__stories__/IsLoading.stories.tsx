import { Template } from './Template.stories'
import { dataUnGrouped } from './resources'

export const IsLoading = Template.bind({})

IsLoading.args = {
  ...Template.args,
  options: dataUnGrouped,
  isLoading: true,
}
IsLoading.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

IsLoading.parameters = {
  docs: {
    description: {
      story:
        'Use`isLoading` prop when the options are loading and cannot be displayed',
    },
  },
}
