import React, { useEffect, useState } from 'react'
import { ProgressBar } from '..'

const UncontrolledProgressBar = props => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setValue(currentValue =>
        currentValue === 0 ? Math.round(Math.random() * 100) : 0,
      )
    }, Math.random() * 400 + 800)
  }, [])

  return <ProgressBar value={value} {...props} />
}

export default UncontrolledProgressBar
