import PostCard from "@/shared/components/postcard/PostCard";
import { useState } from "react";

export default function Home() {
  const [likes, setLikes] = useState(2);
  const imageURL = "/src/assets/images/dog";
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
