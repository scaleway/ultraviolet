import PropTypes from 'prop-types'
import React, { useLayoutEffect, useState } from 'react'

const ErrorTransition = ({ error, Component, ...props }) => {
  const [err, setErr] = useState()
  useLayoutEffect(() => {
    const timer = setTimeout(() => setErr(error), 2000)

    return () => timer && clearTimeout(timer)
  }, [error])

  return <Component error={err} {...props} />
}

ErrorTransition.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.shape({}),
  ]).isRequired,
  error: PropTypes.string.isRequired,
}

export default ErrorTransition
