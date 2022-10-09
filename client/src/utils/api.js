// Route to get All Photos
const getAllPics = () => {
    return fetch('/api/pics/', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    });
};

export { getAllPics };


