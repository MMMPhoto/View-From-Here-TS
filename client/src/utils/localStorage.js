export const getSavedPicIds = () => {
  const savedBookIds = localStorage.getItem("saved_pics")
    ? JSON.parse(localStorage.getItem("saved_pics"))
    : [];

  return savedBookIds;
};

export const savePicIds = (picIdArr) => {
  if (picIdArr.length) {
    localStorage.setItem("saved_pics", JSON.stringify(picIdArr));
  } else {
    localStorage.removeItem("saved_pics");
  }
};

export const removeBookId = (picId) => {
  const savedBookIds = localStorage.getItem("saved_pics")
    ? JSON.parse(localStorage.getItem("saved_pics"))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter(
    (savedBookId) => savedBookId !== picId
  );
  localStorage.setItem("saved_pics", JSON.stringify(updatedSavedBookIds));

  return true;
};
