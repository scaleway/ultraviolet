import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import onKeyOnlyNumbers from '../../helpers/keycode'
import parseIntOr from '../../helpers/numbers'
import Box from '../Box'

const getPercent = (min, max, v) => (v - min) / (max - min)

const getCursorLinkWidth = cursorsRef => {
  const cursorsX = []
  cursorsRef.forEach((cursor, index) => {
    const { x } = cursor.current.getBoundingClientRect()
    // Only need the width of the first and last one
    if (index === 0 || index === cursorsRef.length - 1) {
      cursorsX.push(x)
    }
  })

  return cursorsX[1] - cursorsX[0]
}

const canMove = (value, values = [], valueIndex) => {
  // Range with single value can always move
  if (values.length === 1) return true

  const tmp = [...values]
  tmp.splice(valueIndex, 1)
  const isSmallest = otherValue => value < otherValue
  const isBiggest = otherValue => value > otherValue

  const cb = valueIndex === 0 ? isSmallest : isBiggest

  return tmp.some(cb)
}

const StyledContainer = styled(Box)`
  height: 36px;
  margin-bottom: 8px;
  width: 100%;
  position: relative;
  user-select: none;
`

const StyledBar = styled('div', {
  shouldForwardProp: prop => !['offsetTop'].includes(prop),
})`
  position: absolute;
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.zumthor};
  border-radius: 8px;
  user-select: none;
  top: ${({ offsetTop }) => offsetTop}px;
`

const StyledLimit = styled(Box, {
  shouldForwardProp: prop => !['offsetTop', 'postion'].includes(prop),
})`
  position: absolute;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray950};
  font-weight: 500;
  top: ${({ offsetTop }) => offsetTop + 8}px;

  ::before {
    content: '';
    background-color: ${({ theme }) => theme.colors.gray950};
    width: 2px;
    position: absolute;
    height: 10px;
    top: -11px;
    border-radius: 4px;
  }

  ${({ position }) =>
    position === 'left' &&
    `
    left: 8px;
    ::before {
      left: 16px;
      right: unset;
    }
  `}

  ${({ position }) =>
    position === 'right' &&
    `
    right: 8px;
    ::before {
      right: 16px;
      left: unset;
    }
  `}
`

const Limit = ({ value, label, position, offsetTop }) => (
  <StyledLimit position={position} offsetTop={offsetTop}>
    {value} {label}
  </StyledLimit>
)

Limit.defaultProps = {
  label: '',
  offsetTop: 0,
  position: undefined,
  value: 0,
}

Limit.propTypes = {
  label: PropTypes.string,
  offsetTop: PropTypes.number,
  position: PropTypes.oneOf(['left', 'right']),
  value: PropTypes.number,
}

const StyledCursorLink = styled('div', {
  shouldForwardProp: prop => !['offsetTop'].includes(prop),
})`
  position: absolute;
  top: ${({ offsetTop }) => offsetTop + 0}px;
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.violet};
  border-radius: 8px;
  user-select: none;
`

const StyledCursor = styled(Box, {
  shouldForwardProp: prop => !['offsetTop', 'width', 'grabbed'].includes(prop),
})`
  position: absolute;
  top: ${({ offsetTop }) => offsetTop + -6}px;
  height: 16px;
  width: ${({ width }) => width}px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.violet};
  background-color: white;
  cursor: ${({ grabbed }) => (grabbed ? 'grabbing' : 'grab')};
  margin-bottom: 16px;
`

const StyledInput = styled.input`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray950};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.violet};
  border-radius: 4px;
  min-height: 25px;
  min-width: 40px;
  text-align: center;
  outline: none;
  max-width: 100%;
  top: -33px;
  left: -15px;
`

const Input = ({ onChange, onKeyPress, onBlur, value, ...props }) => (
  <StyledInput
    {...props}
    onChange={onChange}
    onKeyPress={onKeyPress}
    onBlur={onBlur}
    value={value.toString()}
  />
)

