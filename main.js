const form = document.querySelector('#input-form');
const email = document.querySelector('#email');
const country = document.querySelector('#country');
const zipCode = document.querySelector('#zip-code');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

//Validate each input on keyup
let formEl = Array.from(form.elements);
let inputEl = formEl.splice(0, 5);
inputEl.forEach(item => {
    item.addEventListener('keyup', (e) => {
        validateItem(item);
    })
})

//Validate each input on submission.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formElements = Array.from(form.elements);
    let inputElements = formElements.splice(0, 5);
    inputElements.forEach(element => {
        validateItem(element)
    });
});

confirmPassword.addEventListener('keyup', (e) => {
if(confirmPassword.value !== password.value) {
    confirmPassword.parentElement.lastElementChild.textContent = "please confirm your password";
    confirmPassword.classList.remove('valid');
    confirmPassword.classList.add('notvalid');
    confirmPassword.parentElement.children[2].style.display = 'flex';
    confirmPassword.parentElement.children[3].style.display = 'none';
}
})

function validateItem(element) {
    if (!element.value || !element.checkValidity()) {
        element.classList.add('notvalid');
        element.parentElement.children[2].style.display = 'flex';
        element.parentElement.children[3].style.display = 'none';
        displayError(element);
    } else {
        element.classList.add('valid');
        element.parentElement.children[2].style.display = 'none';
        element.parentElement.children[3].style.display = 'flex';
        element.parentElement.lastElementChild.textContent = ' ' ;
    } 
}   

function displayError(element) {
    let elementName = element.parentElement.firstElementChild.textContent;
    let errorSpan =  element.parentElement.lastElementChild;
    if (element.validity.valueMissing) {
       errorSpan.textContent = `Enter a value for ${elementName}`;
    } else if (element.validity.tooShort) {
        errorSpan.textContent = `${elementName} needs to be atleast ${element.minLength} characters`;
    } else if (element.validity.typeMismatch) {
        errorSpan.textContent = ` You need to enter a correct format for ${elementName}`;
    } else if (element.validity.patternMismatch) {
        errorSpan.textContent = " Your password must be atleast 6 characters , as well as contain atleast 1 uppercase character, atleast 1 lowercase character and atleast 1 number";
    } 
}

