const getPayloadFromToken = token =>{
    const encodedPayload = token.split('.')[1];
    return JSON.parse(atob(encodedPayload, 'base64'));
}

export default getPayloadFromToken;