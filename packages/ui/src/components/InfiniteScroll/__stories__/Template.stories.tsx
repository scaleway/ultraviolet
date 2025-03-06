import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { InfiniteScroll } from '..'
import { DATA, generateRandomNamesArray } from './data'

export const Template: StoryFn<typeof InfiniteScroll> = args => {
  const [data, setData] = useState(DATA)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <InfiniteScroll
      {...args}
      loadMore={() => {
        setIsLoading(true)

        const newData = generateRandomNamesArray(3, 5)
        setTimeout(() => {
          setData(prevData => [...prevData, ...newData])
          setIsLoading(false)
        }, 2000)
      }}
      isLoading={isLoading}
    >
      {data.map(value => (
        <p>{value}</p>
      ))}
    </InfiniteScroll>
  )
}

Template.decorators = [
  Story => (
    <div style={{ height: '100px', overflowY: 'scroll' }}>
      <Story />
    </div>
  ),
]
