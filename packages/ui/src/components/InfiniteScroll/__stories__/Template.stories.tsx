import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { InfiniteScroll } from '..'
import { DATA, generateRandomNamesArray } from './data'

export const Template: StoryFn<typeof InfiniteScroll> = args => {
  const [data, setData] = useState(DATA)

  const loadMoreData = async () => {
    await new Promise(resolve => {
      setTimeout(() => {
        const newData = generateRandomNamesArray(5, 10)
        setData(prevData => [...prevData, ...newData])
        resolve('ok')
      }, 2000)
    })
    console.log('Data loaded')
  }

  return (
    <>
      {data.map(value => (
        <p key={value}>{value}</p>
      ))}
      <InfiniteScroll {...args} onLoadMore={loadMoreData} />
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
