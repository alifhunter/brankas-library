import { Icon, type IconProps } from '../../Icon.js';
import { Polyline } from 'react-native-svg';

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}
