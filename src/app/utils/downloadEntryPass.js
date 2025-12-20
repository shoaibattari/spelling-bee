import { toPng } from "html-to-image";

export async function downloadEntryPass(elementId, filename) {
  const node = document.getElementById(elementId);

  if (!node) return;

  try {
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("Entry pass image failed", err);
    alert("Unable to generate image. Please try again.");
  }
}
