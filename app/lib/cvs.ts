export const exportCvs = (content: [], items: [], itemDetails: []) => {
  const csvContent = [
    content.join(","),
    ...items.map((log: any) => itemDetails.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `radio-show-logs-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
