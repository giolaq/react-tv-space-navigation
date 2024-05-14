import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { DefaultFocus } from 'react-tv-space-navigation';
import { RootStackParamList } from '../../App';
import { Page } from '../components/Page';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';
import { ProgramListWithTitle } from '../modules/program/view/ProgramListWithTitle';
import { Button } from '../design-system/components/Button';
import { useState } from 'react';
import { SubtitlesModal } from '../components/modals/SubtitlesModal';
import { MenuButton } from '../components/Menu/MenuButton';
import { Play } from 'lucide-react-native';
import { Icon } from '../design-system/helpers/Icons';

export const ProgramDetail = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'ProgramDetail'>;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subtitles, setSubtitles] = useState('No');
  const { programInfo } = route.params;

  return (
    <Page>
      <Box padding="$5">
        <Container paddingHorizontal="$15" paddingTop="$2" direction="horizontal">
          <JumbotronContainer>
            <Jumbotron source={programInfo.image} />
            <Overlay>
              <DefaultFocus>
                <ContainerCommands padding="$15" flex={1}>
                  <Typography variant="title" fontWeight="strong">
                    {programInfo.title}
                  </Typography>
                  <Spacer gap="$15" />
                  <Description variant="body" fontWeight="strong">
                    {programInfo.description}
                  </Description>
                  <Spacer gap="$8" />
                  {/* eslint-disable-next-line no-console */}
                  <MenuButton icon={'Play'} onSelect={() => {}} label={'Play'} isMenuOpen={true} />
                  {/* <Button label="Play" onSelect={() => console.log('Playing!')} /> */}
                  <Spacer gap="$8" />
                  {/* eslint-disable-next-line no-console */}
                  <Button label="Rent" onSelect={() => console.log('More info!')} />
                  <Spacer gap="$8" />
                  <Button label={'Audio options'} onSelect={() => setIsModalVisible(true)} />
                </ContainerCommands>
              </DefaultFocus>
            </Overlay>
          </JumbotronContainer>
        </Container>
        <Spacer gap="$5" />
        {/* <ProgramListWithTitle title="You may also like..."></ProgramListWithTitle> */}
      </Box>
      <SubtitlesModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setSubtitles={setSubtitles}
      />
    </Page>
  );
};

const Container = styled(Box)({
  height: '100%',
  width: '100%',
});

const ContainerCommands = styled(Box)({
  height: '100%',
  width: '100%',
  backgroundColor: '#00000080',
  alignContent: 'center',
});

const JumbotronContainer = styled.View({
  width: '100%',
  height: '100%',
  borderRadius: 20,
});

const Jumbotron = styled.Image({
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
});

const Description = styled(Typography)({
  textAlign: 'justify',
});

const Overlay = styled.View({
  position: 'absolute',
  bottom: 22,
  left: 12,
});
