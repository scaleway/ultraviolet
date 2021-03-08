import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import flattenChildren from 'react-flatten-children'
import { Box } from '../Box'
import Tab from './Tab'

const StyledTabs = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme: { colors } }) => colors.gray350};
`

const StyledBorderBottom = styled.div`
  position: absolute;
  display: block;
  background-color: ${({ theme: { colors } }) => colors.primary};
  height: 2px;
  padding: inherit;
  transition: left 300ms cubic-bezier(0.5, 1, 0.89, 1),
    width 300ms cubic-bezier(0.5, 1, 0.89, 1);
`

const getCurrentTabIndex = (selected, children) =>
  children.findIndex((child, index) =>
    child.props.name ? child.props.name === selected : index === selected,
  )

const computeBarProperties = (tabsWidth, index) => {
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

const TabGroup = ({
  children,
  selected,
  onChange,
  className,
  variant = 'default',
  ...props
}) => {
  const flattenedChildren = flattenChildren(children)
  const [tabsWidth, setTabsWidth] = useState([])
  const setInternTabsWidth = useCallback(
    (width, index) =>
      setTabsWidth(prev => {
        const all = [...prev]
        all[index] = width

        return all
      }),
    [setTabsWidth],
  )

  const isTabsWidthSet = tabsWidth.length === flattenedChildren.length

  const currentTabIndex =
    selected !== undefined && children.length
      ? getCurrentTabIndex(selected, flattenedChildren)
      : -1

  const [width, left] = computeBarProperties(tabsWidth, currentTabIndex)

  return (
    <Box {...props} position="relative">
      <StyledTabs role="tablist" className={className}>
        {flattenedChildren.map((child, index) => {
          const isSelected = child.props.name
            ? child.props.name === selected
            : index === selected

          return React.cloneElement(child, {
            key: child.props.name || index,
            isSelected,
            variant,
            setInternTabsWidth,
            isTabsWidthSet,
            index,
            onClick: event => {
              if (!child.props.disabled && onChange) {
                onChange(child.props.name || index)
              }
              if (child.props.onClick) {
                child.props.onClick(event)
              }
            },
          })
        })}
      </StyledTabs>

      <StyledBorderBottom
        variant={variant}
        style={{
          width,
          left,
        }}
      />
    </Box>
  )
}

// React doesn't support type checking from another file in stable release (react-docgen) so we need to define variants like this
// At this moment (2021-03-08 (March)  5.4.0-alpha.0 contains the fix (but it's not a stable release))
// In the future don't forget to update "babel-plugin-react-docgen" taht support imported types (take care that storybook support it)
// https://github.com/reactjs/react-docgen/issues/153
// More information here : https://github.com/reactjs/react-docgen/pull/464
const variants = ['default']

TabGroup.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(variants),
}

TabGroup.defaultProps = {
  children: null,
  onChange: () => {},
  className: '',
  variant: 'default',
  selected: undefined,
}

TabGroup.Tab = Tab

export default TabGroup
