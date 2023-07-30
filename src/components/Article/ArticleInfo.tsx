import { getDate } from '../../utils/Common/getDate';
import { ArticleInfoContainer } from '../../styles/Community';

type ArticleInfoProps = {
  writer: string;
  createdAt: string;
};

export function ArticleInfo({ writer, createdAt }: ArticleInfoProps) {
  return (
    <div css={ArticleInfoContainer}>{`${writer} | ${getDate(
      new Date(createdAt)
    )}`}</div>
  );
}
