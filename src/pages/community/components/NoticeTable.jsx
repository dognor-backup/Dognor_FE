import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNoticeList } from "@/domains/post/hooks/useGetPostList";
import { useHandleDeletePosts } from "../../../domains/post/hooks/useHandleDeletePosts";
import { useGetUserId } from "../../../domains/auth/hooks/useGetUserId";
import { useViewCount } from "../../../domains/post/hooks/useViewCount";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import { OnlyCheckBox } from "@/shared/components/checkbox/CheckboxLabel";
import { TableContainer, TableBodyText, BdBtm, TextMg, Flex } from "../../../shared/components/table/TableStyle";
import { PageTop } from "@/shared/components/layout/PageTopTitle";
import { Button } from "@/shared/components/buttons/Button";
import { DnPagination } from "./DnPagination";
import { NoTableHeader } from "./TableHeader";
import TrashIcon from "/src/assets/icons/secondary/trash.svg?react";
import styled from "@emotion/styled";

export function NoticeTable({ currentPath, pathName }) {
  const navigate = useNavigate();
  const { userId, userRole } = useGetUserId() || {};
  const { handleDeletePosts } = useHandleDeletePosts("notice");
  const viewCountMutation = useViewCount("notice");
  const [checkedItems, setCheckedItems] = useState({});
  const [changedPosts, setChangedPosts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserPost, setUserPost] = useState();
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    setIsAdmin(userRole === "ADMIN");
  }, []);

  const [getCategoryList, setCategoryList] = useState({
    searchParam: {
      page: 1,
      size: 5,
      sortByHitCnt: false,
      sortByLatest: true,
      categoryCd: 1,
    },
  });

  const { data } = useGetNoticeList(getCategoryList);
  const { data: postsData, totalPage: allPage } = data?.data || { data: [], totalPage: 0 };

  useEffect(() => {
    setTotalPage(allPage);
  }, [data]);

  useEffect(() => {
    const formattedPosts = postsData?.map((post) => ({
      ...post,
      firstSaveDt: post.firstSaveDt.split("T"),
    }));
    setChangedPosts(formattedPosts);
    const filterUserPost = postsData?.filter((post) => post?.firstSaveUser == userId);
    setUserPost(filterUserPost);
  }, [postsData]);

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
  const handleSendCheckedPost = () => handleDeletePosts(checkedItems);

  const handleListUpPosts = (e) => {
    const targetBtn = e.target.name;
    const newSearchParam = {
      sortByHitCnt: false,
      sortByLatest: true,
    };
    if (targetBtn === "최신순") newSearchParam.sortByLatest = true;
    if (targetBtn === "조회순") newSearchParam.sortByHitCnt = true;

    setCategoryList((prev) => ({
      ...prev,
      searchParam: { ...prev.searchParam, ...newSearchParam },
    }));
  };

  const getClickedPageNumber = (clicked) => {
    const currentPage = getCategoryList.searchParam.page;
    let newPage;
    if (clicked === "next" && currentPage < totalPage) {
      newPage = currentPage + 1;
    } else if (clicked === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else {
      newPage = Number(clicked);
    }
    if (newPage) {
      setCategoryList((prev) => ({
        ...prev,
        searchParam: { ...prev.searchParam, page: newPage },
      }));
    }
  };

  return (
    <>
      <PageTop noNav={pathName === "community" ? false : true}>
        <h2>공지사항</h2>
      </PageTop>
      <BtnsContainer>
        <Button variant="secondary" size="small" onClick={() => (!userId ? navigate("/login") : navigate("/postnew"))}>
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

      <TableContainer>
        <NoTableHeader />

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
      <DnPagination totalPage={totalPage} getClickedPageNumber={getClickedPageNumber} />
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
