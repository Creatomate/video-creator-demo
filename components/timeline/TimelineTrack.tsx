import React from 'react';
import styled from 'styled-components';
import { ElementState } from '../../renderer/ElementState';
import { TimelineElement } from './TimelineElement';

interface TimelineTrackProps {
  elements: ElementState[];
}

export const TimelineTrack: React.FC<TimelineTrackProps> = (props) => {
  return (
    <Main>
      {props.elements.map((element) => (
        <TimelineElement key={element.source.id} element={element} />
      ))}
    </Main>
  );
};

const Main = styled.div`
  position: relative;
  margin: 5px 0;
  height: 35px;
`;
