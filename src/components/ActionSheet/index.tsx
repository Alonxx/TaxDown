import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  isActionSheetOpen: boolean;
  setIsActionSheetOpen: (status: boolean) => void;
  children: React.ReactNode;
}

export const ActionSheet: React.FC<Props> = ({
  isActionSheetOpen,
  children,
  setIsActionSheetOpen,
}) => {
  return isActionSheetOpen ? (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isActionSheetOpen}
        onRequestClose={() => setIsActionSheetOpen(false)}>
        <ContainerModal>{children}</ContainerModal>
      </Modal>
    </Container>
  ) : null;
};

const Container = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

const ContainerModal = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  align-self: flex-start;
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 20px;
`;
