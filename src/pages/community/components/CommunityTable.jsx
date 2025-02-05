import styled from "@emotion/styled";

export function CommunityTable({ currentPath, postsData }) {
  console.log(postsData);
  return (
    <>
      {postsData.length == 0 ? (
        <div>데이터 없음</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">제목</th>
              {currentPath === "all" ? <th scope="col">커뮤니티</th> : null}
              {currentPath === "needbloods" ? <th scope="col">사용 날짜</th> : null}
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
              <th scope="col">조회</th>
            </tr>
          </thead>
          <tbody>
            {postsData?.map((item) => {
              const {
                categoryCd,
                categoryName,
                content,
                firstDaveDt,
                firstSaveUser,
                hitCnt,
                postSeq,
                title,
                usageDate,
              } = item;
              return (
                <tr key={postSeq}>
                  <td>
                    <input type="checkbox" />
                    <span>{postSeq}</span>
                  </td>
                  <td>{title}</td>
                  {currentPath == "all" ? <td>{categoryCd}</td> : null}
                  {currentPath == "needbloods" ? <td>{usageDate}</td> : null}
                  <td>{firstSaveUser}</td>
                  <td>{firstDaveDt}</td>
                  <td>{hitCnt}</td>
                  <td>...</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
