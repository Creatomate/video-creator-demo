import React, { useState } from 'react';
import styled from 'styled-components';
import { videoCreator } from '../../stores/VideoCreatorStore';

export const CreateButton: React.FC = () => {
  const [isRendering, setIsRendering] = useState(false);
  const [render, setRender] = useState<any>();

  if (isRendering) {
    return <Main style={{ background: '#e67e22' }}>Rendering...</Main>;
  }

  if (render) {
    return (
      <Main
        style={{ background: '#2ecc71' }}
        onClick={() => {
          window.open(render.url, '_blank');
          setRender(undefined);
        }}
      >
        Download
      </Main>
    );
  }

  return (
    <Main
      style={{ background: '#2a85ff' }}
      onClick={async () => {
        setIsRendering(true);

        try {
          const render = await videoCreator.finishVideo();
          if (render.status === 'succeeded') {
            setRender(render);
          } else {
            window.alert(`Rendering failed: ${render.errorMessage}`);
          }
        } catch (error) {
          window.alert(error);
        } finally {
          setIsRendering(false);
        }
      }}
    >
      Create Video
    </Main>
  );
};

const Main = styled.div`
  width: 130px;
  margin: 10px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2a85ff;
  border-radius: 5px;
  cursor: pointer;
`;
