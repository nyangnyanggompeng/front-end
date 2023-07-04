import { useState, useEffect } from 'react';
import { postType } from '../../types/Community/communityTypes';

type searchMode = 'TITLE' | 'CONTENT' | 'WRITER';

export function useSearchbar() {
  const [searchMode, setSearchMode] = useState<searchMode>('TITLE');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<postType[]>([]);

  useEffect(() => {
    if (searchKeyword === '') {
      setSearchResult([]);
      return;
    }
    // TODO : 키워드와 모드를 이용하여 검색 결과를 받아오는 함수 구현
    // const searchResult = searchPosts(searchMode, searchKeyword);
    console.log('검색 api 호출 : ', searchMode, searchKeyword);
    setSearchResult(searchResult);
  }, [searchKeyword, searchMode]);

  return {
    setSearchMode,
    setSearchKeyword,
    searchResult,
  };
}
