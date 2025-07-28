import { renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { SelectableCardOptionGroupField } from '../..'
import centos from '../__stories__/assets/centos.svg'
import debian from '../__stories__/assets/debian.svg'
import ubuntu from '../__stories__/assets/ubuntu.svg'
import {
  centosOptions,
  debianOptions,
  ubuntuOptions,
} from '../__stories__/constants'

describe('SelectableCardOptionGroupField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardOptionGroupField
        legend="Select your OS"
        name="os"
        onChange={() => {}}
        onChangeOption={() => {}}
        optionName="version"
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroupField.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroupField.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroupField.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroupField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
