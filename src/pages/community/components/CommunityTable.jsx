import { IconBtn } from "@/shared/components/buttons/IconBtn";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import { useEffect, useState } from "react";
import TrashIcon from "/src/assets/icons/secondary/trash.svg?react";
import { OnlyCheckBox } from "@/shared/components/checkbox/CheckboxLabel";
import { useNavigate } from "react-router-dom";
import { TableContainer, TableHeader, TableHeadText, TableBodyText, BdBtm, TextMg, Flex } from "./TableStyle";
import { useDeleteMutation } from "@/domains/post/hooks/useDeletePost";

export function CommunityTable({ currentPath, postsData, currentViewMutation, handleRemovePost }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [changedPosts, setChangedPosts] = useState([]);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedPosts = postsData?.map((post) => ({
      ...post,
      firstSaveDt: post.firstSaveDt.split("T"),
    }));
    setChangedPosts(formattedPosts);
  }, [postsData]);

  const toggleCheckbox = (postSeq) => {
    setCheckedItems((prev) => ({ ...prev, [postSeq]: !prev[postSeq] }));
  };

  const handleMoveToPostDetail = (item) => {
    navigate(`/postdetail/${item.postSeq}`, { state: { item } });
  };
  const handleSendCheckedPost = () => {
    handleRemovePost(checkedItems);
  };

  if (!Array.isArray(postsData)) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Flex>
        <CheckboxSmall
          name="checkAll"
          label="전체선택"
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        <IconBtn variant="secondary" size="medium" state="outline" onClick={handleSendCheckedPost}>
          <TrashIcon />
        </IconBtn>
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
            {currentPath === "all" ? (
              <TableHeadText padding="35px" scope="col">
                커뮤니티
              </TableHeadText>
            ) : null}
            {currentPath === "needbloods" ? (
              <TableHeadText padding="28px" scope="col">
                사용 예정일
              </TableHeadText>
            ) : null}
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
                    currentViewMutation.mutate(postSeq);
                  }}
                >
                  <TableBodyText>
                    <OnlyCheckBox htmlFor={postSeq} checked={!!checkedItems[postSeq]}>
                      <input
                        name={postSeq}
                        type="checkbox"
                        checked={!!checkedItems[postSeq]}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => toggleCheckbox(postSeq)}
                      />
                    </OnlyCheckBox>
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
                  <TableBodyText onClick={(e) => e.stopPropagation()}>...</TableBodyText>
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
