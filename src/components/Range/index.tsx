import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  InputHTMLAttributes,
  KeyboardEvent,
  RefObject,
  VoidFunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import onKeyOnlyNumbers from '../../helpers/keycode'
import parseIntOr from '../../helpers/numbers'
import Box from '../Box'

const getPercent = (min: number, max: number, v: number): number =>
  (v - min) / (max - min)

const getCursorLinkWidth = (cursorsRef: RefObject<HTMLElement>[]) => {
  const cursorsX: number[] = []
  cursorsRef.forEach((cursor: RefObject<HTMLElement>, index: number) => {
    const { x }: { x: number } = cursor.current?.getBoundingClientRect() || {
      x: 0,
    }
    // Only need the width of the first and last one
    if (index === 0 || index === cursorsRef.length - 1) {
      cursorsX.push(x)
    }
  })

  return cursorsX[1] - cursorsX[0]
}

const canMove = (value: number, values: number[] = [], valueIndex: number) => {
  // Range with single value can always move
  if (values.length === 1) return true

  const tmp = [...values]
  tmp.splice(valueIndex, 1)
  const isSmallest = (otherValue: number) => value < otherValue
  const isBiggest = (otherValue: number) => value > otherValue

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
  shouldForwardProp: prop => !['offsetTop'].includes(prop.toString()),
})<{ offsetTop: number }>`
  position: absolute;
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.zumthor};
  border-radius: 8px;
  user-select: none;
  top: ${({ offsetTop }) => offsetTop}px;
`

const StyledLimit = styled(Box, {
  shouldForwardProp: prop =>
    !['offsetTop', 'position'].includes(prop.toString()),
})<{ offsetTop: number }>`
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

type LimitProps = {
  label?: string
  offsetTop?: number
  position?: 'left' | 'right'
  value?: number
}

const Limit: VoidFunctionComponent<LimitProps> = ({
  value = 0,
  label = '',
  position,
  offsetTop = 0,
}) => (
  <StyledLimit position={position} offsetTop={offsetTop}>
    {value} {label}
  </StyledLimit>
)

Limit.propTypes = {
  label: PropTypes.string,
  offsetTop: PropTypes.number,
  position: PropTypes.oneOf(['left', 'right']),
  value: PropTypes.number,
}

const StyledCursorLink = styled('div', {
  shouldForwardProp: prop => !['offsetTop'].includes(prop.toString()),
})<{ offsetTop: number }>`
  position: absolute;
  top: ${({ offsetTop = 0 }) => offsetTop + 0}px;
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.violet};
  border-radius: 8px;
  user-select: none;
`

const StyledCursor = styled(Box, {
  shouldForwardProp: prop =>
    !['offsetTop', 'width', 'grabbed'].includes(prop.toString()),
})<{ grabbed: boolean; offsetTop: number; width: string | number }>`
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

type InputProps = {
  value?: number
} & InputHTMLAttributes<HTMLInputElement>

const Input: FunctionComponent<InputProps> = ({
  onChange,
  onKeyPress,
  onBlur,
  value = 0,
  ...props
}) => (
  <StyledInput
    {...props}
    onChange={onChange}
    onKeyPress={onKeyPress}
    onBlur={onBlur}
    value={value.toString()}
  />
)

Input.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.number,
}

export type RangeProps = {
  cursorWidth?: number
  halfCursorWidth?: number
  limitOffset?: number
  max?: number
  min?: number
  name?: string
  offsetTop?: number
  onChange?(data: unknown): void
  value?: number[]
}

const Range: VoidFunctionComponent<RangeProps> = ({
  min = 0,
  max = 5,
  value: values = [3],
  onChange = () => {},
  name = 'rangeInput',
  cursorWidth = 16,
  halfCursorWidth = 8,
  limitOffset = 24,
  offsetTop = 16,
  ...props
}) => {
  const [internValues, setInternValues] = useState(values)

  const container = useRef<HTMLElement>(null)
  const cursorsLinkRef = useRef<HTMLDivElement>(null)
  const cursorsRef = values.map(useRef) as RefObject<HTMLElement>[]
  const [grabbedCursor, grabCursor] = useState<number>()

  const hasCursorsLink = values.length > 1

  const getNextValues = useCallback(
    (value: number, index: number) => {
      const nextValues = [...values]
      nextValues[index] = value

      return nextValues
    },
    [values],
  )
  const ceil = useCallback(
    (value: number, index: number) => {
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
    (ev: ChangeEvent<HTMLInputElement>, index: number) => {
      const value = parseIntOr(ev.currentTarget.value, -1)
      if (values[index] !== value) {
        onChange(getNextValues(value, index))
      }
    },
    [onChange, getNextValues, values],
  )
  const handleInputKeyPress = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>, index: number) => {
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
    (ev: FocusEvent<HTMLInputElement>, index: number) => {
      const value: number = parseIntOr(
        (ev.currentTarget as HTMLInputElement).value,
        0,
      )
      const ceiledValue = ceil(value, index)
      const nextValues = getNextValues(ceiledValue, index)

      onChange(nextValues)
      setInternValues(nextValues)
    },
    [ceil, onChange, setInternValues, getNextValues],
  )

  const onMouseDown = useCallback((index: number) => {
    grabCursor(index)
  }, [])

  const onMouseMove = useCallback(
    (ev: MouseEvent) => {
      if ((ev.target as HTMLElement).tagName === 'INPUT') return

      let cursor
      if (grabbedCursor !== undefined) {
        cursor = cursorsRef?.[grabbedCursor]?.current
      }

      if (cursor && container.current) {
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

        if (
          grabbedCursor !== undefined &&
          canMove(valueFromPercentage, values, grabbedCursor)
        ) {
          cursor.style.transform = `translate3d(${
            tresholdedValue - minX + cursorWidth
          }px, 0, 0)`

          // Move the cursors link
          if (hasCursorsLink && cursorsLinkRef.current) {
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
    if (container.current) {
      container.current.removeEventListener('mousemove', onMouseMove)
      grabCursor(undefined)
    }
  }, [container, onMouseMove])

  useEffect(() => {
    const initialCursorsTranslate: number[] = []

    // Set initial cursors position
    cursorsRef.forEach((cursor, index) => {
      const cursorCurrent = cursor.current
      if (cursorCurrent && container.current) {
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
      }
    })

    // Set initial cursors links position
    if (hasCursorsLink && cursorsLinkRef.current) {
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
    if (grabbedCursor !== undefined && container.current) {
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
      <Limit position="left" offsetTop={offsetTop} value={min} label="(min)" />
      <Limit position="right" offsetTop={offsetTop} value={max} label="(max)" />
      {hasCursorsLink && (
        <StyledCursorLink offsetTop={offsetTop} ref={cursorsLinkRef} />
      )}
      {values.map((value: number, index: number) => (
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
            value={values[index] === -1 ? undefined : value}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(ev, index)
            }
            onKeyPress={(ev: KeyboardEvent<HTMLInputElement>) =>
              handleInputKeyPress(ev, index)
            }
            onBlur={(ev: FocusEvent<HTMLInputElement>) =>
              handleInputBlur(ev, index)
            }
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
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number.isRequired)]),
}

export default Range
