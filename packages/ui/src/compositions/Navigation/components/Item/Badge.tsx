import { Badge } from '../../../../components/Badge'
import { navigationStyle } from '../../styles.css'

import type { ItemExpandedType } from '../ComponentsTypes'

export const ItemBadge = ({
  badgeText,
  disabled,
  badgeSentiment,
}: Pick<ItemExpandedType, 'badgeText' | 'badgeSentiment' | 'disabled'>) =>
  badgeText ? (
    <Badge
      className={navigationStyle.itemBadge}
      disabled={disabled}
      prominence="strong"
      sentiment={badgeSentiment}
      size="small"
    >
      {badgeText}
    </Badge>
  ) : null
