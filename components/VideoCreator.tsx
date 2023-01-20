import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Timeline } from './timeline/Timeline';
import { SidePanel } from './sidepanel/SidePanel';
import { Stage } from './stage/Stage';

export const VideoCreator: React.FC = observer(() => {
  return (
    <Main>
      <MainView>
        <Stage />
        <SidePanel />
      </MainView>

      <Timeline />
    </Main>
  );
});

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`;

const MainView = styled.div`
  flex: 1;
  display: flex;
`;
