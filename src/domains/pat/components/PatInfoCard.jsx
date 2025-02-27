import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useGetPatInfo } from "../hooks/useGetPatInfo";
import { deletePatInfo } from "../api/pat";
import AddPatInfoCard from "./AddPatInfoCard";
import useUserStore from "@/domains/auth/store/useUserStore";
import { calculateAge } from "@/shared/utils/calculateAge";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import PlusIcon from "../../../assets/icons/white/plus_w.svg?react";
import BlackPlus from "../../../assets/icons/black/plus.svg?react";
import useModalStore from "@/shared/hooks/useModalStore";
import useAlertStore from "@/shared/hooks/useAlertStore";
import LineBoundary from "../../../assets/icons/line/Line1008-mypage.svg?react";
import { Spinner } from "@/shared/components/Spinner";
import { DnPagination } from "@/shared/components/DnPagination";
import { useQueryClient } from "@tanstack/react-query";
import VerticalDotsSelect from "@/shared/components/VerticalDotsSelect";
import DelAlert from "@/shared/components/alert/DelAlert";
import EditPatInfoCard from "./EditPatInfoCard";

export default function PatInfoCard() {
  const { openModal } = useModalStore();
  const { openAlert, isAlertOpen, deleteType, deleteTargetSeq } =
    useAlertStore();
  const [page, setPage] = useState(1);
  const size = 4;
  const { user } = useUserStore();
  const userSeq = user?.userData?.userSeq;
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useGetPatInfo(
    userSeq,
    page,
    size
  );
  const totalPages = data?.totalPage || 1;

  useEffect(() => {
    if (userSeq) {
      refetch();
    }
  }, [userSeq, page, refetch]);

  const handlePageChange = (newPage) => {
    if (newPage === "prev") {
      if (page > 1) {
        setPage(page - 1);
      }
    } else if (newPage === "next") {
      if (page < totalPages) {
        setPage(page + 1);
      }
    } else {
      setPage(Number(newPage));
    }
  };

  const handleEdit = (patId) => {
    const petList = data?.data || [];
    const pet = petList.find((p) => p.patSeq === patId);
    if (pet) {
      setSelectedPet(pet);
      openModal("editDogInfo");
    }
  };

  const handleDelete = (patId) => {
    openAlert("pat", patId);
  };

  const confirmDelete = async () => {
    if (!deleteTargetSeq || deleteType !== "pat") return;

    setIsDeleting(true);
    try {
      const response = await deletePatInfo(deleteTargetSeq);

      if (response.success) {
        queryClient.invalidateQueries(["patInfo"]);

        const petList = data?.data || [];
        if (petList.length <= 1 && page > 1) {
          setPage(page - 1);
        } else {
          refetch();
        }
      } else {
        alert(response.msg || "삭제 중 오류가 발생했습니다.");
      }
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || isDeleting) {
    return (
      <div>
        <Spinner />
        {!userSeq && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            사용자 정보를 불러오는 중...
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>데이터 로딩 중 오류가 발생했습니다.</div>
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  }

  const petList = data?.data || [];

  return (
    <PatInfoLayout>
      <PatInfoHeaderTextContainer>
        <PatInfoHeaderTitleText>반려견 정보</PatInfoHeaderTitleText>
        <PatInfoHeaderSubText>
          {petList.length >= 1
            ? `${petList.length}마리의 반려견과 함께하고 있습니다`
            : "아직 함께 하는 반려견이 없습니다"}
        </PatInfoHeaderSubText>
      </PatInfoHeaderTextContainer>
      <PatInfoContentLayout>
        <IconBtnContainer>
          <IconBtn onClick={() => openModal("addDogInfo")}>
            <PlusIcon />
          </IconBtn>
        </IconBtnContainer>
        <AddPatInfoCard />
        {petList.length >= 1 ? (
          <PatInfoCardLayout>
            {petList.map((pat) => (
              <PatInfoCardWrapper key={pat.patSeq}>
                <PatProfileImg src={pat.imgUrl} />
                <PatInfoWrapper>
                  <PatNameText>{pat.name}</PatNameText>
                  <PatInfoContainer>
                    <PatInfoText>
                      나이: {calculateAge(pat.birthday)}
                    </PatInfoText>
                    <PatInfoText>분류: {pat.breedName}</PatInfoText>
                    <PatInfoText>몸무게: {pat.weight} Kg</PatInfoText>
                    <PatInfoText>혈액형: {pat.bloodTypeName}</PatInfoText>
                    {pat.isDonor === 1 ? (
                      <PatInfoHighlightedText>헌혈 가능</PatInfoHighlightedText>
                    ) : (
                      <PatInfoBoldText>헌혈 불가능</PatInfoBoldText>
                    )}
                  </PatInfoContainer>
                </PatInfoWrapper>
                <DotsSelectWrapper>
                  <VerticalDotsSelect
                    handleEdit={() => handleEdit(pat.patSeq)}
                    handleDelete={() => handleDelete(pat.patSeq)}
                  />
                </DotsSelectWrapper>
              </PatInfoCardWrapper>
            ))}
          </PatInfoCardLayout>
        ) : (
          <AddDogBtn onClick={() => openModal("addDogInfo")}>
            <BlackPlus />
            강아지 정보를 추가해주세요:)
          </AddDogBtn>
        )}
        <PagenationContainer>
          <DnPagination 
            totalPage={totalPages} 
            getClickedPageNumber={handlePageChange} 
          />
        </PagenationContainer>
        <LineBoundaryContainer>
          <LineBoundary />
        </LineBoundaryContainer>
      </PatInfoContentLayout>
      {selectedPet && <EditPatInfoCard petData={selectedPet} />}
      <DelAlert isAlertOpen={isAlertOpen} func={confirmDelete}>
        삭제하시겠습니까?
      </DelAlert>
    </PatInfoLayout>
  );
}

const PatInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1008px;
  align-items: center;
  gap: 38px;
`;

const PatInfoHeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const PatInfoHeaderTitleText = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoHeaderSubText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoCardLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 21px;
  justify-content: center;
  align-items: center;
`;

const PatInfoCardWrapper = styled.div`
  position: relative;
  display: flex;
  width: 360px;
  height: 180px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.25);
`;

const DotsSelectWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
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
  flex-direction: column;
`;

const PatInfoText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoHighlightedText = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary_blue};
`;

const PatInfoBoldText = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const IconBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 16px;
`;

const AddDogBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 192px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.neutrals_08};
`;

const PatInfoContentLayout = styled.div`
  width: 1008px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PagenationContainer = styled.div`
  margin-top: 48px;
`;

const LineBoundaryContainer = styled.div`
  margin-top: 80px;
`;
