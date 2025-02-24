import styled from "@emotion/styled";
import HeartFilled from "../../../../assets/icons/red/heart_filled_r.svg?react";
import Heart from "../../../../assets/icons/red/Heart_R.svg?react";
import DefaultProfile from "../../../../assets/icons/default/Default_profile_32.svg?react";
import { useEffect, useState } from "react";
import useUserStore from "@/domains/auth/store/useUserStore";
import { useLikeDonationStory } from "@/domains/donationstory/hooks/useLikeDonationStory";
import { useNavigate } from "react-router-dom";
import VerticalDotsSelect from "../../VerticalDotsSelect";

export default function PostCard({ story, handleDelete, handleEdit }) {
  const {
    donationStorySeq,
    cardImgUrl,
    likeCnt,
    likeYn,
    content,
    name,
    profileImgUrl,
    firstSaveUser,
  } = story;
  const { user } = useUserStore();
  const [like, setLike] = useState(likeCnt);
  const [isLiked, setIsLiked] = useState(likeYn);
  const [isAuthor, setIsAuthor] = useState(false);
  const mutation = useLikeDonationStory();
  const userId = user.userData.userId;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setIsAuthor(false);
    } else {
      if (userId === firstSaveUser) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    }
  }, [userId, firstSaveUser]);

  const handleLike = () => {
    if (!userId) return navigate("/login");
    if (isLiked) {
      if (like === 0) return;
      setLike((prev) => prev - 1);
    } else {
      setLike((prev) => prev + 1);
    }

    mutation.mutate(
      {
        donationStorySeq: donationStorySeq,
        likeEvent: isLiked ? "unlike" : "like",
        userSeq: user.userData.userSeq,
      },
      {
        onError: () => setIsLiked(!isLiked),
      }
    );
    setIsLiked(!isLiked);
  };
  useEffect(() => {
    console.log(isLiked);
  }, [isLiked]);

  return (
    <PostCardLayout>
      <ImageWrapper>
        <CardImage src={cardImgUrl} />
        {isAuthor ? (
          <ActionSelectWrapper>
            <VerticalDotsSelect
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </ActionSelectWrapper>
        ) : (
          ""
        )}
      </ImageWrapper>
      <TextWrapper>{content}</TextWrapper>
      <InfoContainer>
        <ProfileWrapper>
          {profileImgUrl ? (
            <ProfileImage src={profileImgUrl} />
          ) : (
            <DefaultProfile />
          )}
          {name}
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
    </PostCardLayout>
  );
}

const PostCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.colors.neutrals_05}`};
  background-color: ${({ theme }) => {
    theme.colors.neutrals_08;
  }};
  border-radius: 16px;
  width: 320px;
  height: 408px;
  padding: 12px;
  gap: 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  max-height: 280px;
  border-radius: 10px;
`;

const CardImage = styled.img`
  width: 296px;

  height: 280px;
  object-fit: cover;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => {
    theme.colors.neutrals_00;
  }};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: ${({ theme }) => {
    theme.colors.neutrals_00;
  }};
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ActionSelectWrapper = styled.div`
  position: absolute;
  background-color: transparent;
  top: 16px;
  right: 8px;
  padding: 0;
`;
