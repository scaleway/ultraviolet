import React from 'react'
import { usePagination } from '..'

const ExampleChildren = () => {
  const { pageData } = usePagination()

  return (
    <ul>
      {pageData.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default ExampleChildren
