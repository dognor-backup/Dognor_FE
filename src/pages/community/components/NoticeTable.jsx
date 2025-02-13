import { IconBtn } from "@/shared/components/buttons/IconBtn";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import { useEffect, useState } from "react";
import TrashIcon from "/src/assets/icons/secondary/trash.svg?react";
import { OnlyCheckBox } from "@/shared/components/checkbox/CheckboxLabel";
import { useNavigate } from "react-router-dom";
import { TableContainer, TableHeader, TableHeadText, TableBodyText, BdBtm, TextMg, Flex } from "./TableStyle";
import { useGetNoticeList } from "@/domains/post/hooks/useGetPostList";
import { useRemovePosts } from "../hooks/useRemovePosts";
import { useViewCount } from "../hooks/useViewCount";
import { PageTop } from "@/shared/components/layout/PageTopTitle";
import useUserStore from "@/domains/auth/store/useUserStore";
import styled from "@emotion/styled";
import { Button } from "@/shared/components/buttons/Button";
import usePostStore from "@/domains/post/store/usePostStore";

export function Notice({ currentPath, pathName }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [changedPosts, setChangedPosts] = useState([]);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const viewCountMutation = useViewCount();
  const { handleRemovePost } = useRemovePosts();
  const { user } = useUserStore();
  const userId = user?.userData?.userId || null;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserPost, setUserPost] = useState();

  useEffect(() => {
    setIsAdmin(userId === "admin");
  }, []);

  const [getCategoryList, setCategoryList] = useState({
    searchParam: {
      page: 1,
      size: 5,
      sortByHitCnt: false,
      sortByLatest: false,
      categoryCd: 1,
    },
  });
  useGetNoticeList(getCategoryList);
  const { noticeData } = usePostStore();

  useEffect(() => {
    const formattedPosts = noticeData?.map((post) => ({
      ...post,
      firstSaveDt: post.firstSaveDt.split("T"),
    }));
    setChangedPosts(formattedPosts);
    const filterUserPost = noticeData?.filter((post) => post.firstSaveUser == userId);
    setUserPost(filterUserPost);
  }, [getCategoryList]);

  const handleCheckAllBox = () => {
    for (const data of isUserPost) {
      setCheckedItems((prev) => ({
        ...prev,
        [data.postSeq]: !prev[data.postSeq],
      }));
    }
  };

  const toggleCheckbox = (postSeq) => {
    setCheckedItems((prev) => ({ ...prev, [postSeq]: !prev[postSeq] }));
  };

  const handleMoveToPostDetail = (item) => {
    navigate(`/postdetail/${item.postSeq}`, { state: { item } });
  };
  const handleSendCheckedPost = () => {
    handleRemovePost(checkedItems);
  };
  const handleListUpPosts = (e) => {
    const targetBtn = e.target.name;
    console.log(targetBtn);
    setCategoryList((prev) => ({
      ...prev,
      searchParam: { ...prev.searchParam, sortByHitCnt: false, sortByLatest: false },
    }));

    switch (targetBtn) {
      case "최신순":
        setCategoryList((prev) => ({
          ...prev,
          searchParam: { ...prev.searchParam, sortByLatest: true },
        }));
        console.log("최신", getCategoryList);
        break;
      case "조회순":
        setCategoryList((prev) => ({
          ...prev,
          searchParam: { ...prev.searchParam, sortByHitCnt: true },
        }));
        break;

      default:
        break;
    }
  };
  return (
    <>
      <PageTop noNav={pathName === "community" ? false : true}>
        <h2>공지사항</h2>
      </PageTop>
      <BtnsContainer>
        <Button variant="secondary" size="small" onClick={() => navigate("/postnew")}>
          글쓰기
        </Button>
        <Button variant="normal" size="small" state="outline" name="최신순" onClick={handleListUpPosts}>
          최신순
        </Button>
        <Button variant="normal" size="small" state="outline" name="조회순" onClick={handleListUpPosts}>
          조회순
        </Button>
      </BtnsContainer>
      <Flex>
        {isAdmin && (
          <>
            <CheckboxSmall
              name="checkAllNotice"
              label="전체선택"
              checked={checked}
              onChange={() => {
                setChecked((prev) => !prev);
                handleCheckAllBox();
              }}
            />
            <IconBtn variant="secondary" size="medium" state="outline" onClick={handleSendCheckedPost}>
              <TrashIcon />
            </IconBtn>
          </>
        )}
      </Flex>
      {/* 관리자 혹은 내가 쓴 글을 필터링 하면 체크박스와 ...이 있는 테이블  */}

      <TableContainer>
        <TableHeader>
          <tr>
            <TableHeadText padding="20px" scope="col" />
            <TableHeadText padding="20px" scope="col">
              No.
            </TableHeadText>
            <TableHeadText scope="col" padding="auto" style={{ width: "100%" }}>
              제목
            </TableHeadText>

            <TableHeadText padding="45px" scope="col">
              작성자
            </TableHeadText>
            <TableHeadText padding="35px" scope="col">
              작성일
            </TableHeadText>
            <TableHeadText padding="23px" scope="col">
              조회
            </TableHeadText>
            <TableHeadText padding="20px" scope="col" />
          </tr>
        </TableHeader>
        {changedPosts?.length > 0 ? (
          <tbody>
            {changedPosts?.map((item, idx) => {
              const {
                categoryCd,
                categoryName,
                content,
                firstSaveDt,
                firstSaveUser,
                hitCnt,
                postSeq,
                title,
                usageDate,
              } = item;

              return (
                <BdBtm
                  key={postSeq}
                  onClick={() => {
                    handleMoveToPostDetail(item);
                    viewCountMutation.mutate(postSeq);
                  }}
                >
                  <TableBodyText>
                    {isAdmin && (
                      <OnlyCheckBox htmlFor={postSeq} checked={!!checkedItems[postSeq]}>
                        <input
                          name={postSeq}
                          type="checkbox"
                          checked={!!checkedItems[postSeq]}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleCheckbox(postSeq)}
                        />
                      </OnlyCheckBox>
                    )}
                  </TableBodyText>
                  <TableBodyText bold="700">
                    <span>{idx + 1}</span>
                  </TableBodyText>
                  <TableBodyText align="left">
                    <TextMg>{title}</TextMg>
                  </TableBodyText>
                  {currentPath == "all" ? <TableBodyText>{categoryName}</TableBodyText> : null}
                  {currentPath == "needbloods" ? <TableBodyText>{usageDate}</TableBodyText> : null}
                  <TableBodyText>{firstSaveUser}</TableBodyText>
                  <TableBodyText>{firstSaveDt[0]}</TableBodyText>
                  <TableBodyText>{hitCnt}</TableBodyText>
                  <TableBodyText onClick={(e) => e.stopPropagation()}>{isAdmin && <>...</>}</TableBodyText>
                </BdBtm>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <BdBtm>
              <TableBodyText colSpan={7} pdtop="24px">
                게시글이 없습니다.
              </TableBodyText>
            </BdBtm>
          </tbody>
        )}
      </TableContainer>
    </>
  );
}
const BtnsContainer = styled.div`
  text-align: left;
  display: flex;
  gap: 4px;
  margin-top: 48px;
  margin-bottom: 8px;
  width: 100%;
`;
