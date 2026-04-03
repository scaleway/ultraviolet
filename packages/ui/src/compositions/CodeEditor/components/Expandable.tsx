'use client'

import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'

import { Text } from '../../../components/Text'
import { codeEditorStyle } from '../styles.css'

import type { Dispatch, SetStateAction } from 'react'

export const CodeEditorExpandable = ({
  expanded,
  setExpanded,
  hideText,
  showText,
}: {
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
  hideText: string
  showText: string
}) => (
  <div className={codeEditorStyle.showMoreContainer({ expanded })}>
    <button
      aria-expanded={expanded}
      className={codeEditorStyle.showMoreButton}
      onClick={() => setExpanded(prevState => !prevState)}
      type="button"
    >
      <Text
        as="span"
        className={codeEditorStyle.centeredText}
        sentiment="neutral"
        variant="bodySmallStrong"
      >
        {expanded ? hideText : showText}
        &nbsp;
        <ArrowDownIcon
          className={
            codeEditorStyle.animatedArrowIcon[expanded ? 'true' : 'false']
          }
        />
      </Text>
    </button>
  </div>
)
