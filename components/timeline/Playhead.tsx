import React, { useCallback } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import throttle from 'lodash/throttle';
import { videoCreator } from '../../stores/VideoCreatorStore';
import { Draggable } from '../Draggable';

export const Playhead: React.FC = observer(() => {
  const time = videoCreator.time;
  const timelineScale = videoCreator.timelineScale;

  const scrubToTime = (time: number) => {
    runInAction(() => (videoCreator.isScrubbing = true));
    videoCreator.setTime(time).then(() => runInAction(() => (videoCreator.isScrubbing = false)));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledScrubToTime = useCallback(throttle(scrubToTime, 15), []);

  return (
    <Draggable
      onStart={(e, data) => {
        return { startX: data.x, startTime: time };
      }}
      onDrag={(e, data, context) => {
        const time = Math.max(context.startTime + (data.x - context.startX) / timelineScale, 0);
        throttledScrubToTime(time);
      }}
      onStop={() => {}}
    >
      {(ref, context) => (
        <Main ref={ref} style={{ left: time * timelineScale }}>
          <Head />
          <Line />
        </Main>
      )}
    </Draggable>
  );
});

const Main = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  height: 100%;
  transform: translateX(-50%);
`;

const Head = styled.div`
  width: 14px;
  height: 24px;
  background: #e74c3c;
  border-radius: 5px;
`;

const Line = styled.div`
  margin-left: 6px;
  width: 2px;
  height: 100%;
  background: #e74c3c;
`;
