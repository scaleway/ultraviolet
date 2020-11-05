import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from 'react'
import { onKeyOnlyNumbers, parseIntOr } from '../../helpers'
import { theme } from '../../theme'
import { Box } from '../Box'

const styles = {
  limit: offsetTop => css`
    position: absolute;
    font-size: 12px;
    color: ${theme.gray950};
    font-weight: 500;
    top: ${offsetTop + 8}px;

    ::before {
      content: '';
      background-color: ${theme.gray950};
      width: 2px;
      position: absolute;
      height: 10px;
      top: -11px;
      border-radius: 4px;
    }
  `,
  limitLeft: css`
    left: 8px;
    ::before {
      left: 16px;
      right: unset;
    }
  `,
  limitRight: css`
    right: 8px;
    ::before {
      right: 16px;
      left: unset;
    }
  `,
  container: css`
    height: 36px;
    margin-bottom: 8px;
    width: 100%;
    position: relative;
    user-select: none;
  `,
  bar(offsetTop) {
    return css`
  position: absolute;
  height: 4px;
  width: 100%;
  background-color ${theme.zumthor};
  border-radius: 8px;
  user-select: none;
  top: ${offsetTop}px;
  `
  },
  cursorsLink: offsetTop => css`
  position: absolute;
  top: ${offsetTop + 0}px;
  height: 4px;
  width: 100%;
  background-color ${theme.violet};
  border-radius: 8px;
  user-select: none;
  `,
  cursor: (offsetTop, cursorWidth, isGrabbed) => css`
    position: absolute;
    top: ${offsetTop + -6}px;
    height: 16px;
    width: ${cursorWidth}px;
    border-radius: 50%;
    border: 4px solid ${theme.violet};
    background-color: white;
    cursor: ${isGrabbed ? 'grabbing' : 'grab'};
    margin-bottom: 16px;
  `,
  input: css`
    position: absolute;
    color: ${theme.gray950};
    background-color: ${theme.white};
    font-size: 16px;
    border: 1px solid ${theme.violet};
    border-radius: 4px;
    min-height: 25px;
    min-width: 40px;
    text-align: center;
    outline: none;
    max-width: 100%;
    top: -33px;
    left: -15px;
  `,
}

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

const Input = ({
  onChange = () => {},
  onKeyPress = () => {},
  onBlur = () => {},
  value = '',
  ...props
}) => (
  <input
    {...props}
    css={[styles.input]}
    onChange={onChange}
    onKeyPress={onKeyPress}
    onBlur={onBlur}
    value={value.toString()}
  />
)

const Limit = ({ value, label, ...props }) => (
  <Box {...props}>
    {value} {label}
  </Box>
)

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
        const tresholdedValue =
          ev.pageX >= maxX ? maxX : ev.pageX <= minX ? minX : ev.pageX

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
            nextValues[grabbedCursor] =
              valueFromPercentage >= max
                ? max
                : valueFromPercentage <= min
                ? min
                : valueFromPercentage
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
      const percent = getPercent(min, max, internValues[index])
      const translate =
        (container.current.offsetWidth - limitOffset * 2) * percent

      const tresholdedTranslate = translate + limitOffset - halfCursorWidth

      cursor.current.style.transform = `translate3d(${tresholdedTranslate}px, 0, 0)`
      if (hasCursorsLink) {
        if (index === 0 || index === cursorsRef.length - 1) {
          initialCursorsTranslate.push(tresholdedTranslate)
        }
      }
    })

    // Set initial cursors links position
    if (hasCursorsLink) {
      const [
        firstCursorTranslate = 0,
        lastCursorTranslate = 0,
      ] = initialCursorsTranslate
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
    <Box
      css={styles.container}
      ref={container}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
      {...props}
    >
      <div css={styles.bar(offsetTop)} />
      <Limit
        css={[styles.limit(offsetTop), styles.limitLeft]}
        value={min}
        label="(min)"
      />
      <Limit
        css={[styles.limit(offsetTop), styles.limitRight]}
        value={max}
        label="(max)"
      />
      {hasCursorsLink && (
        <div css={styles.cursorsLink(offsetTop)} ref={cursorsLinkRef} />
      )}
      {values.map((value, index) => (
        <Box
          as="span"
          css={styles.cursor(
            offsetTop,
            cursorWidth,
            grabbedCursor !== undefined,
          )}
          key={`cursor-${index}`}
          ref={cursorsRef[index]}
          onMouseDown={() => onMouseDown(index)}
        >
          <Input
            name={name}
            value={values[index] === -1 ? '' : value}
            onChange={ev => handleInputChange(ev, index)}
            onKeyPress={ev => handleInputKeyPress(ev, index)}
            onBlur={ev => handleInputBlur(ev, index)}
          />
        </Box>
      ))}
    </Box>
  )
}

Range.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  name: PropTypes.string,
  cursorWidth: PropTypes.number,
  halfCursorWidth: PropTypes.number,
  limitOffset: PropTypes.number,
  offsetTop: PropTypes.number,
}

Range.defaultProps = {
  min: 0,
  max: 5,
  value: [3],
  onChange: () => {},
  name: 'rangeInput',
  cursorWidth: 16,
  halfCursorWidth: 8,
  limitOffset: 24,
  offsetTop: 16,
}

export { Range }
