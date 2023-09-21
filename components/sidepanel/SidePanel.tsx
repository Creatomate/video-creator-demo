import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { videoCreator } from '../../stores/VideoCreatorStore';
import { TextSettings } from './TextSettings';
import { ImageSettings } from './ImageSettings';
import { VideoSettings } from './VideoSettings';

export const SidePanel: React.FC = observer(() => {
  // This effect watches for changes to the state object.
  // Without it, the settings panel wouldn't update when a property on an element changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {}, [videoCreator.state]);

  const activeElement = videoCreator.getActiveElement();

  if (activeElement) {
    if (activeElement.source.type === 'text') {
      return (
        <Main>
          <ScrollableArea>
            <TextSettings activeElement={activeElement} />
          </ScrollableArea>
        </Main>
      );
    } else if (activeElement.source.type === 'image') {
      return (
        <Main>
          <ScrollableArea>
            <ImageSettings activeElement={activeElement} />
          </ScrollableArea>
        </Main>
      );
    } else if (activeElement.source.type === 'video') {
      return (
        <Main>
          <ScrollableArea>
            <VideoSettings activeElement={activeElement} />
          </ScrollableArea>
        </Main>
      );
    }
  }

  return (
    <Main>
      <WelcomeScreen>
        <div>
          Welcome to this video creator demo. This open source project shows how to integrate with the Creatomate
          Preview SDK to build your own video-powered applications.
          <br />
          <br />
          To help you get started with the SDK, we have kept the code and UX as simple as possible. We encourage you to
          adapt and expand it to meet your own needs.
          <br />
          <br />
          Feel free to contact us with any questions at support@creatomate.com
        </div>
        <div>
          <LinkButton
            onClick={() => {
              window.open('https://github.com/creatomate', '_blank');
            }}
          >
            <svg width="24" height="24" fill="#fff" style={{ marginRight: 10 }}>
              <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            View source on GitHub
          </LinkButton>
          <LinkButton
            onClick={() => {
              window.open('https://creatomate.com/docs/json/introduction', '_blank');
            }}
          >
            API documentation
          </LinkButton>
        </div>
      </WelcomeScreen>
    </Main>
  );
});

const Main = styled.div`
  position: relative;
  margin: 15px 0;
  padding: 15px 30px;
  width: 350px;
  background: #1a1d1f;
  border-radius: 8px;
  overflow-y: auto;
`;

const ScrollableArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
`;

const WelcomeScreen = styled(ScrollableArea)`
  padding: 30px;
  height: 100%;
  justify-content: space-between;
`;

const LinkButton = styled.div`
  margin: 15px 0;
  padding: 10px 0;
  background: #292b2e;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
