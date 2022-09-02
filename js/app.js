const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}
const displayCategory = (categories) => {
    for (const category of categories) {
        console.log(category);
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <h5 class="category-item">${category.category_name}</h5>
            `
        categoryContainer.appendChild(categoryDiv);
    }
}
// const loadId = id => {
//     const idUrl = `https://openapi.programming-hero.com/api/news/category/01`
//     fetch(idUrl)
//         .then(res => res.json())
//         .then(data => console.log(data))
// }
// const displayId = 
// loadId();
loadCategory();