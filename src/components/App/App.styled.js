import styled from 'styled-components';

export const Containers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 750px;
  padding: 50px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow( 10px 10px 3px rgba(0, 0, 0, 0.2))
`;

export const Title = styled.h1`
  font-size: 40px;
  font-style: italic;

  color: linear-gradient(133deg, rgb(2, 0, 36) 0%, rgb(121, 9, 111) 0%, rgb(0, 215, 255) 100%);
`;

export const Images = styled.img`
  width: 550px;
  height: auto;
`;

export const Error = styled.h2`
  text-align: center;
  font-size: 40px;
  font-style: italic;
`;
