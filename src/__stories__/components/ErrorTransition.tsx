import PropTypes from 'prop-types'
import React, { VoidFunctionComponent, useLayoutEffect, useState } from 'react'

const ErrorTransition: VoidFunctionComponent<{
  error: unknown
  Component: React.ElementType
}> = ({ error, Component, ...props }) => {
  const [err, setErr] = useState<unknown>()
  useLayoutEffect(() => {
    const timer = setTimeout(() => setErr(error), 2000)

    return () => timer && clearTimeout(timer)
  }, [error])

  return <Component error={err} {...props} />
}

ErrorTransition.propTypes = {
  // @ts-expect-error we don't really care about the proptype here
  Component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.shape({}),
  ]).isRequired,
  error: PropTypes.string.isRequired,
}

export default ErrorTransition
