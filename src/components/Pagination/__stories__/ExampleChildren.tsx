import React, { VoidFunctionComponent } from 'react'
import { usePaginationContext } from '..'

const ExampleChildren: VoidFunctionComponent = () => {
  const { pageData } = usePaginationContext<string>()

  return (
    <ul>
      {pageData.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default ExampleChildren
