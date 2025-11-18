'use client'

import { ArrowDownIcon } from '@ultraviolet/icons'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import { Menu } from '../Menu'
import { tabsArrowIcon, tabsButton, tabsMenuWrapper } from './styles.css'

type TabMenuProps = {
  children: ReactNode
  disclosure: ReactNode
  visible?: ComponentProps<typeof Menu>['visible']
  id?: ComponentProps<typeof Menu>['id']
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'>

export const TabMenu = forwardRef(
  (
    {
      children,
      disclosure,
      visible,
      id,
      disabled,
      className,
      'aria-selected': ariaSelected,
      ...props
    }: TabMenuProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <div className={tabsMenuWrapper}>
      <Menu
        disclosure={
          <button
            aria-disabled={disabled ?? 'false'}
            aria-haspopup="menu"
            aria-selected={ariaSelected}
            className={`${className ? `${className} ` : ''}${tabsButton}`}
            disabled={disabled}
            role="tab"
            type="button"
            {...props}
          >
            {disclosure}
            <ArrowDownIcon className={tabsArrowIcon} />
          </button>
        }
        id={id}
        placement="bottom"
        portalTarget={document.body} // We need to attach it to the body to avoid overflow issues
        ref={ref}
        visible={visible}
      >
        {children}
      </Menu>
    </div>
  ),
)
