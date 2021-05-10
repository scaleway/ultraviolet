import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Button from '../Button'
import RichSelect from '../RichSelect'
import Tags from '../Tags'
import Tooltip from '../Tooltip'

const RichSelectContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray350};
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  margin-right: 16px;
`

const Icon = styled.img`
  width: 100%;
  max-width: 34px;
  height: auto;
`

const RichSelectTags = ({
  ctaText,
  ctaDisabled,
  ctaTooltip,
  placeholder,
  icon,
  initialTags,
  onChange,
  onChangeSelectValue,
  value,
  options,
  name,
  ...props
}) => {
  const mapOptionsToTags = options.filter(
    opt => initialTags.indexOf(opt.value) > -1,
  )

  const [{ stateTags, newPotentielTag }, setTags] = useState({
    stateTags: mapOptionsToTags,
    newPotentielTag: value || '',
  })

  const tagsValue = stateTags.map(tag => tag.value)

  const finalOptions = options.filter(
    option => tagsValue.indexOf(option.value) === -1,
  )

  const onChangeSelect = e => {
    if (e) {
      setTags({
        stateTags,
        newPotentielTag: e,
      })
      onChangeSelectValue(e)
    }
  }

  const onChangeTag = e => {
    if (e) {
      setTags({ newPotentielTag, stateTags: e })
      onChange(e)
    }
  }

  const addTag = () => {
    if (value) {
      setTags({
        stateTags: [...stateTags, value],
        newPotentielTag: null,
      })
      onChangeSelectValue(null)
      onChange([...stateTags, value])
    }
  }

  return (
    <>
      <RichSelectContainer>
        {icon && (
          <IconContainer>
            <Icon src={icon} alt="ip-flexible" />
          </IconContainer>
        )}
        <RichSelect
          placeholder={placeholder}
          onChange={onChangeSelect}
          value={value}
          options={finalOptions}
          flex={1}
          name={`richselect-${name}`}
          {...props}
        />
        <Tooltip text={ctaTooltip}>
          <Button
            onClick={addTag}
            variant="secondary"
            minWidth={144}
            ml={2}
            disabled={ctaDisabled}
            data-testid="rich-select-tags-add"
          >
            {ctaText}
          </Button>
        </Tooltip>
      </RichSelectContainer>
      <Tags
        manualInput={false}
        name={`tags-${name}`}
        tags={stateTags}
        areTagsObject
        onChange={onChangeTag}
        variant="bordered"
      />
    </>
  )
}

RichSelectTags.propTypes = {
  ctaText: PropTypes.string,
  ctaDisabled: PropTypes.bool,
  ctaTooltip: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  initialTags: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  onChange: PropTypes.func.isRequired,
  onChangeSelectValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

RichSelectTags.defaultProps = {
  ctaDisabled: false,
  ctaText: 'Add',
  placeholder: 'Select an option in the list',
  ctaTooltip: undefined,
  initialTags: [],
  icon: undefined,
  value: undefined,
}

export default RichSelectTags
