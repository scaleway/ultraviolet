import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { InfiniteScroll } from '..'
import { DATA, generateRandomNamesArray } from './data'

export const Template: StoryFn<typeof InfiniteScroll> = args => {
  const [data, setData] = useState(DATA)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {data.map(value => (
        <p key={value}>{value}</p>
      ))}
      <InfiniteScroll
        {...args}
        onLoadMore={() => {
          setIsLoading(true)

          const newData = generateRandomNamesArray(3, 5)
          setTimeout(() => {
            setData(prevData => [...prevData, ...newData])
            setIsLoading(false)
          }, 2000)
        }}
        isLoading={isLoading}
      />
    </>
  )
}

Template.decorators = [
  Story => (
    <div style={{ height: '100px', overflowY: 'scroll' }}>
      <Story />
    </div>
  ),
]
