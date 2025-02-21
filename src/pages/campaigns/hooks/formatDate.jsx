export function formatDate(date) {
  const selectedDate = new Date(date);
  const dateForm = selectedDate.toISOString();
  const formattedDate = dateForm.split("T")[0];
  return formattedDate;
}
