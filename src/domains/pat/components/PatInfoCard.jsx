import styled from "@emotion/styled";
import Spinner from "@/shared/components/Spinner";
import { useGetPatInfo } from "../hooks/useGetPatInfo";
import AddPatInfoCard from "./AddPatInfoCard";
import useUserStore from "@/domains/auth/store/useUserStore";
import { calculateAge } from "@/shared/utils/calculateAge";

export default function PatInfoCard() {
  let page = 1;
  const size = 4;
  const { user } = useUserStore();
  const userSeq = user?.userData?.userSeq;

  const { data, isLoading, error } = useGetPatInfo(userSeq, page, size);
  //   console.log("데이터임", data.data.data[0].imgUrl);

  if (isLoading) return <Spinner />;
  if (error) return <div>에러</div>;

  return (
    <>
      {data ? (
        <PatInfoCardLayout>
          {data.data.data.map((pat, index) => (
            <PatInfoCardWrapper key={index}>
              <PatProfileImg src={pat.imgUrl} />
              <PatInfoWrapper>
                <PatNameText>{pat.name}</PatNameText>
                <PatInfoContainer>
                  <PatInfoText>나이: {calculateAge(pat.birthday)}</PatInfoText>
                </PatInfoContainer>
              </PatInfoWrapper>
            </PatInfoCardWrapper>
          ))}
        </PatInfoCardLayout>
      ) : (
        <AddPatInfoCard />
      )}
    </>
  );
}

const PatInfoCardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 21px;
  justify-content: center;
  align-items: center;
`;

const PatInfoCardWrapper = styled.div`
  display: flex;
  width: 360px;
  height: 180px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.25);
`;

const PatProfileImg = styled.img`
  width: 122px;
  height: 148px;
  border-radius: 6px;
`;

const PatInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PatNameText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoContainer = styled.div`
  display: flex;
`;

const PatInfoText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;
