import { PageTop } from "@/shared/components/layout/PageTopTitle";
import { useState } from "react";
import { TableContainer, TableHeader, TableHeadText, TableBodyText, BdBtm, TextMg, Flex } from "./TableStyle";
import { useGetNoticeList } from "@/domains/post/hooks/useGetPostList";

export function Notice() {
  const [getCategoryList, setCategoryList] = useState({
    searchParam: {
      page: 1,
      size: 15,
      sortByHitCnt: false,
      sortByLatest: true,
      myPostsOnly: false,
      categoryCd: 1,
    },
  });
  const { data, isLoading, isError } = useGetNoticeList(getCategoryList);
  console.log("공지사항", data);
  return (
    <>
      <PageTop>
        <h2>공지사항</h2>
      </PageTop>
      <div></div>
    </>
  );
}
