const MAX_SIDE = 1800;

export async function prepareImage(file) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("이 사진 형식은 열 수 없어요. JPG 또는 PNG로 올려주세요.");
  }
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 1_500_000 && /^image\/(jpeg|png|webp)$/.test(file.type)) {
    return file;
  }
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
  if (!blob) throw new Error("사진을 변환하지 못했어요.");
  return blob;
}

export async function uploadImage(file) {
  const blob = await prepareImage(file);
  const name = (file.name || "image").replace(/\.[^.]+$/, "") + (blob.type === "image/jpeg" ? ".jpg" : "");
  const res = await fetch(`/api/admin?action=upload&name=${encodeURIComponent(name)}`, {
    method: "POST",
    headers: { "Content-Type": blob.type },
    body: blob,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "업로드에 실패했어요.");
  return data.url;
}
