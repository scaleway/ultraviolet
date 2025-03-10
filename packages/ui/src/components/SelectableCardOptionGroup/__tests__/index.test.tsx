import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectableCardOptionGroup } from '..'
import centos from '../__stories__/assets/centos.svg'
import debian from '../__stories__/assets/debian.svg'
import ubuntu from '../__stories__/assets/ubuntu.svg'
import {
  centosOptions,
  debianOptions,
  ubuntuOptions,
} from '../__stories__/constants'

describe('SelectableCardOptionGroup', () => {
  test('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        legend="Select your OS"
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with medium size', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        size="medium"
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with aria-label', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        size="medium"
        aria-label="Select your OS"
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          aria-label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          aria-label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          aria-label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with id', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        size="medium"
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
          id="ubuntu-option"
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
          id="debian-option"
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
          id="centos-option"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with all options disabled', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        disabled
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with partial disabled', async () => {
    const onChange = vi.fn()
    const onChangeOption = vi.fn()

    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={onChange}
        onChangeOption={onChangeOption}
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
          disabled
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    await userEvent.click(screen.getByLabelText('Debian'))
    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.click(screen.getByLabelText('Debian option'))
    expect(onChangeOption).toHaveBeenCalledTimes(0)

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error message', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        error="Error message"
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )
    expect(screen.getByText('Error message')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error as boolean', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        error
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with image as ReactNode', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={<img src={ubuntu} alt="Ubuntu" />}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={<img src={debian} alt="Debian" />}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={<img src={centos} alt="CentOS" />}
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly 4 columns', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        columns={4}
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with helper', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
        helper="Helper message"
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )
    expect(screen.getByText('Helper message')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('onChange and onChangeOption are being called', async () => {
    const onChange = vi.fn()
    const onChangeOption = vi.fn()

    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={onChange}
        onChangeOption={onChangeOption}
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>,
    )

    await userEvent.click(screen.getByLabelText('Debian'))
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    await userEvent.click(screen.getByLabelText('Debian option'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('tabulation works in correct order selectable card > select input', async () => {
    renderWithTheme(
      <SelectableCardOptionGroup
        value="ubuntu"
        optionValue="ubuntu-20.04"
        onChange={() => {}}
        onChangeOption={() => {}}
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
      </SelectableCardOptionGroup>,
    )

    await userEvent.keyboard('{tab}')
    expect(screen.getByRole('button')).toHaveFocus() // This is the selectable card

    await userEvent.keyboard('{tab}')
    expect(screen.getByRole('combobox')).toHaveFocus() // This is the select input
  })
})
