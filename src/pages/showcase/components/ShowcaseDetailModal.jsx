import { useState, useEffect } from "react";
import useModalStore from "@/shared/hooks/useModalStore";
import Modal from "@/shared/components/modals/Modal";
import styled from "@emotion/styled";
import HeartFilled from "../../../assets/icons/red/heart_filled_r.svg?react";
import Heart from "../../../assets/icons/red/Heart_R.svg?react";
import DefaultProfile from "../../../assets/icons/default/Default_profile_32.svg?react";
import useUserStore from "@/domains/auth/store/useUserStore";
import { useLikeDonationStory } from "@/domains/donationstory/hooks/useLikeDonationStory";
import { useNavigate } from "react-router-dom";
import VerticalDotsSelect from "@/shared/components/VerticalDotsSelect";

export default function ShowcaseDetailModal({
  story,
  handleDelete,
  handleEdit,
}) {
  const { isModalOpen, closeModal } = useModalStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const mutation = useLikeDonationStory();

  const [like, setLike] = useState(story?.likeCnt || 0);
  const [isLiked, setIsLiked] = useState(story?.likeYn || false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (story) {
      setLike(story.likeCnt || 0);
      setIsLiked(story.likeYn || false);

      const userId = user?.userData?.userId;
      if (!userId) {
        setIsAuthor(false);
      } else {
        setIsAuthor(userId === story.firstSaveUser);
      }
    }
  }, [story, user]);

  const handleLike = () => {
    const userId = user?.userData?.userId;
    if (!userId) return navigate("/login");

    if (isLiked) {
      if (like === 0) return;
      setLike((prev) => prev - 1);
    } else {
      setLike((prev) => prev + 1);
    }

    mutation.mutate(
      {
        donationStorySeq: story.donationStorySeq,
        likeEvent: isLiked ? "unlike" : "like",
        userSeq: user.userData.userSeq,
      },
      {
        onError: () => setIsLiked(!isLiked),
      }
    );
    setIsLiked(!isLiked);
  };

  if (!story) return null;

  return (
    <Modal
      title=""
      BtnText=""
      isModalOpen={isModalOpen}
      modalname="showcaseDetail"
      formName=""
      onSubmit={(e) => e.preventDefault()}
    >
      <ModalContentLayout>
        <ImageContainer>
          <StoryImage src={story.cardImgUrl} alt="Story" />
          {isAuthor && (
            <ActionSelectWrapper>
              <VerticalDotsSelect
                handleEdit={() => handleEdit(story)}
                handleDelete={() => handleDelete(story.donationStorySeq)}
              />
            </ActionSelectWrapper>
          )}
        </ImageContainer>
        <ContentContainer>
          <InfoContainer>
            <ProfileWrapper>
              {story.profileImgUrl ? (
                <ProfileImage src={story.profileImgUrl} />
              ) : (
                <DefaultProfile />
              )}
              <ProfileName>{story.patName || story.name}</ProfileName>
            </ProfileWrapper>
            <LikesWrapper>
              {like}{" "}
              {isLiked ? (
                <HeartFilled onClick={handleLike} />
              ) : (
                <Heart onClick={handleLike} />
              )}
            </LikesWrapper>
          </InfoContainer>
          <StoryContent>{story.content}</StoryContent>
        </ContentContainer>
      </ModalContentLayout>
    </Modal>
  );
}

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-bottom: -30px;
`;

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 8px;
`;

const StoryImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0 24px 0;
`;

const StoryContent = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.point_orange_dark_100};
  cursor: pointer;
`;

const ActionSelectWrapper = styled.div`
  position: absolute;
  background-color: transparent;
  top: 16px;
  right: 18px;
  padding: 0;
`;
