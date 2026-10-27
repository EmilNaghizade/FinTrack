export function getLastSixMonths() {
  const months: string[] = [];
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

    const year = date.getFullYear();
    const month = date.getMonth();

    const monthKey = `${year}-${month}`;

    months.push(monthKey);
  }

  return months;
}
