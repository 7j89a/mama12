const fetch = require('node-fetch');

exports.handler = async (event) => {
    const videoId = event.queryStringParameters.videoId;
    const referrer = event.queryStringParameters.referrer;
    const vimeoUrl = `https://player.vimeo.com/video/${videoId}`;

    try {
        const response = await fetch(vimeoUrl, {
            headers: {
                'Referer': referrer
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: 'Failed to fetch video from Vimeo'
            };
        }

        const data = await response.text();
        return {
            statusCode: 200,
            body: data,
            headers: {
                'Content-Type': 'text/html'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
};
