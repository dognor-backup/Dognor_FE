import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleDeletePosts } from "../../../domains/post/hooks/useHandleDeletePosts";
import { useViewCount } from "../../../domains/post/hooks/useViewCount";
import { useGetUserId } from "../../../domains/auth/hooks/useGetUserId";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import { TableContainer, TableBodyText, BdBtm, TextMg, Flex } from "../../../shared/components/table/TableStyle";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import { OnlyCheckBox } from "@/shared/components/checkbox/CheckboxLabel";
import TrashIcon from "/src/assets/icons/secondary/trash.svg?react";
import { DnPagination } from "./DnPagination";
import { CoTableHeader } from "./TableHeader";
import useAlertStore from "@/shared/hooks/useAlertStore";

export function CommunityTable({ currentPath, postsData, totalPage, getClickedPageNumber }) {
  const navigate = useNavigate();
  const { userId } = useGetUserId() || {};
  const { handleDeletePosts } = useHandleDeletePosts("post");
  const viewCountMutation = useViewCount("post");
  const [isUserPost, setUserPost] = useState(userId);
  const [checkedItems, setCheckedItems] = useState({});
  const [changedPosts, setChangedPosts] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const formattedPosts = postsData?.map((post) => ({
      ...post,
      firstSaveDt: post.firstSaveDt.split("T"),
    }));
    setChangedPosts(formattedPosts);
    const filterUserPost = postsData?.filter((post) => post.firstSaveUser == userId);
    setUserPost(filterUserPost);
  }, [postsData]);

  const toggleCheckbox = (postSeq) => setCheckedItems((prev) => ({ ...prev, [postSeq]: !prev[postSeq] }));
  const handleMoveToPostDetail = (item) => navigate(`/postdetail/${item.postSeq}`, { state: { item } });
  const handleSendCheckedPost = () => handleDeletePosts(checkedItems);

  const handleCheckAllBox = () => {
    for (const data of isUserPost) {
      setCheckedItems((prev) => ({
        ...prev,
        [data.postSeq]: !prev[data.postSeq],
      }));
    }
  };

  return (
    <>
      {isUserPost?.length > 0 && (
        <Flex>
          <CheckboxSmall
            name="checkAll"
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
        </Flex>
      )}
      <TableContainer>
        <CoTableHeader currentPath={currentPath} />

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
                    {userId === firstSaveUser ? (
                      <OnlyCheckBox htmlFor={postSeq} checked={!!checkedItems[postSeq]}>
                        <input
                          name={postSeq}
                          type="checkbox"
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleCheckbox(postSeq)}
                        />
                      </OnlyCheckBox>
                    ) : null}
                  </TableBodyText>
                  <TableBodyText bold="700">
                    <span>{idx + 1}</span>
                  </TableBodyText>
                  <TableBodyText align="left">
                    <TextMg>{title}</TextMg>
                  </TableBodyText>
                  {currentPath == "all" ? <TableBodyText>{categoryName}</TableBodyText> : null}
                  {currentPath == "needbloods" ? (
                    <TableBodyText style={{ color: "#B93A3A" }}>{usageDate}</TableBodyText>
                  ) : null}
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
