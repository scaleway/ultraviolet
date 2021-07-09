import React from 'react'
import { usePaginationContext } from '..'

const ExampleChildren = () => {
  const { pageData } = usePaginationContext()

  return (
    <ul>
      {pageData.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default ExampleChildren
