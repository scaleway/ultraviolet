'use client'

import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { cn } from '@ultraviolet/utils'
import { forwardRef } from 'react'

import { Menu } from '../Menu'

import { tabsStyle } from './styles.css'

import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
  Ref,
} from 'react'

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
    <div className={tabsStyle.menuWrapper}>
      <Menu
        disclosure={
          <button
            aria-disabled={disabled ?? 'false'}
            aria-haspopup="menu"
            aria-selected={ariaSelected}
            className={cn(className, tabsStyle.button)}
            disabled={disabled}
            role="tab"
            type="button"
            {...props}
          >
            {disclosure}
            <ArrowDownIcon className={tabsStyle.arrowIcon} />
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
