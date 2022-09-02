const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}
const displayCategory = (categories) => {
    // console.log('categories', categories)
    loadId(categories[0].category_id)
    console.log('categories[0].category_id', categories[0].category_id)
    for (const category of categories) {
        // console.log(category);
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div onclick=loadId('${category.category_id}') >
           <h5 class="category-item">${category.category_name}</h5>
        </div>
            `
        categoryContainer.appendChild(categoryDiv);
    }
}
const loadId = (id) => {
    // console.log('id', id)
    const idUrl = `https://openapi.programming-hero.com/api/news/category/${id} `
    fetch(idUrl)
        .then(res => res.json())
        .then(data => {
            // console.log('data', data)

            displayId(data.data)
        })

}
const displayId = (data) => {
    const displayNews = document.getElementById('display-news');
    displayNews.innerHTML = ``;
    for (const categoryUrl of data) {
        // console.log(categoryUrl)
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <img src="${categoryUrl.image_url}" class="card-img-top" alt="...">
       <div class="card-body">
           <h5 class="card-title">Card title: ${categoryUrl.title}</h5>
           <p class="card-text">${categoryUrl.details.slice(0, 200)}</p>
           <a href="#" class="btn btn-primary">Go somewhere</a>
       </div>
       `
        displayNews.appendChild(categoryDiv);
    }

}
loadId();
loadCategory();