import PropTypes from 'prop-types'
import { useLayoutEffect, useState } from 'react'

const ErrorTransition = ({
  error,
  children,
}: {
  error: string
  children: (error?: string) => JSX.Element
}) => {
  const [err, setErr] = useState<string>()
  useLayoutEffect(() => {
    const timer = setTimeout(() => setErr(error), 2000)

    return () => timer && clearTimeout(timer)
  }, [error])

  return children(err)
}

ErrorTransition.propTypes = {
  children: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default ErrorTransition
