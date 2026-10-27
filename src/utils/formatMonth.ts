export function formatMonth(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);

  const date = new Date(year, month, 1);

  const result = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return result;
}
