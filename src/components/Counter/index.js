import React, { useRef, useEffect } from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
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

export function Counter({ end }) {
  const start = useRef(0)
  useEffect(() => {
    start.current = end
  })

  return (
    <div css={styles.container}>
      <div css={styles.space}>{end}</div>
      <div css={styles.counter}>
        <CountUp start={start.current} end={end} duration={1.5} />
      </div>
    </div>
  )
}

Counter.propTypes = {
  end: PropTypes.number,
}

export default Counter
