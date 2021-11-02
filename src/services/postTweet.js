export default function postTweet(tweet) {
    const apiURL = `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`

    return fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweet)
    }
    ).then((response) => {
        if (response.ok) {
            console.log(`New Tweet Added`)
        } else {
            throw new Error('There was a problem adding your twitter, please try again')
        }
    }).catch(error => alert(error))
};