export function formatDate(date) {
  const selectedDate = new Date(date);
  if (isNaN(selectedDate.getTime())) {
    return { formattedDate: "", formattedTime: "" };
  }
  const dateForm = selectedDate.toISOString();
  const formattedDate = dateForm.split("T")[0];
  const formattedTime = dateForm.split("T")[1].slice(0, 5);
  return { formattedDate, formattedTime };
}
