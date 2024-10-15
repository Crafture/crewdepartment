// messageService.js
const like = (baseUrl, id, clicked) => {
    return fetch(`${baseUrl}/messages/like/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clicked: clicked })
    }).then(res => res.json());
};

const dislike = (baseUrl, id, clicked) => {
    return fetch(`${baseUrl}/messages/dislike/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clicked: clicked })
    }).then(res => res.json());
};

export default {
    like,
    dislike,
};
