import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommunityTable } from "./CommunityTable";
import { useGetPostList } from "@/domains/post/hooks/useGetPostList";
import { Button } from "@/shared/components/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { viewCount } from "@/domains/post/api/post";

export function CommunityList() {
  // const [selectedPost, setSelectedPost] = useState(null);
  //선택되서 들어온 카테고리
  const { currentCategory, setCurrentCategory } = useOutletContext();

  //탭을 눌러 변경하는 카테고리
  const [currentTitle, setCurrentTitle] = useState(currentCategory);
  const location = useLocation();
  const pathLink = location.pathname.split("/");
  let currentPath = pathLink[pathLink.length - 1];
  const navigate = useNavigate();

  //클릭한 카테고리가 변경될때마다 재요청
  const [getCategoryList, setCategoryList] = useState({
    searchParam: {
      page: 1,
      size: 15,
      sortByHitCnt: false,
      sortByLatest: false,
      myPostsOnly: false,
      categoryCd: 1,
    },
  });
  const { data: categoryList, isLoading, isError } = useGetPostList(getCategoryList);
  console.log("공지", categoryList);

  const communityTitles = [
    { path: "all", title: "모든 이야기 보기", label: "전체", subtitle: "", categoryCd: 0 },
    {
      path: "free",
      title: "자유게시판",
      label: "자유게시판",
      subtitle: "자유로운 주제로 소통할 수 있어요",
      categoryCd: 2,
    },
    {
      path: "review",
      title: "병원 헌혈 후기",
      label: "병원 헌혈 후기",
      subtitle: "헌혈견 체험과 병원 경험에 대한 이야기 공간입니다",
      categoryCd: 3,
    },
    {
      path: "question",
      title: "질문있어요!",
      label: "질문있어요",
      subtitle: "다양한 궁금함을 풀어봐요. 그리고 여러 정보들을 공유해요",
      categoryCd: 4,
    },
    {
      path: "thanks",
      title: "고마워요",
      label: "고마워요",
      subtitle: "감사함을 전하고 따뜻한 이야기를 알려주세요",
      categoryCd: 5,
    },
    {
      path: "needbloods",
      title: "혈액이 필요해요",
      label: "혈액이 필요해요",
      subtitle: "도움의 힘이 필요해요! D-Day가 가까워지고 있어요!\n 보호자님의 도움이 필요합니다!",
      categoryCd: 6,
    },
  ];

  const getCurrentPathTitle = () => {
    let selected = communityTitles.findIndex((communityTitle) => communityTitle.path.includes(currentPath));
    setCurrentTitle(selected);
    setCurrentCategory(communityTitles[selected].categoryCd);
  };

  useEffect(() => {
    //경로마다 해당하는 제목과 글 보여주기
    getCurrentPathTitle();
  }, [location, getCurrentPathTitle]);

  useEffect(() => {
    setCategoryList((prev) => ({
      ...prev,
      searchParam: {
        ...prev.searchParam,
        categoryCd: communityTitles[currentTitle].categoryCd,
      },
    }));
  }, [location, currentTitle]);

  const currentViewMutation = useMutation({
    mutationFn: viewCount,
  });

  //
  return (
    <>
      <PageWrapper>
        <TitleText currentPath={currentPath}>{communityTitles[currentTitle]?.title}</TitleText>
        {communityTitles[currentTitle]?.subtitle?.split("\n").map((text, idx) => (
          <SubText key={idx} currentPath={currentPath}>
            {text}
            <br />
          </SubText>
        ))}

        <MarginTop currentPath={currentPath}>
          <SubMenuBar subMenuList={communityTitles} />
          <BtnsContainer>
            <Button variant="secondary" size="small" onClick={() => navigate("/postnew")}>
              글쓰기
            </Button>
            <Button
              variant="normal"
              size="small"
              state="outline"
              onClick={() =>
                setCategoryList((prev) => ({
                  ...prev,
                  searchParam: { ...prev.searchParam, sortByHitCnt: false, sortByLatest: true },
                }))
              }
            >
              최신순
            </Button>
            <Button
              variant="normal"
              size="small"
              state="outline"
              onClick={() =>
                setCategoryList((prev) => ({
                  ...prev,
                  searchParam: { ...prev.searchParam, sortByHitCnt: true, sortByLatest: false },
                }))
              }
            >
              조회순
            </Button>
            <Button variant="normal" size="small" state="outline">
              내 작성글
            </Button>
          </BtnsContainer>
          <CommunityTable
            currentPath={currentPath}
            postsData={categoryList?.data?.data}
            currentViewMutation={currentViewMutation}
            onClick={() =>
              setCategoryList((prev) => ({
                ...prev,
                searchParam: { ...prev.searchParam, myPostsOnly: true, sortByLatest: true },
              }))
            }
          />
        </MarginTop>
      </PageWrapper>
    </>
  );
}
const SubText = styled.span(
  ({ currentPath }) => `
  line-height: 30px;
  font-size: 18px;
  display: inline-block;
`
);

const TitleText = styled.h2(
  ({ theme, currentPath }) => `
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  line-height: 42px;
  padding-bottom: 16px;
  color: ${currentPath === "needbloods" ? theme.colors.point_orange : theme.colors.neutrals_00}
`
);

const MarginTop = styled.div(
  ({ currentPath }) => `
  margin-top:${currentPath === "all" ? "0px" : "48px"};
  width: 100%;
  text-align: center
`
);
const BtnsContainer = styled.div`
  text-align: left;
  display: flex;
  gap: 4px;
  margin-top: 48px;
  margin-bottom: 8px;
`;
