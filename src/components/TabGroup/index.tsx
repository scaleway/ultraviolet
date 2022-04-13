import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ComponentProps,
  HTMLAttributes,
  KeyboardEventHandler,
  ReactChild,
  ReactFragment,
  ReactPortal,
  WeakValidationMap,
  cloneElement,
  isValidElement,
  useCallback,
  useState,
} from 'react'
import flattenChildren from 'react-flatten-children'
import Box, { BoxProps } from '../Box'
import Tab from './Tab'

const StyledTabs = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.colors.neutral.borderWeak};
`

const StyledBorderBottom = styled.div`
  position: absolute;
  display: block;
  background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
  height: 2px;
  padding: inherit;
  transition: left 300ms cubic-bezier(0.5, 1, 0.89, 1),
    width 300ms cubic-bezier(0.5, 1, 0.89, 1);
`

const getCurrentTabIndex = (
  selected: string | number,
  children: (ReactChild | ReactFragment | ReactPortal)[],
): number =>
  children.findIndex(
    (child: ReactChild | ReactFragment | ReactPortal, index: number) => {
      if (isValidElement<{ name?: string }>(child) && child.props.name) {
        return child.props.name === selected.toString()
      }

      return index === Number(selected)
    },
  )

const computeBarProperties = (tabsWidth: number[], index: number) => {
  if (!tabsWidth.length) return [0, 0]
  const width = tabsWidth[index]
  const left = tabsWidth.reduce((acc, cur, idx) => {
    if (idx < index) {
      return acc + cur
    }

    return acc
  }, 0)

  return [width, left]
}

type TabGroupProps = {
  selected?: number | string
  onChange?: (data?: string | number) => void
} & Omit<HTMLAttributes<HTMLElement>, 'onChange'> &
  Omit<BoxProps, 'selected' | 'onChange'>

const TabGroup: ((props: TabGroupProps) => JSX.Element) & {
  Tab: typeof Tab
  propTypes: WeakValidationMap<TabGroupProps>
} = ({
  children = null,
  selected,
  onChange = () => {},
  className,
  ...props
}) => {
  const flattenedChildren = flattenChildren(children)
  const [tabsWidth, setTabsWidth] = useState([])
  const setInternTabsWidth = useCallback(
    (width: number, index: number) =>
      setTabsWidth((prev: number[]) => {
        const all: number[] = [...prev]
        all[index] = width

        return all as never[]
      }),
    [setTabsWidth],
  )

  const isTabsWidthSet = tabsWidth.length === flattenedChildren.length

  const currentTabIndex =
    selected !== undefined && React.Children.count(children) > 0
      ? getCurrentTabIndex(selected, flattenedChildren)
      : -1

  const [width, left] = computeBarProperties(tabsWidth, currentTabIndex)

  const navigateWithArrow: KeyboardEventHandler<HTMLInputElement> = ({
    currentTarget,
    code,
  }) => {
    const activeTab = '[role="tab"]:focus'
    const enabledTab = '[role="tab"]:not([aria-disabled="true"]'
    if (code === 'ArrowLeft') {
      const previousTab =
        (currentTarget.querySelector(activeTab)
          ?.previousElementSibling as HTMLElement) ||
        [...Array.from(currentTarget.querySelectorAll(enabledTab))].pop()
      previousTab?.focus()
    } else if (code === 'ArrowRight') {
      const nextTab =
        (currentTarget.querySelector(
          `${activeTab} ~ ${enabledTab}`,
        ) as HTMLElement) ||
        (currentTarget.querySelector(enabledTab) as HTMLElement)
      nextTab?.focus()
    }
  }

  return (
    <Box {...props} position="relative">
      <StyledTabs
        role="tablist"
        className={className}
        onKeyDown={navigateWithArrow}
      >
        {flattenedChildren.map((child, index) => {
          if (isValidElement<ComponentProps<typeof Tab>>(child)) {
            const isSelected = child.props.name
              ? child.props.name === selected
              : index === selected

            return cloneElement(child, {
              index,
              isSelected,
              isTabsWidthSet,
              key: child.props.name || index,
              onChangeTab: () => {
                if (!child.props.disabled) {
                  onChange?.(child.props.name || index)
                }
              },
              onClick: child.props.onClick,
              onKeyDown: child.props.onKeyDown,
              setInternTabsWidth,
            })
          }

          return null
        })}
      </StyledTabs>

      <StyledBorderBottom
        style={{
          left,
          width,
        }}
      />
    </Box>
  )
}

TabGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

TabGroup.Tab = Tab

export default TabGroup