Input.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  onKeyPress: () => {},
  value: 0,
}

Input.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.number,
}

const Range = ({
  min,
  max,
  value: values,
  onChange,
  name,
  cursorWidth,
  halfCursorWidth,
  limitOffset,
  offsetTop,
  ...props
}) => {
  const [internValues, setInternValues] = useState(values)

  const container = useRef()
  const cursorsLinkRef = useRef()
  const cursorsRef = values.map(useRef)
  const [grabbedCursor, grabCursor] = useState()

  const hasCursorsLink = values.length > 1

  const getNextValues = useCallback(
    (value, index) => {
      const nextValues = [...values]
      nextValues[index] = value

      return nextValues
    },
    [values],
  )
  const ceil = useCallback(
    (value, index) => {
      const isFirst = index === 0
      const isLast = index === values.length - 1
      const next = values[index + 1]
      const prev = values[index - 1]

      if (isFirst) {
        if (value <= min) {
          return min
        }
        if (hasCursorsLink) {
          if (value >= next) {
            return next - 1
          }

          return value
        }
        if (value >= max) {
          return max
        }

        return value
      }
      if (isLast) {
        if (value >= max) {
          return max
        }
        if (value <= prev) {
          return prev + 1
        }

        return value
      }

      return value
    },
    [hasCursorsLink, min, max, values],
  )

  const handleInputChange = useCallback(
    (ev, index) => {
      const value = parseIntOr(ev.currentTarget.value, -1)
      if (values[index] !== value) {
        onChange(getNextValues(value, index))
      }
    },
    [onChange, getNextValues, values],
  )
  const handleInputKeyPress = useCallback(
    (ev, index) => {
      onKeyOnlyNumbers(ev)
      if (ev.key.charCodeAt(0) === 69) {
        const value = parseIntOr(ev.currentTarget.value, 0)
        const ceiledValue = ceil(value, index)
        const nextValues = getNextValues(ceiledValue, index)

        onChange(nextValues)
        setInternValues(nextValues)
      }
    },
    [ceil, onChange, setInternValues, getNextValues],
  )
  const handleInputBlur = useCallback(
    (ev, index) => {
      const value = parseIntOr(ev.currentTarget.value, 0)
      const ceiledValue = ceil(value, index)
      const nextValues = getNextValues(ceiledValue, index)

      onChange(nextValues)
      setInternValues(nextValues)
    },
    [ceil, onChange, setInternValues, getNextValues],
  )

  const onMouseDown = useCallback(index => {
    grabCursor(index)
  }, [])

  const onMouseMove = useCallback(
    ev => {
      if (ev.target.tagName === 'INPUT') return
      const cursor = cursorsRef[grabbedCursor].current
      if (cursor) {
        const { x } = container.current.getBoundingClientRect()

        const minX = x + limitOffset
        const maxX = x + (container.current.offsetWidth - limitOffset)
        const tresholdedValue = (() => {
          if (ev.pageX >= maxX) return maxX
          if (ev.pageX <= minX) return minX

          return ev.pageX
        })()

        const percent = getPercent(minX, maxX, tresholdedValue)
        const valueFromPercentage = Math.round(percent * (max - min) + min)

        if (canMove(valueFromPercentage, values, grabbedCursor)) {
          cursor.style.transform = `translate3d(${
            tresholdedValue - minX + cursorWidth
          }px, 0, 0)`

          // Move the cursors link
          if (hasCursorsLink) {
            // If the cursor moved is the smallest, translate the cursors link
            if (grabbedCursor === 0) {
              cursorsLinkRef.current.style.transform = `translate3d(${
                tresholdedValue - minX + limitOffset
              }px, 0, 0)`
            }
            cursorsLinkRef.current.style.width = `${getCursorLinkWidth(
              cursorsRef,
            )}px`
          }

          // Fire onChange only if the computed value is different from the actual stated values
          if (values[grabbedCursor] !== valueFromPercentage) {
            container.current.removeEventListener('mousemove', onMouseMove)
            const nextValues = [...values]
            nextValues[grabbedCursor] = (() => {
              if (valueFromPercentage >= max) return max
              if (valueFromPercentage <= min) return min

              return valueFromPercentage
            })()
            onChange(nextValues)
          }
        }
      }
    },
    [
      max,
      min,
      cursorWidth,
      limitOffset,
      cursorsRef,
      values,
      grabbedCursor,
      onChange,
      hasCursorsLink,
    ],
  )

  const onMouseUp = useCallback(() => {
    container.current.removeEventListener('mousemove', onMouseMove)
    grabCursor()
  }, [container, onMouseMove])

  useEffect(() => {
    const initialCursorsTranslate = []

    // Set initial cursors position
    cursorsRef.forEach((cursor, index) => {
      const cursorCurrent = cursor.current
      const percent = getPercent(min, max, internValues[index])
      const translate =
        (container.current.offsetWidth - limitOffset * 2) * percent

      const tresholdedTranslate = translate + limitOffset - halfCursorWidth

      cursorCurrent.style.transform = `translate3d(${tresholdedTranslate}px, 0, 0)`

      if (hasCursorsLink) {
        if (index === 0 || index === cursorsRef.length - 1) {
          initialCursorsTranslate.push(tresholdedTranslate)
        }
      }
    })

    // Set initial cursors links position
    if (hasCursorsLink) {
      const [firstCursorTranslate = 0, lastCursorTranslate = 0] =
        initialCursorsTranslate
      cursorsLinkRef.current.style.width = `${
        lastCursorTranslate - firstCursorTranslate
      }px`
      cursorsLinkRef.current.style.transform = `translate3d(${
        firstCursorTranslate + halfCursorWidth
      }px, 0, 0)`
    }

    // Needed to position the cursor only when internal state change
    // It happens only on input onBlur and input keyPress === 69
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internValues])

  useLayoutEffect(() => {
    if (grabbedCursor !== undefined) {
      container.current.addEventListener('mousemove', onMouseMove)
    }
  }, [cursorsRef, grabbedCursor, onMouseMove, values])

  return (
    <StyledContainer
      ref={container}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
      {...props}
    >
      <StyledBar offsetTop={offsetTop} />
      <Limit postion="left" offsetTop={offsetTop} value={min} label="(min)" />
      <Limit postion="right" offsetTop={offsetTop} value={max} label="(max)" />
      {hasCursorsLink && (
        <StyledCursorLink offsetTop={offsetTop} ref={cursorsLinkRef} />
      )}
      {values.map((value, index) => (
        <StyledCursor
          as="span"
          offsetTop={offsetTop}
          width={cursorWidth}
          grabbed={grabbedCursor !== undefined}
          // eslint-disable-next-line react/no-array-index-key
          key={`cursor-${index}`}
          ref={cursorsRef[index]}
          onMouseDown={() => onMouseDown(index)}
        >
          <Input
            name={`${name}-${index}`}
            value={values[index] === -1 ? '' : value}
            onChange={ev => handleInputChange(ev, index)}
            onKeyPress={ev => handleInputKeyPress(ev, index)}
            onBlur={ev => handleInputBlur(ev, index)}
          />
        </StyledCursor>
      ))}
    </StyledContainer>
  )
}

Range.propTypes = {
  cursorWidth: PropTypes.number,
  halfCursorWidth: PropTypes.number,
  limitOffset: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  offsetTop: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
  ]),
}

Range.defaultProps = {
  cursorWidth: 16,
  halfCursorWidth: 8,
  limitOffset: 24,
  max: 5,
  min: 0,
  name: 'rangeInput',
  offsetTop: 16,
  onChange: () => {},
  value: [3],
}

export default Range
