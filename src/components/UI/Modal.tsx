import React, { FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface PropsModalContainer {
  visibleModal: boolean;
  onClick: () => void;
}

export interface PropsModal {
  children: React.ReactNode;
  visibleModal: boolean;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<PropsModal> = ({ children, visibleModal, setVisibleModal }) => {
  return (
    <ModalContainer
      visibleModal={visibleModal}
      onClick={() => setVisibleModal(false)}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<PropsModalContainer>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${(p) => (p.visibleModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const ModalContent = styled.div`
  position: relative;
  margin: 15px;
  padding: 15px;
  background: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  min-width: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 400px) {
    min-width: auto !important;
  }
`;

export default Modal;
