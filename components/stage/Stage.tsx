import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { videoCreator } from '../../stores/VideoCreatorStore';
import { CreateButton } from './CreateButton';

export const Stage: React.FC = observer(() => {
  return (
    <Main>
      <div
        ref={(element) => {
          if (element && element !== videoCreator.renderer?.element) {
            videoCreator.initializeVideoPlayer(element);
          }
        }}
        style={{ width: '100%', height: '100%' }}
      />

      <TopLeftButtons>
        <ActionButton
          onClick={async () => {
            await videoCreator.createElement({
              type: 'text',
              text: 'New text element',
            });
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
          </svg>
        </ActionButton>
        <ActionButton
          onClick={async () => {
            await videoCreator.createElement({
              type: 'image',
              source: 'https://creatomate-static.s3.amazonaws.com/video-creator-js/gradienta-ix_kUDzCczo-unsplash.jpg',
            });
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
          </svg>
        </ActionButton>
        <ActionButton
          onClick={async () => {
            await videoCreator.createElement({
              type: 'video',
              source: 'https://creatomate-static.s3.amazonaws.com/video-creator-js/pexels-2025634.mp4',
              loop: true,
            });
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M22 4V13.81C21.39 13.46 20.72 13.22 20 13.09V10H5.76L4 6.47V18H13.09C13.04 18.33 13 18.66 13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H5L7 8H10L8 4H10L12 8H15L13 4H15L17 8H20L18 4H22M17 22L22 19L17 16V22Z" />
          </svg>
        </ActionButton>
      </TopLeftButtons>

      <TopRightButtons>
        {videoCreator.isLoading && <LoadingText>Loading...</LoadingText>}
        <ActionButton
          disabled={!videoCreator.state?.undo}
          onClick={() => {
            videoCreator.renderer?.undo();
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />
          </svg>
        </ActionButton>
        <ActionButton
          disabled={!videoCreator.state?.redo}
          onClick={() => {
            videoCreator.renderer?.redo();
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" />
          </svg>
        </ActionButton>
        <CreateButton />
      </TopRightButtons>

      <BottomLeftButtons>
        <ActionButton
          onClick={() => {
            if (!videoCreator.isPlaying) {
              videoCreator.renderer?.play();
            } else {
              videoCreator.renderer?.pause();
            }
          }}
        >
          {!videoCreator.isPlaying ? (
            <svg width="24" height="24" fill="#fff">
              <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="#fff">
              <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          )}
        </ActionButton>
      </BottomLeftButtons>

      <BottomRightButtons>
        <ActionButton
          disabled={videoCreator.activeElementIds.length === 0}
          onClick={async () => {
            const activeElement = videoCreator.getActiveElement();
            if (activeElement) {
              await videoCreator.deleteElement(activeElement.source.id);
            }
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
          </svg>
        </ActionButton>
        <ActionButton
          disabled={videoCreator.activeElementIds.length === 0}
          onClick={async () => {
            const activeElement = videoCreator.getActiveElement();
            if (activeElement) {
              await videoCreator.rearrangeTracks(activeElement.track, 'up');
            }
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M12,18.54l0,2.53l-9,-7l1.62,-1.26l7.38,5.73m0,-2.54l-9,-7l9,-7l9,7l-9,7m0,-11.47l-5.74,4.47l5.74,4.47l5.74,-4.47l-5.74,-4.47Zm4,13.47l2,0l0,4l2,0l0,-4l2,0l-3,-3l-3,3Z" />
          </svg>
        </ActionButton>
        <ActionButton
          disabled={videoCreator.activeElementIds.length === 0}
          onClick={async () => {
            const activeElement = videoCreator.getActiveElement();
            if (activeElement) {
              await videoCreator.rearrangeTracks(activeElement.track, 'down');
            }
          }}
        >
          <svg width="24" height="24" fill="#fff">
            <path d="M12,18.54l0,2.53l-9,-7l1.62,-1.26l7.38,5.73m0,-2.54l-9,-7l9,-7l9,7l-9,7m0,-11.47l-5.74,4.47l5.74,4.47l5.74,-4.47l-5.74,-4.47Zm10,14.47l-2,-0l0,-4l-2,-0l0,4l-2,-0l3,3l3,-3Z" />
          </svg>
        </ActionButton>
      </BottomRightButtons>
    </Main>
  );
});

const Main = styled.div`
  position: relative;
  flex: 1;
`;

const TopLeftButtons = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  flex-direction: column;
`;

const TopRightButtons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
`;

const BottomLeftButtons = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  display: flex;
  flex-direction: column;
`;

const BottomRightButtons = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  flex-direction: column;
`;

const ActionButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  margin: 10px;
  padding: 10px;
  background: #292b2e;
  border-radius: 5px;
  cursor: pointer;

  svg {
    opacity: ${(props) => (props.disabled ? '40%' : 'auto')};
  }
`;

const LoadingText = styled.div`
  margin-right: 20px;
  color: #a3a5a5;
`;
