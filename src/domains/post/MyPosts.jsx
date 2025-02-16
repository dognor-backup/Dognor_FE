import { useEffect, useState } from "react";
import { Button } from "@/shared/components/buttons/Button";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import DeleteIcon from "../../assets/icons/primary/Trash.svg?react";
import { DnTable } from "@/shared/components/DnTable";
import { useSearchCommunityPosts } from "./hooks/useSearchCommunityPosts";
import useUserStore from "../auth/store/useUserStore";
import { PostTable } from "@/shared/components/Table/PostTable";

export default function MyPosts() {
  const { user } = useUserStore();
  const userSeq = user?.userData?.userSeq;
  const [communityPosts, setCommunityPosts] = useState([]);
  const { mutate, isLoading, error } =
    useSearchCommunityPosts(setCommunityPosts);

  useEffect(() => {
    if (userSeq) {
      mutate({
        page: 1,
        size: 15,
        sortByHitCnt: false,
        sortByLatest: true,
        myPostsOnly: true, // 나의 게시글만 조회
        categoryCd: null,
      });
    }
  }, [userSeq, mutate]);

  const subMenuList = [
    { path: "all", label: "전체" },
    { path: "showcase", label: "헌혈견 자랑" },
    { path: "free", label: "자유게시판" },
    { path: "dognor", label: "병원 헌혈 후기" },
    { path: "thanks", label: "고마워요" },
    { path: "needbloods", label: "혈액이 필요해요", color: "red" },
  ];

  if (!userSeq) return <div>로그인이 필요합니다.</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

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
          <CheckboxContainer>
            <Checkbox name={"selectAll"} label={"전체 선택"} size={"small"} />
          </CheckboxContainer>
          <IconBtn variant="primary" size="medium" state="outline">
            <DeleteIcon />
          </IconBtn>
        </DeleteActionContainer>
        <PostTable data={communityPosts} />
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

const CheckboxContainer = styled.div`
  padding: 12px 16px;
`;
