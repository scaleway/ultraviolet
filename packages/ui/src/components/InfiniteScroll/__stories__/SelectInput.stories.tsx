import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectInput as SelectInputUV } from '../../SelectInput'
import { Skeleton } from '../../Skeleton'
import { Stack } from '../../Stack'
import { InfiniteScroll } from '..'
import { generateRandomNamesArray, SELECT_INPUT_DATA } from './data'
import { infiniteScrollSelectInput } from './style.css'

const InfiniteScrollLoader = (
  <Stack className={infiniteScrollSelectInput} direction="column" gap="3">
    <Skeleton variant="line" />
    <Skeleton variant="line" />
    <Skeleton variant="line" />
  </Stack>
)

export const SelectInput: StoryFn<typeof InfiniteScroll> = args => {
  const [data, setData] = useState(SELECT_INPUT_DATA)

  const loadMoreData = async () => {
    await new Promise(resolve => {
      setTimeout(() => {
        const generatedNames = generateRandomNamesArray(4, 10).map(name => ({
          label: name,
          value: name,
        }))
        setData(prevData => [...prevData, ...generatedNames])
        resolve('ok')
      }, 2000)
    })
    console.log('Data loaded')
  }

  return (
    <SelectInputUV
      label="Select input"
      loadMore={
        <InfiniteScroll
          {...args}
          loader={InfiniteScrollLoader}
          onLoadMore={loadMoreData}
        />
      }
      name="select-input"
      options={data}
    />
  )
}

SelectInput.decorators = [
  Story => (
    <div style={{ height: '500px' }}>
      <Story />
    </div>
  ),
]

SelectInput.parameters = {
  docs: {
    description: {
      story:
        'Here is an example of implementation within SelectInput component. You can easily customise the loader by passing `loader` prop. This way you could have a more representative skeleton loader.',
    },
  },
}
