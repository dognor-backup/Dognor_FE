import { Button } from "@/shared/components/buttons/Button";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";

export default function MyPosts() {
  const subMenuList = [
    { path: "all", label: "전체" },
    { path: "showcase", label: "헌혈견 자랑" },
    { path: "free", label: "자유게시판" },
    { path: "dognor", label: "병원 헌혈 후기" },
    { path: "thanks", label: "고마워요" },
    { path: "needbloods", label: "헐액이 필요해요", color: "red" },
  ];
  return (
    <MyPostsLayout>
      <MyPostsHeaderContainer>
        <MyPostsTitleText>나의 게시글</MyPostsTitleText>
        <SubMenuBar subMenuList={subMenuList} useQueryParams={true} />
      </MyPostsHeaderContainer>
      <TableContainer>
        <FilterBtnContainer>
          <Button variant="normal" size="small" state="outline">
            최신순
          </Button>
          <Button variant="normal" size="small" state="outline">
            조회순
          </Button>
        </FilterBtnContainer>
        <DeleteActionContainer>

        </DeleteActionContainer>
      </TableContainer>
    </MyPostsLayout>
  );
}

const MyPostsLayout = styled.div`
  max-width: 1008px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const MyPostsTitleText = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const MyPostsHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 4px;
`;

const DeleteActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
