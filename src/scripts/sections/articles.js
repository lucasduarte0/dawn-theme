const moreItemsSection = document.querySelector(".article__more");
if(moreItemsSection !== null){
    // https://bask-goods.myshopify.com/admin/api/2022-01/blogs/84360036601/articles.json
    // fetch("/admin/api/2022-01/blogs/84360036601/articles.json")
    // .then( response => {
    //     console.log(response)
    // })

    const blogHandle = document.querySelector(".article__hero").getAttribute("data-blog-handle")
    const blogId = document.querySelector(".article__hero").getAttribute("data-blog-id")
    const articleTitle = document.getElementById("article__title").textContent


    //FURTHER READING
    function buildPost(post){
        console.log(post)
        let postHTML = document.createRange().createContextualFragment(`
            <a href="${window.shopUrl + '/blogs/' + blogHandle + '/' + post.handle}" class="item__card">
                ${post.hasOwnProperty("image") ?  `
                    <img src="${post.image.src}" loading="lazy" width="${post.image.width}" height="${post.image.height}" class="w-full mb-6">
                ` : ''}
                <div class="item__card-hover glow-bubble"></div>
                <div class="item__card-hover-text">Read More</div>
                <div>
                    <p class="item__card-category block font-italic text-24 -mb-1 lg:text-20">${post.tags} —</p>
                    <p class="item__card-title block font-matterlight text-24 lg:text-20">${post.title}</p>
                </div>
            </a>
        `);
        document.getElementById("more-items").appendChild(postHTML)
    }

    fetch(`https://bask-goods-blog.netlify.app/.netlify/functions/get-articles?blog_id=${blogId}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then( response => { return response.json() })
    .then( data => {
        const articlesData = data.articles.articles;
        const allArticles = articlesData;

        const currentIndex = allArticles.map(item => item.title).indexOf(articleTitle);
        const prevIndex = currentIndex === 0 ? allArticles.length-1 : (currentIndex-1)
        const nextIndex = currentIndex === (allArticles.length-1) ? 0 : (currentIndex+1)
        buildPost(allArticles[nextIndex])
        buildPost(allArticles[prevIndex])
    })  

}