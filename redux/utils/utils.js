import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../config";

export async function getRealPhotoURL(photo) {
  if (!photo) {
    return null;
  }
  const response = await fetch(photo);
  const file = await response.blob();
  const fileName = photo.slice(photo.lastIndexOf("/") + 1);
  const path = `images/${fileName}`;
  return await upLoadFile(file, path);
}

async function upLoadFile(file, path) {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadBytes(storageRef, file);
  return await getDownloadURL(uploadTask.ref);
}

export function formatDate(dateObject) {
  const date = stringifyNumber(dateObject.getDate());
  let month = dateObject.getMonth();
  month = localeMonth(month);
  const year = dateObject.getFullYear();
  const hours = stringifyNumber(dateObject.getHours());
  const minutes = stringifyNumber(dateObject.getMinutes());

  return `${date} ${month}, ${year} | ${hours}:${minutes}`;
}

function stringifyNumber(number) {
  return String(number).padStart(2, "0");
}

function localeMonth(month) {
  switch (month) {
    case 0:
      return "січня";
    case 1:
      return "лютого";
    case 2:
      return "березня";
    case 3:
      return "квітня";
    case 4:
      return "травня";
    case 5:
      return "червня";
    case 6:
      return "липня";
    case 7:
      return "серпня";
    case 8:
      return "вересня";
    case 9:
      return "жовтня";
    case 10:
      return "листопада";
    case 11:
      return "грудня";
  }
}
