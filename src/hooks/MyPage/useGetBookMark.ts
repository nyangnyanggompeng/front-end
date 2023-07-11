// import getBookMark from 'src/api/getBookMark';
// import { useQuery } from 'react-query';
import { BookMarkData } from '../../types/MyPage/BookMarkTypes';

export default function useGetBookMark(currentPage: number) {
  // TODO : 이후에 api 작업시에 실제 데이터로 대체할 것
  //   const { isLoading, isError, data, error } = useQuery({
  //     queryKey: ['bookmarks', currentPage],
  //     queryFn: () => getBookMark(currentPage),
  //   });
  const isLoading = false;
  const isError = false;
  const error = null;
  const bookmarkData: BookMarkData = {
    bookmark: [
      {
        contentId: 1,
        content:
          '다음은 자기소개서야:KT의 SW 개발자로서 중요한 역량 첫 번째는 IT 기술의 발전에 따라 배우고자 하는 자세입니다. 학부생 때부터 다양한 IT 기술을 배우는 자세가 중요하다고 생각하였습니다. 이 때문에 전공 수업뿐만이 아니라 스터디 활동을 통하여 네트워크, 블록체인, IoT 등의 다양한 IT 지식을 습득하였습니다. 결국 폭넓은 이해를 도울 수 있었고 해당 산업에 대한 이해를 도울 수 있었습니다. 다른 어떠한 분야보다도 빠르게 변화하는 IT분야에서 몇 년 전 5G는 먼 미래의 이야기였지만, 현재는 다음 단계를 준비하고 있는 것처럼 지속해서 변화하는 기술을 배우고 활용하는 자세가 중요시될 것입니다. 입사 후에도 이러한 자세로 지속해서 새로운 기술을 빠르게 습득하고 활용하여 KT의 기술 변화를 주도하도록 하겠습니다. 두 번째는 원활한 팀 프로젝트를 위한 소통 능력입니다. 질소산화물 조작 방지 시스템을 개발하는 프로젝트에서 여러 블록체인 모델 중 하나만 선택하여 사용하려고 하였으나, 팀원의 아이디어로 두 가지 모델을 합친 형태로 진행하여 각각의 장점을 더욱 살려 효율적으로 만들어 낼 수 있었습니다. 팀원 간 효과적인 의사소통으로 얻어낸 결과물로 의사소통의 중요성을 체험할 수 있었습니다. 또, 다른 경험으로는 와인 판매 사이트를 개설하는 프로젝트에서 백엔드로 API를 만들 때 이것을 사용하게 될 프론트엔드와의 소통으로 API 문서를 만들어 이해관계를 높인 결과를 낸 적이 있습니다. 이처럼 하나의 서비스나 SW를 개발하려면 개인의 실력이 뛰어나다고 해도 혼자서 해낼 수 없기 때문에 의사소통 능력은 필수적인 요소라고 생각합니다. 이걸 읽고 인성면접 질문 3개 해 줘',
        roomId: 1,
        roomName: '대화목록1',
      },
      {
        contentId: 2,
        content:
          '1. 자기소개서에서 언급한 IT 기술의 발전과 관련하여 현재 학습 중이거나 관심 있는 기술은 무엇인가요? 이 기술을 어떻게 학습하고 활용하려고 계획하고 있나요?',
        roomId: 2,
        roomName: '대화목록2',
      },
    ],
    numberOfBookmark: 2,
    totalPages: 1,
  };
  return { isLoading, isError, error, bookmarkData };
}
