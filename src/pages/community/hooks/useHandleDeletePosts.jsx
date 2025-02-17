import { useDeletePostsMutation } from "@/pages/community/hooks/useDeletePost";

export function useHandleDeletePosts(key) {
  const deleteMutation = useDeletePostsMutation(key);
  const handleDeletePosts = (checked) => {
    const postSeq = [];
    for (const [key, value] of Object.entries(checked)) {
      if (value) {
        postSeq.push({ postSeq: Number(key) });
      }
    }
    deleteMutation.mutate(postSeq);
  };
  return { handleDeletePosts };
}
