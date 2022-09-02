const loadCategoryMenu = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryMenu(data.data.news_category))
}
const displayCategoryMenu = (categories) => {
    // console.log('categories', categories)
    loadCategoryId(categories[0].category_id)
    console.log('categories[0].category_id', categories[0].category_id)
    for (const category of categories) {
        // console.log(category);
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div onclick=loadCategoryId('${category.category_id}') >
           <h5 class="category-item">${category.category_name}</h5>
        </div>
            `
        categoryContainer.appendChild(categoryDiv);
    }
}
const loadCategoryId = (id) => {
    // console.log('id', id)
    const idUrl = `https://openapi.programming-hero.com/api/news/category/${id} `
    fetch(idUrl)
        .then(res => res.json())
        .then(data => {
            console.log('data', data)

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
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${categoryUrl.image_url}" class="img-fluid rounded-start  m-2" alt="...">

                    </div>
                    <div class="col-md-8">
                        <div class="card-body  mx-2 px-4">
                        <h5 class="card-title">${categoryUrl.title}</h5>
                        <p class="card-text mt-2">${categoryUrl.details.slice(0, 200)}</p>
                        <div class="d-flex justify-content-around mt-2">
                        <p class="card-title ">
                        <img src="${categoryUrl.author.img}" class="img-fluid rounded-start  m-2 " style="height: 40px; width: 40px; border-radius: 155px;" alt="..."> ${categoryUrl.author.name}</p>
                        <p class="card-text mt-3">${categoryUrl.total_view}</p>
                        <p class="card-text mt-3">More > ${categoryUrl.rating.number}</p>

                        </div>

                        
                        </div>
                    </div>
                </div>
       `
        displayNews.appendChild(categoryDiv);
    }

}
loadCategoryId();
loadCategoryMenu();