export default function getTweets() {
    const apiURL = `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`

    return fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const { tweets } = response;
            //Validacion para ver que reciba informacion
            if (Array.isArray(tweets)) {
                const content = tweets.map(tweet => {
                    const { content, date, id, userName } = tweet;
                    return { content, date, id, userName }
                })
                return content;
            }
        })
};