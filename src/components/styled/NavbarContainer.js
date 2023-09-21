import styled from 'styled-components';

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  background-color: var(--main-color);
  box-shadow: 0 4px 21px 0 #0000005f;
  padding: 0 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: flex;
  z-index: 99;
`;

export default NavbarContainer;
