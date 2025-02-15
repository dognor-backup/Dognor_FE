import { useDeleteMutation } from "@/domains/post/hooks/useDeletePost";

export function useRemovePosts(division) {
  const deleteMutation = useDeleteMutation(division);
  const handleRemovePost = (checked) => {
    const postSeq = [];
    for (const [key, value] of Object.entries(checked)) {
      if (value) {
        postSeq.push({ postSeq: Number(key) });
      }
    }
    deleteMutation.mutate(postSeq);
  };
  return { handleRemovePost };
}
