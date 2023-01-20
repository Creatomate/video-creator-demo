import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { ElementState } from '../../renderer/ElementState';
import { videoCreator } from '../../stores/VideoCreatorStore';
import { Draggable } from '../Draggable';

interface ResizeHandleProps {
  element: ElementState;
  side: 'start' | 'end';
  time: number;
  onChange: (time: number, duration: number) => void;
  onComplete: () => void;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = observer((props) => {
  const timelineScale = videoCreator.timelineScale;

  return (
    <Draggable
      onStart={(e, data) => {
        return { startX: data.x };
      }}
      onDrag={(e, data, context) => {
        let timeOffset = (data.x - context.startX) / timelineScale;

        if (props.side === 'start') {
          let time = props.element.time + timeOffset;
          let duration = props.element.duration - timeOffset;
          if (time < 0) {
            duration += time;
            time = 0;
          }

          props.onChange(time, duration);
        } else {
          const duration = Math.max(props.element.duration + timeOffset, 0.5);

          props.onChange(props.element.time, duration);
        }
      }}
      onStop={() => {
        props.onComplete();
      }}
    >
      {(ref) => (
        <Main
          ref={ref}
          style={{
            left: props.time * timelineScale - (props.side === 'end' ? 10 : 0),
          }}
        ></Main>
      )}
    </Draggable>
  );
});

const Main = styled.div`
  position: absolute;
  height: 100%;
  width: 10px;
  cursor: ew-resize;
`;
