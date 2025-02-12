import { useDeleteMutation } from "@/domains/post/hooks/useDeletePost";

export function useRemovePosts() {
  const deleteMutation = useDeleteMutation();
  const handleRemovePost = (checked) => {
    const postSeq = [];
    for (const [key, value] of Object.entries(checked)) {
      if (value) {
        postSeq.push({ postSeq: Number(key) });
      }
    }
    if (postSeq.length > 0) {
      deleteMutation.mutate(postSeq);
    }
  };
  return { handleRemovePost };
}
