import useUserStore from "@/domains/auth/store/useUserStore";
import { useSearchDonationStories } from "@/domains/donationstory/hooks/useSearchDonationStories";
import PostCard from "@/shared/components/postcard/PostCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Home() {
  const [likes, setLikes] = useState(2);
  const imageURL = "/src/assets/images/dog";
  const { user } = useUserStore();
  const mutation = useSearchDonationStories();
  const param = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    mutation.mutate(
      {
        searchParam: {
          page: 1,
          sortByHitCnt: false,
          sortByLatest: true,
          myPostsOnly: false,
          userSeq: 1,
        },
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            setData(response.data); // 데이터 상태 업데이트
          } else {
            console.error("Error:", response.msg);
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      setData(mutation.data); // 서버에서 가져온 데이터를 상태로 저장
    }
  }, [mutation.isSuccess, mutation.data]);
  console.log("data", data);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <PostCard
          imageUrl={imageURL}
          text="강아지가 헌혈을 했어요! 강아지가 헌혈을 했어요! 강아지가 헌혈을 했어요! 강아지가 헌혈을 했어요! 강아지가 헌혈을 했어요! 강아지가 헌혈을 했어요! "
          dogName="바둑이"
          likes={likes}
          isAuthor={true}
          handleEdit={() => console.log("수정 클릭!")}
          handleDelete={() => console.log("삭제 클릭!")}
        />
      </div>
    </>
  );
}
