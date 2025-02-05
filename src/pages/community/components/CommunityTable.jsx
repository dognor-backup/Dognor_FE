import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function CommunityTable({ currentPath, postsData }) {
  const [checkedItems, setCheckedItems] = useState({});
  const postId = uuidv4();

  const formatListDate = () => {
    const changedPosts = postsData.map((post) => ({
      ...post,
      firstSaveDt: post.firstSaveDt.split("T"),
    }));
    return changedPosts;
  };

  const changedPosts = formatListDate();

  useEffect(() => {
    formatListDate();
  }, []);

  const toggleCheckbox = (postId) => {
    console.log(checkedItems);
    setCheckedItems((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <>
      {/* 관리자 혹은 내가 쓴 글을 필터링 하면 체크박스와 ...이 있는 테이블  */}
      {changedPosts.length == 0 ? (
        <div>데이터 없음</div>
      ) : (
        <TableContainer>
          <TableHeader>
            <tr>
              <TableHeadText padding="20px" scope="col"></TableHeadText>
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
              <TableHeadText padding="20px" scope="col"></TableHeadText>
            </tr>
          </TableHeader>
          <tbody>
            {changedPosts?.map((item, index) => {
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
                <BdBtm key={`${postId}-${index}`} onClick={() => toggleCheckbox(postId)}>
                  <TableBodyText>
                    <input type="checkbox" checked={!!checkedItems[postId]} onChange={() => toggleCheckbox(postId)} />
                  </TableBodyText>
                  <TableBodyText bold="700">
                    <span>{postSeq}</span>
                  </TableBodyText>
                  <TableBodyText align="left">
                    <TextMg>{title}</TextMg>
                  </TableBodyText>
                  {currentPath == "all" ? <TableBodyText>{categoryName}</TableBodyText> : null}
                  {currentPath == "needbloods" ? <TableBodyText>{usageDate}</TableBodyText> : null}
                  <TableBodyText>{firstSaveUser}</TableBodyText>
                  <TableBodyText>{firstSaveDt[0]}</TableBodyText>
                  <TableBodyText>{hitCnt}</TableBodyText>
                  <TableBodyText>...</TableBodyText>
                </BdBtm>
              );
            })}
          </tbody>
        </TableContainer>
      )}
    </>
  );
}

const TableContainer = styled.table`
  width: 100%;
`;
const TableHeader = styled.thead(
  ({ theme }) => `
  width: 100%;
  white-space: nowrap;
  border-top: 1px solid ${theme.colors.neutrals_04};
  border-bottom: 1px solid ${theme.colors.neutrals_04};
  margin-bottom: 10px
`
);
const TableHeadText = styled.th(
  ({ padding }) => `
  padding: 16px ${padding};
  font-size: 18px;
  font-weight: 700
`
);
const TableBodyText = styled.td(
  ({ align, bold }) => `
  text-align: ${align};
  padding: 8px 0;
  font-size: 14px;
  font-weight: ${bold ? bold : "400"};
  line-height: 24px
`
);
const BdBtm = styled.tr(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.colors.neutrals_05};
`
);
const TextMg = styled.span`
  margin: 0 16px;
`;
