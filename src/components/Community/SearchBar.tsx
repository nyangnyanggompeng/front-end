import { useSearchbar } from '../../hooks/Community/useSearchBar';

type SearchBarProps = {
  totalPost: number;
};

export function SearchBar({ totalPost }: SearchBarProps) {
  const { setSearchMode, setSearchKeyword } = useSearchbar();

  // TODO : 동작 확인 필요
  // TODO : api 연동 필요
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchMode = e.currentTarget['search-mode'].value;
    const searchKeyword = e.currentTarget['search-keyword'].value;
    setSearchMode(searchMode);
    setSearchKeyword(searchKeyword);
  }

  return (
    <div>
      <div>전체 {totalPost}건</div>
      <form onSubmit={submitHandler}>
        <select name='search-mode' id='search-mode'>
          <option value='TITLE'>제목</option>
          <option value='CONTENT'>내용</option>
          <option value='WRITER'>작성자</option>
        </select>
        <input type='text' name='search-keyword' id='search-keyword' />
        <button type='submit'>검색</button>
      </form>
    </div>
  );
}
