export default function useDate() {
  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const formattedDate = date.toLocaleString("en-IN", options);
    return formattedDate.replace(/-/g, " "); // Remove all dashes from the formatted date
  };

  const formattedDate = formatDate(new Date());
  return formattedDate;
}
