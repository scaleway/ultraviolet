import { dataUnGrouped } from './resources'
import { Template } from './Template.stories'

export const IsLoading = Template.bind({})

IsLoading.args = {
  ...Template.args,
  isLoading: true,
  options: dataUnGrouped,
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
