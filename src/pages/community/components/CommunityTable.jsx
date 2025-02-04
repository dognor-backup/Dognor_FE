export function CommunityTable({ tableItems, currentPath }) {
  return (
    <>
      <table>
        <thead>
          <th>No</th>
          <th>제목/내용</th>
          <th>구분</th>
          <th>게시판/병원</th>
          <th>작성일</th>
          <th>조회</th>
        </thead>
        <tbody>
          {tableItems?.map((item) => {
            const { categoryCd, categoryName, content, firstDaveDt, firstSaveUser, hitCnt, postSeq, title, usageDate } =
              item;
            return (
              <>
                <td>
                  <input type="checkbox" />
                  <span>{postSeq}</span>
                </td>
                <td>{title}</td>
                <td>{categoryCd}</td>
                {currentPath == "needbloods" ? <td>{usageDate}</td> : ""}
                <td>{firstSaveUser}</td>
                <td>{firstDaveDt}</td>
                <td>{hitCnt}</td>
                <td>...</td>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
