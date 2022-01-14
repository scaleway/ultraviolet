import PropTypes from 'prop-types'
<<<<<<< HEAD
import { useLayoutEffect, useState } from 'react'

const ErrorTransition = ({
  error,
  children,
}: {
  error: string
  children: (error?: string) => JSX.Element
}) => {
  const [err, setErr] = useState<string>()
=======
import {
  ElementType,
  VoidFunctionComponent,
  useLayoutEffect,
  useState,
} from 'react'

const ErrorTransition: VoidFunctionComponent<{
  error: unknown
  Component: ElementType
}> = ({ error, Component, ...props }) => {
  const [err, setErr] = useState<unknown>()
>>>>>>> chore(react):react17 new jsx transform
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
