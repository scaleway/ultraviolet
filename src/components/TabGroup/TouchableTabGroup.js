import React from 'react'
import { Touchable } from '..'
import Tab, { StyledTab } from './Tab'
import TabGroup from './TabGroup'

const TouchableTabGroup = ({ selected, children, ...props }) => (
  <TabGroup selected={selected} {...props}>
    {children}
  </TabGroup>
)

const StyledTouchableTab = StyledTab.withComponent(Touchable)

const TouchableTab = ({ children, ...props }) => (
  <TabGroup.Tab {...props}>
    {({ disabled, isSelected, variant, onClick, ref }) => (
      <StyledTouchableTab
        ref={ref}
        role="tab"
        tabIndex={0}
        onKeyPress={event => {
          if (['Enter', 'Space'].includes(event.code)) {
            event.preventDefault()
            onClick(event)
          }
        }}
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={onClick && onClick}
        variant={variant}
      >
        {children}
      </StyledTouchableTab>
    )}
  </TabGroup.Tab>
)

TouchableTabGroup.propTypes = TabGroup.propTypes
TouchableTabGroup.defaultProps = TabGroup.defaultProps

TouchableTab.propTypes = Tab.propTypes
TouchableTab.defaultProps = Tab.defaultProps

TouchableTabGroup.Tab = TouchableTab

export default TouchableTabGroup
