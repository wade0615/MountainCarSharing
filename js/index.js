// 使用者登入 api
const send_login = "https://carsharing.rayoutstanding.space/api/login"
// 使用者註冊 api
const send_sign_up = "https://carsharing.rayoutstanding.space/api/register"

// 定義DOM變數
const goSignUp = document.querySelector("#goSignUp");
const goSignIn = document.querySelector("#goSignIn");
const signIn = document.querySelector("#signIn");
const signUp = document.querySelector("#signUp");

goSignUp.addEventListener('click', signUpPage);
goSignIn.addEventListener('click', signInPage);

// 換頁
function signUpPage(){
    signIn.style = 'display: none'
    signUp.style = 'display: block'
};
function signInPage(){
    signIn.style = 'display: block'
    signUp.style = 'display: none'
};


const btnSignIn = document.querySelector(".btn-signIn");
const btnSignUp = document.querySelector(".btn-signUp");

const signInAccount = document.querySelector("#signIn_account");
const signInPassword = document.querySelector("#signIn_pw");

const signUpAccount = document.querySelector("#signUp_account");
const signUpPassword = document.querySelector("#signUp_pw");
const signUpPasswordConfirm = document.querySelector("#signUp_pwConfirm");

// 登入
btnSignIn.addEventListener('click', () => {
    btnSignIn.innerHTML = 'Loading...'
    fetch(send_login, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json; charset=utf-8", 
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
                email: signInAccount.value,
                password: signInPassword.value
            }) 
        })
        .then(response => {
            response = Promise.resolve(response.json());
            response.then(result => {
                document.cookie = `login_cookie = ${result.data[0].token}`;
                // cookie = document.cookie.split("=");
                // console.log(cookie);
                window.location.href='./home_page.html'
            })
        })
        .catch(err => {
            console.log(err);
            alert("帳號或密碼有誤...請再試一次");
            btnSignIn.innerHTML = 'Try it again.'
        })
})

// 註冊
btnSignUp.addEventListener('click', () => {
    btnSignUp.innerHTML = 'Wait for a moment...'
    fetch(send_sign_up, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json; charset=utf-8", 
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
                email: signUpAccount.value,
                password: signUpPassword.value,
                password_confirmation: signUpPasswordConfirm.value
            }) 
        })
        .then(response => {
            alert("成功註冊");
            signInPage()
        })
        .catch(err => {
            console.log(err);
            alert("輸入的格式錯囉！再試一次吧～");
            btnSignUp.innerHTML = 'Sign Up'
            signInPage();
        })
})