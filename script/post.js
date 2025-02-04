const form__post = document.getElementById('form-post')
const post__content = document.getElementById('post__content')
const form__textarea = document.getElementById('form-textarea')

form__post.addEventListener("submit", (e) => {
    e.preventDefault();
    post__content.innerHTML = form__textarea.value
    console.log(form__textarea.value)
})