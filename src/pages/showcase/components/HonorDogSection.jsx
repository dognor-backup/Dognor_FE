import { useState } from "react";
import styled from "@emotion/styled";
import HonorDogNoDataCard from "./HonorDogNoDataCard";
import { DnPagination } from "@/shared/components/DnPagination";
import HonorDogCard from "@/shared/components/cards/honordog/HonorDogCard";
import { getHonorDogs } from "@/domains/donationstory/api/donationStory";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/shared/components/Spinner";

export default function HonorDogSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const {
    data: honorDogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["honorDogs", currentPage, pageSize],
    queryFn: () => getHonorDogs(currentPage, pageSize),
    keepPreviousData: true,
  });

  const handlePageChange = (pageNumber) => {
    const newPage = Number(pageNumber);
    const totalPages = honorDogsData?.totalPage || 1;

    if ((currentPage === 1 && newPage < 1) || (currentPage === totalPages && newPage > totalPages)) {
      return;
    }
    
    setCurrentPage(newPage);
  };

  const isDataAvailable =
    !isLoading &&
    !error &&
    honorDogsData?.success &&
    (honorDogsData.data || []).length > 0;

  return (
    <HonorDogSectionLayout>
      <HonorDogSectionTextContainer>
        <HonorDogSectionTextTitle>명예견</HonorDogSectionTextTitle>
        <HonorDogSectionTextDescription>
          " 명예견은 단순한 타이틀이 아니라 모든 헌혈견과 보호자님들께
          자부심입니다. "
        </HonorDogSectionTextDescription>
        <HonorDogSectionTextSubDescription>
          친구를 구해준 훌륭한 헌혈견입니다.
        </HonorDogSectionTextSubDescription>
      </HonorDogSectionTextContainer>

      <ContentContainer>
        {isLoading ? (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        ) : isDataAvailable ? (
          <HonorDogGrid>
            {honorDogsData.data.map((dog, index) => (
              <HonorDogCard
                key={`${dog.honorDogName}-${index}`}
                imageUrl={dog.honorDogImgUrl}
                name={dog.honorDogName}
              />
            ))}
          </HonorDogGrid>
        ) : (
          <ErrorContainer>
            <HonorDogNoDataCard />
          </ErrorContainer>
        )}
      </ContentContainer>

      {!isLoading && (
        <PaginationWrapper>
          <WhitePaginationContainer style={{ height: "40px" }}>
            <DnPagination
              totalPage={isDataAvailable ? honorDogsData.totalPage || 1 : 1}
              currentPage={currentPage}
              getClickedPageNumber={
                isDataAvailable ? handlePageChange : () => {}
              }
            />
          </WhitePaginationContainer>
        </PaginationWrapper>
      )}
      <Description>
        *본 이미지는 프로필상에 등록된 이미지로 사용됩니다.{" "}
      </Description>
    </HonorDogSectionLayout>
  );
}

const HonorDogSectionLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 36px;
  background-color: ${({ theme }) => theme.colors.neutrals_01};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_08};
`;

const HonorDogSectionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HonorDogSectionTextTitle = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 38.4px;
  text-align: center;
  color: #ffffff;
`;

const HonorDogSectionTextDescription = styled.p`
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
`;

const HonorDogSectionTextSubDescription = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
`;

const HonorDogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 32px;
  width: 100%;
  max-width: 1200px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const WhitePaginationContainer = styled.div`
  margin-bottom: 40px;
  & svg {
    color: #ffffff;
  }

  & button {
    color: #ffffff;
  }

  & a {
    color: #ffffff;
  }
`;

const Description = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  margin-top: 8px;
`;
