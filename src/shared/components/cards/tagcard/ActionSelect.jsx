import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function ActionSelect({ handleEdit, handleDelete }) {
  const handleChange = (value) => {
    if (value === "edit") {
      handleEdit();
    } else if (value === "delete") {
      handleDelete();
    }
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className=""></SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="edit">수정</SelectItem>
          <SelectItem value="delete">삭제</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
