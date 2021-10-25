import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent, useEffect, useRef } from 'react'
import CountUp from 'react-countup'

const styles = {
  container: css`
    position: relative;
  `,
  counter: css`
    position: absolute;
    top: 0;
  `,
  space: css`
    visibility: hidden;
  `,
}

export type CounterProps = {
  /**
   * Value to which counter will go. Can be negative or positive number.
   */
  end: number
  /**
   * Triggered function when counter animation is finished.
   */
  onEnd?: () => void
}

const Counter: VoidFunctionComponent<CounterProps> = ({
  end,
  onEnd = () => {},
}) => {
  const start = useRef<number>(0)
  useEffect(() => {
    start.current = end
  })

  return (
    <div css={styles.container}>
      <div css={styles.space}>{end}</div>
      <div css={styles.counter}>
        <CountUp start={start.current} end={end} onEnd={onEnd} duration={1.5} />
      </div>
    </div>
  )
}

Counter.propTypes = {
  end: PropTypes.number.isRequired,
  onEnd: PropTypes.func,
}

export default Counter
