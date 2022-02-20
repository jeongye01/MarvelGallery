import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getComics, getSeries, getCharacters, getCreators, getEvents } from '../Api';
function Home() {
  const { data: data1, isLoading: isLoading1 } = useQuery(['comics', '1'], getComics);
  const { data: data2, isLoading: isLoading2 } = useQuery(['comics', '2'], getCharacters);
  const { data: data3, isLoading: isLoading3 } = useQuery(['comics', '3'], getCreators);
  const { data: data4, isLoading: isLoading4 } = useQuery(['comics', '4'], getEvents);

  //console.log('1', data1);
  console.log('2', data2);
  //console.log('3', data3);
  //console.log('4', data4);

  return (
    <div>
      {isLoading2 ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {data1?.map((d: any, index: number) => (
            <li key={index}>
              <img src={`${d.thumbnail.path}/portrait_xlarge.${d.thumbnail.extension}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
