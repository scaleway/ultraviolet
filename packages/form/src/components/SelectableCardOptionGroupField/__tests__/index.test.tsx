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
        name="os"
        optionName="version"
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        legend="Select your OS"
      >
        <SelectableCardOptionGroupField.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroupField.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroupField.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroupField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
