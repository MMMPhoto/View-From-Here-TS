export const getSavedPicIds = () => {
  const savedPicIds = localStorage.getItem("saved_pics")
    ? JSON.parse(localStorage.getItem("saved_pics"))
    : [];

  return savedPicIds;
};

export const savePicIds = (picIdArr) => {
  console.log(picIdArr);
  if (picIdArr) {
    localStorage.setItem("saved_pics", JSON.stringify(picIdArr));
  } else {
    localStorage.removeItem("saved_pics");
  }
};

export const removePicId = (picId) => {
  const savedPicIds = localStorage.getItem("saved_pics")
    ? JSON.parse(localStorage.getItem("saved_pics"))
    : null;

  if (!savedPicIds) {
    return false;
  }

  const updatedSavedPicIds = savedPicIds?.filter(
    (savedPicId) => savedPicId !== picId
  );
  localStorage.setItem("saved_pics", JSON.stringify(updatedSavedPicIds));

  return true;
};
