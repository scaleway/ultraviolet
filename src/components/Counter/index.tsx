import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

type CounterProps = {
  /**
   * Value to which counter will go. Can be negative or positive number.
   */
  end: number
  /**
   * Triggered function when counter animation is finished.
   */
  onEnd?: () => void
}

const Counter = ({ end, onEnd }: CounterProps) => {
  const [isBusy, setIsBusy] = useState<boolean>(true)
  const start = useRef<number>(0)
  useEffect(() => {
    start.current = end
  })

  return (
    <div aria-live="polite" aria-busy={isBusy}>
      <CountUp
        start={start.current}
        end={end}
        onEnd={() => {
          setIsBusy(false)
          onEnd?.()
        }}
        duration={1.5}
      />
    </div>
  )
}

Counter.propTypes = {
  end: PropTypes.number.isRequired,
  onEnd: PropTypes.func,
}

export default Counter
