import styled from 'styled-components';

const StyledModal = styled.div` &&& {
  position: 'absolute';
  width: 80%;
  background: ${({ theme }) => theme.primaryLight};
  opacity: 0.9;
  }`;

export default StyledModal;
