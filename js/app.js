const loadCategoryMenu = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryMenu(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategoryMenu = (categories) => {
    // console.log('categories', categories)
    loadCategoryId(categories[0].category_id)
    // console.log('categories[0].category_id', categories[0].category_id)

    categories.forEach(category => {
        // console.log(category);
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <div onclick=loadCategoryId('${category.category_id}') >
           <h5 class="category-item">${category.category_name}</h5>
        </div>
            `
        categoryContainer.appendChild(categoryDiv);
    })
}
const loadCategoryId = async (id) => {
    // start Spinner
    toggleSpinner(true)

    // console.log('id', id)
    const idUrl = `https://openapi.programming-hero.com/api/news/category/${id} `

    try {
        const res = await fetch(idUrl)
        const data = await res.json();
        displayId(data.data)
    }
    catch (error) {
        console.log(error);
    }

    // .then(res => res.json())
    // .then(data => {
    //     // console.log('data', data)

    //     displayId(data.data)

    //     // End Spinner 
    // })
    // .catch(error => console.log(error))


}
const displayId = (data) => {
    const displayNews = document.getElementById('display-news');
    displayNews.innerHTML = ``;

    data.forEach(categoryItem => {
        // console.log('categoryItem', categoryItem)
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
                     <div class="row g-0 m-2">
                         <div class="col-md-4">
                           <img src="${categoryItem.image_url}" class="img-fluid rounded-start  m-2" alt="...">
                         </div>
                         <div class="col-md-8 mt-2">
                             <div class="card-body  mx-2 px-4">
                                 <h5 class="card-title">${categoryItem.title}</h5>
                                 <p class="card-text mt-2">
                                 ${categoryItem?.details ?
                categoryItem?.details?.length > 200 ? categoryItem.details.slice(0, 200) + '...' : categoryItem?.details
                :
                'No Details Availableu'
            }
                                 </p>
                                 <div class="d-flex justify-content-between mt-2">
                                   <div class="d-flex justify-content-between  align-items-center">
                                      <div  style="height: 40px; width: 40px;">
                                          <img src="${categoryItem.author.img}"
                                             class="img-fluid"
                                             style=" border-radius: 155px;"
                                             alt="card-image">
                                        </div>
                                             <p class="card-title ms-2"> ${categoryItem.author.name} </p>
                                        </div>
                                         <p class="card-text mt-3">${categoryItem.total_view}</p>
                                      <div>
                                          <button onclick="showModal( ${categoryItem})"
                                           type="button" class="btn btn-primary"
                                           data-bs-toggle="modal" data-bs-target="#exampleModal"> More  </button>
                                         
                                       </div>
                               </div>
                             </div>
                         </div>
                     </div>
            `
        displayNews.appendChild(categoryDiv);
    })
    // End Spinner 
    toggleSpinner(false)

}

const showModal = (category) => {
    console.log('categoryItem from Modal', category)
    // const modalTitle = document.getElementById('titleModalLabel');
    // modalTitle.innerText = category.title;
}

const toggleSpinner = (isLoading) => {
    const loadSpinner = document.getElementById('loader');
    if (isLoading) {
        loadSpinner.classList.remove('d-none')
    }
    else {
        loadSpinner.classList.add('d-none')

    }
}

loadCategoryId();
loadCategoryMenu();