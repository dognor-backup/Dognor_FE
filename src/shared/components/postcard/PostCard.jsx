import styled from "@emotion/styled";
import HeartFilled from "../../../assets/icons/red/heart_filled_r.svg?react";
import Heart from "../../../assets/icons/red/Heart_R.svg?react";
import ActionSelect from "./ActionSelect";
import { useState } from "react";

export default function PostCard({
  imageUrl,
  text,
  dogName,
  likes,
  isAuthor,
  handleEdit,
  handleDelete,
}) {
  const imageurl = "/src/assets/images/dog.jpeg";
  const profile = "/src/assets/images/profile.jpeg";

  const [like, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      if (like === 0) return;
      setLike((prev) => prev - 1);
    } else {
      setLike((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  return (
    <PostCardLayout>
      <ImageWrapper>
        <CardImage src={imageurl} />
        {isAuthor ? (
          <ActionButtonWrapper>
            <ActionSelect handleEdit={handleEdit} handleDelete={handleDelete} />
          </ActionButtonWrapper>
        ) : (
          ""
        )}
      </ImageWrapper>
      <TextWrapper>{text}</TextWrapper>
      <InfoContainer>
        <ProfileWrapper>
          <ProfileImage src={profile} />
          {dogName}
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
  min-width: 234px;
  max-width: 364px;
  padding: 12px;
  gap: 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  max-height: 280px;
  border-radius: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  max-height: 280px;
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

const ActionButtonWrapper = styled.button`
  position: absolute;
  background-color: transparent;
  top: 16px;
  right: 8px;
  padding: 0;
`;
