import styled from 'styled-components';
import React from 'react';
const Container = styled.div`
  font-family: 'Dekko', cursive;
  margin: 30px auto;
  margin-top: 130px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7c449;
  border: solid black 5px;
  width: 1060px;
  height: 350px;

  div:first-child {
    img {
      box-shadow: 0 1px 15px -7.5px #000000;
    }
    margin-right: 50px;
  }
  div:last-child {
    display: flex;
    flex-direction: column;
    span {
      font-weight: 600;
      font-size: 40px;
      margin-bottom: 60px;
    }
    div {
      padding: 20px;
      width: 630px;
      height: 155px;
      background: rgba(255, 255, 255, 0.5);
      font-size: 20px;
    }
  }
`;
interface Iprops {
  data: {
    id: number;
    thumbnail: { path: string; extension: string };
    title: string;
    description: string;
  };
}

function Banner({ data }: Iprops) {
  return (
    <Container>
      <div>
        <img src={`${data.thumbnail.path}/portrait_incredible.${data.thumbnail.extension}`} />
      </div>
      <div>
        <span>{data.title}</span>
        <div>
          <p>{data.description.length < 400 ? data.description : `${data.description.substr(0, 400)}.....`}</p>
        </div>
      </div>
    </Container>
  );
}

export default React.memo(Banner);
