  
  
  const divEl = document.createElement('div');
   divEl.classList.add('bookmark-form');

const btnContainer = document.createElement('div');
btnContainer.classList.add('button-container')


const searchContainer = document.querySelector('.search-bar-container')
const searchBar = document.createElement('input')

searchBar.placeholder ='Search for saved bookmarks'
searchBar.classList.add('search')
  searchContainer.appendChild(searchBar)
const category = document.querySelectorAll('.category')
  
  const container = document.querySelector('.container');


// The empty array to push the new inputs items
let newBookmark = [];


//  This function will create the form that will displayed when one of the categories is clicked
function renderForm(categoryId){

      const titleInput = document.createElement('input');
  titleInput.classList.add('title');
titleInput.placeholder = 'Title';
    const urlInput = document.createElement('input');
    urlInput.classList.add('url');
    urlInput.placeholder = 'URL';

    const description = document.createElement('textarea');
    description.classList.add('description');
    description.placeholder = 'Description';

const picInput = document.createElement('input');
picInput.type ='file';
picInput.accept = "image/*"

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('save-btn');
        saveBtn.textContent = 'Save';

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent = 'Cancel';
    divEl.append(titleInput, urlInput, picInput, description, saveBtn, cancelBtn)
    container.appendChild(divEl);

// save button click event

saveBtn.addEventListener('click', ()=>{
  
    const file = picInput.files[0]
    if(file){
      const reader = new FileReader();
      reader.onload = (e)=>{
        const imageData = e.target.result;
saveFormData(categoryId, titleInput.value, urlInput.value, imageData, description.value)
      };
      reader.readAsDataURL(file)
    } else{
  
            saveFormData(categoryId, titleInput.value, urlInput.value, null, description.value);
                const pic = document.getElementById('bookmark-pic')
  pic.style.visibility ='hidden'
            
    }

    
  divEl.innerHTML = '';

    });


}



//This function should save the input feilds values


function saveFormData(categoryId, titleInput, urlInput,picInput, description){

  if(!titleInput)return alert('Please fill the title');

  const newData = {categoryId, titleInput, urlInput, picInput, description}
  newBookmark.push(newData);
  console.log('saved items', newData)
  
  localStorage.setItem('bookmarks', JSON.stringify(newBookmark));


SavedBookMarkCards(newData)
displaySavedBookmark(newData);
}




// function to display the UI of saved input values 
function displaySavedBookmark(item){


  const lists = document.querySelector('.lists');

  lists.innerHTML = `
  <div >
    <h3>${item.titleInput}</h3>
    <a href=${item.urlInput}>${item.urlInput}</a>
    <p>${item.description}</p>
<img id='bookmark-pic' src=${item.picInput} alt=${item.titleInput}/> 
<button id=delete-btn>X</button>
  </div>
  
  `

const wrapper = document.querySelector('.wrapper')
  wrapper.appendChild(lists)

  
}


function SavedBookMarkCards (item){
const wrapper = document.querySelector('.wrapper')
  const lists = document.querySelector('.lists');
  const card = document.createElement('div');


  card.innerHTML = `
  <div class="list-card">
    <h3>${item.titleInput}</h3>
<img id='bookmark-pic' src=${item.picInput} alt=${item.titleInput}/> 
<button id=delete-btn>X</button>
  </div>

  
  `

lists.appendChild(card)

  wrapper.appendChild(lists)



}






 
// This forEach will iterate over the categories 
  category.forEach(cat => {
    
    cat.addEventListener('click', (newData)=>{
      container.innerHTML = '';
renderForm( container, cat.id)
     
    })
  })


window.addEventListener('DOMContentLoaded', ()=>{
  const storedData = JSON.parse(localStorage.getItem('bookmarks')) || '';

  storedData.forEach(item =>{
    SavedBookMarkCards(item);
  })
  if (localStorage){
    divEl.style.display ='none'
  }else{
      divEl.style.display ='block'
  }
});