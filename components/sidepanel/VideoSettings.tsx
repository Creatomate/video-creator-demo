import React, { Fragment } from 'react';
import styled from 'styled-components';
import { ElementState } from '@creatomate/preview';
import { VideoPreset } from './VideoPreset';
import { PropertyCaption } from './PropertyCaption';
import { PropertySelect } from './PropertySelect';
import { AnimationSettings } from './AnimationSettings';

interface VideoSettingsProps {
  activeElement: ElementState;
}

export const VideoSettings: React.FC<VideoSettingsProps> = (props) => {
  return (
    <Fragment>
      <VideoPreset
        activeElement={props.activeElement}
        url="https://creatomate-static.s3.amazonaws.com/video-creator-js/pexels-2025634.mp4"
      />

      <VideoPreset
        activeElement={props.activeElement}
        url="https://creatomate-static.s3.amazonaws.com/video-creator-js/pexels-3059865.mp4"
      />

      <VideoPreset
        activeElement={props.activeElement}
        url="https://creatomate-static.s3.amazonaws.com/video-creator-js/pexels-4365140.mp4"
      />

      <PropertyCaption>Fit</PropertyCaption>
      <PropertySelect
        activeElement={props.activeElement}
        propertyName="fit"
        defaultValue="cover"
        options={[
          { caption: 'Cover', value: 'cover' },
          { caption: 'Contain', value: 'contain' },
          { caption: 'Fill', value: 'fill' },
        ]}
      />

      <AnimationSettings activeElement={props.activeElement} />

      <Information>
        To keep this demo to a minimum, only a few video properties are shown. See all capabilities in the{' '}
        <a href="https://creatomate.com/docs/api/introduction" target="_blank" rel="noreferrer">
          API documentation
        </a>{' '}
        and the Creatomate{' '}
        <a href="https://creatomate.com/docs/template-editor/image" target="_blank" rel="noreferrer">
          template editor
        </a>
        .
      </Information>
    </Fragment>
  );
};

const Information = styled.div`
  margin-top: 20px;
  color: #a3a5a5;

  a {
    color: #a3a5a5;
  }
`;
