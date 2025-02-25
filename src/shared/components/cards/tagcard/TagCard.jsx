import styled from "@emotion/styled";
import HeartFilled from "../../../../assets/icons/secondary/heart_filled_secondary.svg?react";
import Heart from "../../../../assets/icons/secondary/Heart_Secondary.svg?react";
import { useState } from "react";
import useUserStore from "@/domains/auth/store/useUserStore";
import VerticalDotsSelect from "../../VerticalDotsSelect";
import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";

export default function TagCard({ handleDelete, handleEdit, campaign, likeCampaignMutation, useHome, ...props }) {
  const { camPaignSeq, imgUrl, title, likeCnt, likeYn, keyword1, keyword2, keyword3 } = campaign || {};

  const { user } = useUserStore();
  const { userSeq, userRole } = useGetUserId();
  const [isAdmin, setIsAdmin] = useState(false);
  const [like, setLike] = useState(likeCnt);
  const [isLiked, setIsLiked] = useState(likeYn);
  if (user.userData.role === "admin") setIsAdmin(true);

  const handleLike = () => {
    if (isLiked) {
      if (like === 0) return;
      setLike((prev) => prev - 1);
    } else {
      setLike((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
    if (!likeCampaignMutation) return;
    likeCampaignMutation({ camPaignSeq, likeEvent: isLiked ? "unlike" : "like", userSeq });
  };

  return (
    <TagCardLayout {...props}>
      <ImageWrapper>
        <CardImage src={imgUrl} />
        {isAdmin ? (
          <ActionSelectWrapper>
            <VerticalDotsSelect handleEdit={handleEdit} handleDelete={handleDelete} />
          </ActionSelectWrapper>
        ) : (
          ""
        )}
      </ImageWrapper>
      <BtmContainer>
        <TextWrapper>
          <KeywordText>{`#${keyword1} #${keyword2} #${keyword3}`}</KeywordText>
          <TitleText>{title}</TitleText>
        </TextWrapper>
        <InfoContainer>
          <LikesWrapper onClick={(e) => e.stopPropagation()}>
            <LikeTextSpan>{like}</LikeTextSpan>
            {isLiked || likeYn || useHome ? <HeartFilled onClick={handleLike} /> : <Heart onClick={handleLike} />}
          </LikesWrapper>
        </InfoContainer>
      </BtmContainer>
    </TagCardLayout>
  );
}

const TagCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.colors.neutrals_05}`};
  background-color: ${({ theme }) => {
    theme.colors.neutrals_08;
  }};
  border-radius: 16px;
  width: 320px;
  height: 376px;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 260px;
`;

const CardImage = styled.img`
  width: 320px;
  height: 260px;
  object-fit: cover;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 48px;
  line-height: 24px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  padding: 0 4px 8px 4px;
  text-align: left;
  gap: 8px;
`;

const KeywordText = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const TitleText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
  font-weight: 400;
  line-height: 24px;
`;
const BtmContainer = styled.div`
  padding: 8px 4px;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
