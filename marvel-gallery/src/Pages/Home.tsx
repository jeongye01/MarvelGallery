import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Banner = styled.div`
  padding: 100px;
  margin-top: 30px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 500px;

  div:first-child {
    img {
    }
  }
  div:last-child {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    //position: relative;
    margin-bottom: 50px;
    height: 100%;
    //align-items: flex-start;
    span {
      font-weight: 600;
      font-size: 40px;
      margin-bottom: 60px;
    }
  }
`;

function Home() {
  const { data: comics, isLoading } = useQuery(['comics', '1'], getComics);
  //const { data: data2, isLoading: isLoading2 } = useQuery(['comics', '2'], getCharacters);
  //const { data: data3, isLoading: isLoading3 } = useQuery(['comics', '3'], getCreators);
  //const { data: data4, isLoading: isLoading4 } = useQuery(['comics', '4'], getEvents);

  //console.log('1', data1);
  console.log('comics', comics);
  //console.log('3', data3);
  //console.log('4', data4);

  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Banner>
            <div>
              <img src={`${comics[1].thumbnail.path}/portrait_incredible.${comics[1].thumbnail.extension}`} />
            </div>
            <div>
              <span>{comics[1].title}</span>
              <p>{comics[1].description.substr(0, 200)}.....자세히 보기</p>
            </div>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
/**
 * 
 * <ul>
            {data1?.map((d: any, index: number) => (
              <li key={index}>
                <img src={`${d.thumbnail.path}/portrait_xlarge.${d.thumbnail.extension}`} />
              </li>
            ))}
          </ul>
*/
