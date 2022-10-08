// Route to get All Photos
const getPics = () => {
    return fetch('/api/pics/', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    });
};

export { getPics };


