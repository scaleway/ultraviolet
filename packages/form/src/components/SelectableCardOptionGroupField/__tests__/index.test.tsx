import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SelectableCardOptionGroupField } from '../..'
import { mockFormErrors, renderWithForm } from '../../../__tests__/helpers'
import centos from '../__stories__/assets/centos.svg'
import debian from '../__stories__/assets/debian.svg'
import ubuntu from '../__stories__/assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from '../__stories__/constants'

describe('selectableCardOptionGroupField', () => {
  it('should render correctly', () => {
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
        <SelectableCardOptionGroupField.Option image={ubuntu} label="Ubuntu" options={ubuntuOptions} value="ubuntu" />
        <SelectableCardOptionGroupField.Option image={debian} label="Debian" options={debianOptions} value="debian" />
        <SelectableCardOptionGroupField.Option image={centos} label="CentOS" options={centosOptions} value="centos" />
      </SelectableCardOptionGroupField>,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByText('Select your OS')).toBeInTheDocument()
    expect(screen.getAllByRole('radio', { hidden: true })).toHaveLength(3)
    expect(screen.getByText('Ubuntu')).toBeInTheDocument()
    expect(screen.getByText('Debian')).toBeInTheDocument()
    expect(screen.getByText('CentOS')).toBeInTheDocument()
  })

  it('selects an option and its first sub-option on click', async () => {
    const onChange = vi.fn()
    const onChangeOption = vi.fn()
    const { resultForm } = renderWithForm(
      <SelectableCardOptionGroupField
        legend="Select your OS"
        name="os"
        onChange={onChange}
        onChangeOption={onChangeOption}
        optionName="version"
      >
        <SelectableCardOptionGroupField.Option image={ubuntu} label="Ubuntu" options={ubuntuOptions} value="ubuntu" />
        <SelectableCardOptionGroupField.Option image={debian} label="Debian" options={debianOptions} value="debian" />
        <SelectableCardOptionGroupField.Option image={centos} label="CentOS" options={centosOptions} value="centos" />
      </SelectableCardOptionGroupField>,
    )

    const debianRadio = screen.getByRole('radio', { name: 'Debian', hidden: true })
    await userEvent.click(debianRadio)

    expect(debianRadio).toBeChecked()
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChangeOption).toHaveBeenCalledWith('debian-10')
    expect(resultForm.current.getValues('os')).toBe('debian')
    expect(resultForm.current.getValues('version')).toBe('debian-10')
  })

  it('shows a required error when submitting without a selection', async () => {
    renderWithForm(
      <>
        <SelectableCardOptionGroupField legend="Select your OS" name="os" required>
          <SelectableCardOptionGroupField.Option image={ubuntu} label="Ubuntu" options={ubuntuOptions} value="ubuntu" />
          <SelectableCardOptionGroupField.Option image={debian} label="Debian" options={debianOptions} value="debian" />
          <SelectableCardOptionGroupField.Option image={centos} label="CentOS" options={centosOptions} value="centos" />
        </SelectableCardOptionGroupField>
        <button type="submit">Submit</button>
      </>,
      undefined,
      { errors: mockFormErrors },
    )

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    await screen.findByText(mockFormErrors.required({ label: '' }))
  })
})
