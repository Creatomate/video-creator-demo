import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { ElementState } from '../../renderer/ElementState';
import { videoCreator } from '../../stores/VideoCreatorStore';
import { Draggable } from '../Draggable';
import { ResizeHandle } from './ResizeHandle';

interface TimelineElementProps {
  element: ElementState;
}

export const TimelineElement: React.FC<TimelineElementProps> = observer((props) => {
  const active = videoCreator.activeElementIds.includes(props.element.source.id);
  const timelineScale = videoCreator.timelineScale;

  const [placement, setPlacement] = useState({ time: props.element.time, duration: props.element.duration });
  useEffect(() => {
    setPlacement({ time: props.element.time, duration: props.element.duration });
  }, [props.element.time, props.element.duration]);

  const applyPlacement = async () => {
    await videoCreator.renderer?.applyModifications({
      [`${props.element.source.id}.time`]: placement.time,
      [`${props.element.source.id}.duration`]: placement.duration,
    });
  };

  return (
    <Fragment>
      <Draggable
        onStart={(e, data) => {
          return { startX: data.x };
        }}
        onDrag={(e, data, context) => {
          const timeOffset = (data.x - context.startX) / timelineScale;

          setPlacement({ time: Math.max(props.element.time + timeOffset, 0), duration: props.element.duration });
        }}
        onStop={() => {
          applyPlacement();
        }}
      >
        {(ref) => (
          <Bar
            ref={ref}
            active={active}
            style={{
              left: placement.time * timelineScale,
              width: (placement.duration - props.element.exit) * timelineScale,
            }}
            onClick={() => {
              videoCreator.setActiveElements(props.element.source.id);
            }}
          >
            {props.element.source.name ??
              props.element.source.type[0].toUpperCase() + props.element.source.type.slice(1)}
          </Bar>
        )}
      </Draggable>
      <ResizeHandle
        element={props.element}
        side='start'
        time={props.element.time}
        onChange={(time, duration) => setPlacement({ time, duration })}
        onComplete={applyPlacement}
      />
      <ResizeHandle
        element={props.element}
        side='end'
        time={props.element.time + props.element.duration}
        onChange={(time, duration) => setPlacement({ time, duration })}
        onComplete={applyPlacement}
      />
    </Fragment>
  );
});

const Bar = styled.div<{ active: boolean }>`
  position: absolute;
  height: 35px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.active ? '#2a85ff' : '#3f4043')};
  border-radius: 8px;
  overflow: hidden;
`;
