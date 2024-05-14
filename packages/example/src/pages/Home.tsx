import styled from '@emotion/native';
import { DefaultFocus, SpatialNavigationScrollView } from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import '../components/configureRemoteControl';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';
import {
  ProgramListWithTitle,
  ProgramListTopWithTitle,
  ProgramListWithTitleAndVariableSizes,
} from '../modules/program/view/ProgramListWithTitle';
import { BottomArrow, TopArrow } from '../design-system/components/Arrows';
import { StyleSheet, Image } from 'react-native';

export const Home = () => {
  return (
    <Page>
      <TitleContainer>
        {/* <Title variant="title">Hello TV</Title> */}
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 120, height: 80, alignSelf: 'center' }}
        ></Image>
      </TitleContainer>
      <DefaultFocus>
        <SpatialNavigationScrollView
          offsetFromStart={140}
          ascendingArrow={<BottomArrow />}
          ascendingArrowContainerStyle={styles.bottomArrowContainer}
          descendingArrow={<TopArrow />}
          descendingArrowContainerStyle={styles.topArrowContainer}
        >
          <Box padding="$10">
            <ProgramListTopWithTitle title="Top" />
            <Spacer gap="$12" />
            <ProgramListWithTitle title="Continue Watching" />
            <Spacer gap="$12" />
            <ProgramListWithTitle title="Most watched in your area" />
            <Spacer gap="$12" />
          </Box>
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </Page>
  );
};

const TitleContainer = styled.View(({ theme }) => ({ padding: theme.spacings.$4 }));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.main,
}));

const styles = StyleSheet.create({
  topArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    left: 0,
  },
  bottomArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -15,
    left: 0,
  },
});
