import { useLocation } from 'react-router-dom';

const InterviewSearch = () => {
  const location = useLocation();
  console.log(location);

  return (
    <main>
      <div className='inner'>
        <h2>검색 결과</h2>
      </div>
    </main>
  );
};

export default InterviewSearch;
