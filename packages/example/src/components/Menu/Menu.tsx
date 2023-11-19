import { Direction } from '@bam.tech/lrud';
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import { useMenuContext } from './MenuContext';
import { Button } from '../../design-system/components/Button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, TouchableOpacity, View, } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../../design-system/components/Typography';
import { Spacer } from '../../design-system/components/Spacer';
import { Box } from '../../design-system/components/Box';
import { useTheme } from '@emotion/react';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowDimensions = Dimensions.get('window');

const MenuItem = ({
  icon,
  shortLabel,
  label,
  isMenuOpen,
}: {
  icon: string;
  shortLabel: string;
  label: string;
  isMenuOpen: boolean;
}) => {
  
  return (
    <Box direction="horizontal" alignItems="center">
      <Button icon={icon} label={isMenuOpen ? label : ""} />
      {isMenuOpen && (
        <>
          <Spacer direction="horizontal" gap="$2" />
        </>
      )}
    </Box>
  );
};

export const Menu = () => {
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const theme = useTheme();
  const animatedWidth = useRef(
    new Animated.Value(isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed),
  ).current;

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      if (movement === 'right') {
        toggleMenu(false);
      }
    },
    [toggleMenu],
  );

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, isMenuOpen, theme.sizes.menu.closed, theme.sizes.menu.open]);

  return (
    <SpatialNavigationRoot
      isActive={isMenuOpen}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      <SpatialNavigationView direction="vertical">
        <MenuSpacer />
        <MenuOverlay style={{ width: animatedWidth }} />
        <MenuContainer>
          <DefaultFocus>
            <MenuItem icon="home" shortLabel="A" label="Page A" isMenuOpen={isMenuOpen} />
          </DefaultFocus>
          <Spacer direction="vertical" gap="$4" />
          <MenuItem icon="youtube-play" shortLabel="B" label="Page B" isMenuOpen={isMenuOpen} />
          <Spacer direction="vertical" gap="$4" />
          <MenuItem icon="gamepad" shortLabel="C" label="Page C" isMenuOpen={isMenuOpen} />
        </MenuContainer>
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

const MenuContainer = styled.View(({ theme }) => ({
  position: 'absolute',
  left: 0,
  backgroundColor: 'transparent',
  width: theme.sizes.menu.open,
  height: windowDimensions.height,
  paddingLeft: theme.spacings.$4,
  justifyContent: 'center',
}));

const MenuOverlay = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  backgroundColor: theme.colors.background.mainHover,
  height: windowDimensions.height,
}));

const MenuSpacer = styled.View(({ theme }) => ({
  width: theme.sizes.menu.closed,
}));
