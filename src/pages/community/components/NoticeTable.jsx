import { useGetNoticeList } from "@/domains/post/hooks/useGetPostList";
import { PageTop } from "@/shared/components/layout/PageTopTitle";
import { useState } from "react";
import { TableContainer, TableHeader, TableHeadText, TableBodyText, BdBtm, TextMg, Flex } from "./TableStyle";

export function Notice() {
  const { data, isLoading, isError } = useGetNoticeList();
  console.log("공지사항", data);
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
  return (
    <>
      <PageTop>
        <h2>공지사항</h2>
      </PageTop>
      <div></div>
    </>
  );
}
