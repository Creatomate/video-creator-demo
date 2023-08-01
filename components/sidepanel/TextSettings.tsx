import React, { Fragment } from 'react';
import styled from 'styled-components';
import { ElementState } from '@creatomate/preview';
import { TextInput } from './TextInput';
import { PropertyCaption } from './PropertyCaption';
import { PropertySelect } from './PropertySelect';
import { AnimationSettings } from './AnimationSettings';

interface TextSettingsProps {
  activeElement: ElementState;
}

export const TextSettings: React.FC<TextSettingsProps> = (props) => {
  return (
    <Fragment>
      <PropertyCaption>Text</PropertyCaption>
      <TextInput activeElement={props.activeElement} />

      <PropertyCaption>Font</PropertyCaption>
      <PropertySelect
        activeElement={props.activeElement}
        propertyName="font_family"
        defaultValue="Aileron"
        options={[
          { caption: 'Aileron', value: 'Aileron' },
          { caption: 'Open Sans', value: 'Open Sans' },
          { caption: 'Dosis', value: 'Dosis' },
        ]}
      />

      <PropertyCaption>Color</PropertyCaption>
      <PropertySelect
        activeElement={props.activeElement}
        propertyName="fill_color"
        defaultValue="#000000"
        options={[
          { caption: 'Black', value: '#000000' },
          { caption: 'White', value: '#ffffff' },
        ]}
      />

      <PropertyCaption>Text Align</PropertyCaption>
      <PropertySelect
        activeElement={props.activeElement}
        propertyName="x_alignment"
        defaultValue="0%"
        options={[
          { caption: 'Left', value: '0%' },
          { caption: 'Center', value: '50%' },
          { caption: 'Right', value: '100%' },
        ]}
      />

      <AnimationSettings activeElement={props.activeElement} />

      <Information>
        To keep this demo to a minimum, only a few text properties are shown. See all capabilities in the{' '}
        <a href="https://creatomate.com/docs/api/introduction" target="_blank" rel="noreferrer">
          API documentation
        </a>{' '}
        and the Creatomate{' '}
        <a href="https://creatomate.com/docs/template-editor/text" target="_blank" rel="noreferrer">
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
