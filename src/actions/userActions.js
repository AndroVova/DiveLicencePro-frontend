export const updateUserImage = (imageUrl) => {
    return {
        type: 'UPDATE_USER_IMAGE',
        payload: imageUrl
    };
};