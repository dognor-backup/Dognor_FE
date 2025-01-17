import styled from "@emotion/styled";
import HeartFilled from "../../../../assets/icons/primary/heart_filled_primary.svg?react";
import Heart from "../../../../assets/icons/primary/Heart_Primary.svg?react";
import { useState } from "react";
import ActionSelect from "./ActionSelect.jsx";
import dogImage from "./dog.jpeg";

export default function TagCard({ handleDelete, handleEdit }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [like, setLike] = useState(15);
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
        <CardImage src={dogImage} />
        {isAdmin ? (
          <ActionSelectWrapper>
            <ActionSelect handleEdit={handleEdit} handleDelete={handleDelete} />
          </ActionSelectWrapper>
        ) : (
          ""
        )}
      </ImageWrapper>
      <TextWrapper>하이연</TextWrapper>
      <InfoContainer>
        <LikesWrapper>
          <LikeTextSpan>{like}</LikeTextSpan>
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
  font-size: 16px;
  font-weight: 700;
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
  justify-content: flex-end;
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

const LikeTextSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary_purple};
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
`;
