import { forwardRef } from 'react';
import { Animated, View } from 'react-native';
import {
  SpatialNavigationNode,
  useSpatialNavigatorFocusableAccessibilityProps,
} from 'react-tv-space-navigation';
import { Typography } from './Typography';
import styled from '@emotion/native';
import { useFocusAnimation } from '../helpers/useFocusAnimation';
import { scaledPixels } from '../helpers/scaledPixels';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spacer } from './Spacer';

type ButtonProps = {
  label: string;
  icon: string,
  onSelect?: () => void;
};

const ButtonContent = forwardRef<View, { label: string; icon?: string, isFocused: boolean }>((props, ref) => {
  const { isFocused, label, icon } = props;
  const anim = useFocusAnimation(isFocused);
  const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();
  return (
    <Container style={anim } isFocused={isFocused} ref={ref} {...accessibilityProps}>
      {icon !== "" && <Icon name={icon!} size={20} color={isFocused ? 'black' : 'white'} />}
      <Spacer direction="horizontal" gap="$2" />
      <ColoredTypography isFocused={isFocused}>{label}</ColoredTypography>
    </Container>
  );
});

ButtonContent.displayName = 'ButtonContent';

export const Button = ({ label, icon, onSelect }: ButtonProps) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
      {({ isFocused }) => <ButtonContent label={label} icon={icon} isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};

const Container = styled(Animated.View)<{ isFocused: boolean }>(({ isFocused, theme }) => ({
  flexDirection: 'row',
  alignSelf: 'baseline',
  backgroundColor: isFocused ? 'white' : 'black',
  padding: theme.spacings.$4,
  borderRadius: scaledPixels(12),
}));

const ColoredTypography = styled(Typography)<{ isFocused: boolean }>(({ isFocused }) => ({
  color: isFocused ? 'black' : 'white',
}));
