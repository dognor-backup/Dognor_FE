import { Button } from "@/shared/components/buttons/Button";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import { OnlyCheckBox } from "@/shared/components/checkbox/CheckboxLabel";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import {
  BdBtm,
  Flex,
  TableBodyText,
  TableContainer,
  TableHeader,
  TableHeadText,
  TextMg,
} from "@/shared/components/table/TableStyle";
import VerticalDotsSelect from "@/shared/components/VerticalDotsSelect";
import { TrashIcon } from "lucide-react";
import { DnPagination } from "../community/components/DnPagination";
import styled from "@emotion/styled";
import { useGetUsersData } from "./hooks/useGetAdminData";
import { useEffect, useState } from "react";
import { SearchForm } from "@/shared/components/SearchForm";

export function User() {
  const [usersDataList, setUsersDataList] = useState({
    userSearchParam: {
      page: 1,
      size: 10,
      userType: "all",
      sortByLatest: true,
      isWait: true,
      isComplet: true,
      isDismissed: true,
      isWithdraw: true,
      text: "",
      wait: true,
      complet: true,
      dismissed: true,
      withdraw: true,
    },
  });

  const { usersData } = useGetUsersData(usersDataList);

  const [users, setUsers] = useState(usersData?.data || []);

  useEffect(() => {
    setUsers(usersData?.data);
  }, [usersData?.data]);
  console.log(users);
  return (
    <>
      <BtnsContainer>
        <Text>회원구분</Text>
        <Button variant="secondary" size="small" name="all">
          전체
        </Button>
        <Button variant="secondary" size="small" state="outline" name="common">
          일반회원
        </Button>
        <Button variant="secondary" size="small" state="outline" name="hospital">
          병원관계자
        </Button>
      </BtnsContainer>
      <BtnsContainer>
        <Text>필터</Text>
        <Button variant="normal" size="small" name="all">
          최신순
        </Button>
        <Button variant="normal" size="small" state="outline" name="isComplet">
          완료
        </Button>
        <Button variant="normal" size="small" state="outline" name="isWait">
          대기
        </Button>
        <Button variant="normal" size="small" state="outline" name="isDismissed">
          기각
        </Button>
        <SearchWrapper>
          <SearchForm />
        </SearchWrapper>
      </BtnsContainer>

      <Flex>
        <CheckboxSmall name="checkAllNotice" label="전체선택" />
        <IconBtn variant="secondary" size="medium" state="outline">
          <TrashIcon />
        </IconBtn>
      </Flex>

      <TableContainer>
        <TableHeader>
          <tr>
            <TableHeadText padding="20px" scope="col" />
            <TableHeadText padding="5px" scope="col">
              No.
            </TableHeadText>
            <TableHeadText padding="20px" scope="col">
              구분
            </TableHeadText>
            <TableHeadText padding="20px" scope="col">
              성명
            </TableHeadText>
            <TableHeadText padding="auto" scope="col">
              아이디
            </TableHeadText>
            <TableHeadText padding="auto" scope="col">
              이메일
            </TableHeadText>
            <TableHeadText padding="35px" scope="col">
              연락처
            </TableHeadText>
            <TableHeadText padding="20px" scope="col">
              가입일
            </TableHeadText>
            <TableHeadText padding="15px" scope="col">
              상태
            </TableHeadText>
            <TableHeadText padding="20px" scope="col" />
          </tr>
        </TableHeader>

        <tbody>
          {users?.map((user, index) => {
            const { agreement4, agreement5, email, hospitalDto, name, phone, registDt, userId, userRole, userStatus } =
              user;
            return (
              <BdBtm>
                <TableBodyText>
                  <OnlyCheckBox>
                    <input
                      name="1"
                      type="checkbox"
                      // checked={!!checkedItems[postSeq]}
                      onClick={(e) => e.stopPropagation()}
                      // onChange={() => toggleCheckbox(postSeq)}
                    />
                  </OnlyCheckBox>
                </TableBodyText>
                <TableBodyText bold="700">
                  <span>{index + 1}</span>
                </TableBodyText>
                <TableBodyText>{userRole === "USER" ? "일반유저" : "의료기관"}</TableBodyText>
                <TableBodyText>{name}</TableBodyText>
                <TableBodyText>{userId}</TableBodyText>
                <TableBodyText>{email}</TableBodyText>
                <TableBodyText>{phone}</TableBodyText>
                <TableBodyText>{registDt}</TableBodyText>
                <TableBodyText>
                  <Badge status={userStatus}>{userStatus}</Badge>
                </TableBodyText>
                <TableBodyText>
                  <VerticalDotsSelect></VerticalDotsSelect>
                </TableBodyText>
              </BdBtm>
            );
          })}
        </tbody>
      </TableContainer>
      {/*  <tbody>
            <BdBtm>
              <TableBodyText colSpan={7} pdtop="24px">
                게시글이 없습니다.
              </TableBodyText>
            </BdBtm>
          </tbody> */}
      {/* <DnPagination totalPage={totalPage} getClickedPageNumber={getClickedPageNumber} /> */}
    </>
  );
}
const BtnsContainer = styled.div`
  text-align: left;
  display: flex;
  gap: 4px;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
`;
const Badge = styled.span(
  ({ status }) => `
padding:  4px 11px;
background-color: ${status === "완료" ? "#11E5B3" : status === "기각" ? "#F64D4D" : "#4A3AFF"};
font-weight: 700;
color: #fff;
border-radius: 4px;
`
);
const Text = styled.span`
  font-weight: 700;
  width: 72px;
  min-width: 72px;
`;
const SearchWrapper = styled.div`
  width: 100%;
`;
