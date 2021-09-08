import { ForwardedRef, HTMLAttributes } from "react"
import { Props } from "react-select"

declare module "react-select" {
  export interface InputProps {
    id?: string
    selectProps?: Props
  }
  type InnerProps<T extends HTMLElement = HTMLElement> = HTMLAttributes<T> & {
    ref: ForwardedRef<T>
  }
  export interface IndicatorProps {
    innerProps: InnerProps
  }
}
