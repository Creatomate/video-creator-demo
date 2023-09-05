import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { videoCreator } from '../../stores/VideoCreatorStore';

export const CompositionNavigation: React.FC = observer(() => {
  const { preview } = videoCreator;
  if (!preview) {
    return null;
  }

  // Don't show the composition navigation when the main composition is active
  if (videoCreator.activeCompositionId == null) {
    return null;
  }

  const compositionTrail = [];

  // Start from the current active composition and scan up to the root composition, collecting all compositions in between
  let currentComposition = preview.findElement((element) => element.source.id === videoCreator.activeCompositionId);
  while (currentComposition) {
    compositionTrail.unshift(currentComposition);

    // Find the parent composition
    currentComposition = preview.findElement((element) => {
      return !!element.elements?.some((element) => element.source.id === currentComposition?.source.id);
    });
  }

  const breadcrumbs = [
    <Item
      key="main-item"
      onClick={() => {
        // This sets the active composition to the root
        preview.setActiveComposition(null);
      }}
    >
      Main Composition
    </Item>,
  ];

  // Create breadcrumbs so a user can navigate to a higher level composition
  for (const composition of compositionTrail) {
    breadcrumbs.push(<Separator key={`${composition.source.id}-separator`}>/</Separator>);
    breadcrumbs.push(
      <Item
        key={`${composition.source.id}-item`}
        onClick={() => {
          // Make the clicked composition active
          preview.setActiveComposition(composition.source.id);
        }}
      >
        {composition.source.name ?? 'Composition'}
      </Item>,
    );
  }

  return <Main>{breadcrumbs}</Main>;
});

const Main = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Item = styled.div`
  cursor: pointer;
`;

const Separator = styled.div`
  margin: 0 10px;
  opacity: 60%;
`;
