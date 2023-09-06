import { cloneElement, isValidElement, ReactNode } from 'react'
import {
  DocsContainer as BaseContainer,
  DocsContainerProps as BaseContainerProps,
} from '@storybook/blocks'
import { light } from '../storybookThemes'

type ExtraProps = {
  /**
   * When a component is deprecated we can set this property to true
   */
  deprecated: boolean
  /**
   * When a component is deprecated we can why and by what to replace it
   */
  deprecatedReason: string
  /**
   * When a component is deprecated we can add a link to the migration guide
   */
  migrationLink: string
  /**
   * This prop, if set to true, will hide the args table where you have the props definition and controls
   */
  hideArgsTable?: boolean
  /**
   * This prop can be used to define if a component is being tested and not prod ready
   */
  experimental?: boolean
}

type DocsContainerProps = BaseContainerProps & {
  context: { attachedCSFFile: { meta: { parameters?: ExtraProps } } }
} & { children: ReactNode }

const DocsContainer = ({ children, context }: DocsContainerProps) => (
  <BaseContainer theme={light} context={context}>
    {isValidElement<ExtraProps>(children)
      ? cloneElement(children, {
          deprecated: context.attachedCSFFile.meta.parameters?.deprecated,
          deprecatedReason:
            context.attachedCSFFile.meta.parameters?.deprecatedReason,
          migrationLink: context.attachedCSFFile.meta.parameters?.migrationLink,
          hideArgsTable: context.attachedCSFFile.meta.parameters?.hideArgsTable,
          experimental: context.attachedCSFFile.meta.parameters?.experimental,
        })
      : children}
  </BaseContainer>
)

export default DocsContainer
