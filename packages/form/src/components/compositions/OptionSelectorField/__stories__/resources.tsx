import {
  DebianLogo,
  ProxmoxLogo,
  UbuntuLogo,
  WindowsLogo,
} from '@ultraviolet/icons/logo'

export const firstSelectorOptions = [
  {
    content: 'Ubuntu',
    icon: <UbuntuLogo />,
    value: 'ubuntu',
  },
  {
    content: 'Debian',
    icon: <DebianLogo />,
    value: 'debian',
  },
  {
    content: 'Proxmox',
    icon: <ProxmoxLogo />,
    value: 'proxmox',
  },
  {
    content: 'Window',
    icon: <WindowsLogo />,
    value: 'windows',
  },
]
export const secondSelectorOptions = [
  {
    content: '19.01',
    value: '19.01',
  },
  {
    content: '20.04',
    hoverContent: '20.04 (latest)',
    value: '20.04',
  },
]
