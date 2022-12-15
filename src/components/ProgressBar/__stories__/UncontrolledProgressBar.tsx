import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import ProgressBar from '..'

const UncontrolledProgressBar = (props: ComponentProps<typeof ProgressBar>) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const handler = setInterval(() => {
      setValue(currentValue =>
        currentValue === 0 ? Math.round(Math.random() * 100) : 0,
      )
    }, Math.random() * 400 + 800)

    return () => {
      clearInterval(handler)
    }
  }, [])

  return <ProgressBar value={value} {...props} />
}

export default UncontrolledProgressBar
