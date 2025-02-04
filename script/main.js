const post__container = document.getElementById('post__container');
const sub = document.getElementById('sub');
const form = document.getElementById('form');

let data = JSON.parse(localStorage.getItem('data')) || [];

function loadInStorage() {
    localStorage.setItem('data', JSON.stringify(data));
}

function load() {
    post__container.innerHTML = '';
    
    data.forEach(el => {
        post__container.innerHTML += `
             <div class="post" id=${el.id}>
                <img src=${el["post-img"]} alt="" class="post-img">
                
                <div class="post__meta__container">
                    <div class="category__name">${el["category-name"]}</div>
                    <div class="blog__name">${el["post-name"]}</div>
                    <div class="blog__desc">${el["post-desc"]}</div>
                </div>
        
                <div class="author__container">
                    <img src=${el["author-avatar"]} alt="" class="author__avatar">
                    <div style="display: grid; row-gap: 3px;">
                        <div class="author__name">${el["author-name"]}</div>
                        <div style="display: flex; column-gap: 8px;">
                            <div class="post__date">${el["post-date"]}</div>
                            •
                            <div class="post__time-to-read">${el["time-to-read"]}</div>
                        </div>
                    </div>
                </div>

                <button onclick="del(${el.id})">Удалить пост</button>
            </div>
        `; 
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    
    const postImg = formData.get('post-img');
    const authorImg = formData.get('author-avatar');

    const readerPostImg = new FileReader();
    const readerAuthorImg = new FileReader();

    readerPostImg.onload = function () {
        const postImgUrl = readerPostImg.result;

        readerAuthorImg.onload = function () {
            const authorImgUrl = readerAuthorImg.result;

            data.push({
                "id": data.length + 1,
                "post-img": postImgUrl,
                "category-name": formData.get('category-name'),
                "post-name": formData.get('post-name'),
                "post-desc": formData.get('post-desc'),
                "author-avatar": authorImgUrl,
                "author-name": formData.get('author-name'),
                "post-date": formData.get('post-date'),
                "time-to-read": formData.get('time-to-read')
            });

            load();
            loadInStorage();
        };

        if (authorImg) {
            readerAuthorImg.readAsDataURL(authorImg);
        }
    };

    if (postImg) {
        readerPostImg.readAsDataURL(postImg);
    }
});

function del(id) {
    data = data.filter(el => el.id !== id);
    load(); 
    loadInStorage(); 
}

document.addEventListener('DOMContentLoaded', load);

