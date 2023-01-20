import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { videoCreator } from '../../stores/VideoCreatorStore';
import { Playhead } from './Playhead';
import { TimelineTrack } from './TimelineTrack';

export const Timeline: React.FC = observer(() => {
  const tracks = Array.from(videoCreator.tracks?.entries() ?? []);
  tracks.reverse();

  return (
    <Main>
      <Content>
        <Playhead />

        <Tracks>
          {tracks.map(([track, elements]) => (
            <TimelineTrack key={track} elements={elements} />
          ))}
        </Tracks>
      </Content>
    </Main>
  );
});

const Main = styled.div`
  padding: 30px 0 0 30px;
  height: 320px;
  background: #1a1d1f;
  border-radius: 8px;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  padding-top: 30px;
`;

const Tracks = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
