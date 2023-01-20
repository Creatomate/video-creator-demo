import React, { ReactNode, RefObject, useRef, useState } from 'react';
import { DraggableCore, DraggableCoreProps, DraggableData, DraggableEvent } from 'react-draggable';

export type DraggableEventHandler = (e: DraggableEvent, data: DraggableData, context: any) => any | false;

export interface DraggableProps
  extends Omit<Partial<DraggableCoreProps>, 'onStart' | 'onDrag' | 'onStop' | 'children'> {
  onStart: DraggableEventHandler;
  onDrag: DraggableEventHandler;
  onStop: DraggableEventHandler;
  children: (ref: RefObject<any>, context: any) => ReactNode;
}

export const Draggable: React.FC<DraggableProps> = (props) => {
  const [context, setContext] = useState();

  const nodeRef = useRef<HTMLElement>(null);

  return (
    <DraggableCore
      {...props}
      nodeRef={nodeRef}
      onStart={(e, data) => {
        const newContext = props.onStart(e, data, undefined);
        if (!newContext) {
          return newContext;
        }
        setContext(newContext);
      }}
      onDrag={(e, data) => {
        const newContext = props.onDrag(e, data, context);
        if (!newContext) {
          return newContext;
        }
        setContext(newContext);
      }}
      onStop={(e, data) => {
        setContext(undefined);
        props.onStop(e, data, context);
      }}
    >
      {props.children(nodeRef, context)}
    </DraggableCore>
  );
};
