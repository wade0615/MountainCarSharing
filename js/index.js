// 使用者登入 api
var send_login = "https://carsharing.rayoutstanding.space/api/login"
// 使用者註冊 api
var send_sign_up = "https://carsharing.rayoutstanding.space/api/register"

// 登入
// $(".btn-login").click(
//     function() {
//         console.log($("#login_username").val())
//         console.log($("#login_pw").val())
//         $(this).html("LOADING...")
//         $.ajax({
//             url: send_login,
//             type: 'POST',
//             headers: {
//                 Accept: "application/json; charset=utf-8",
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//             data: JSON.stringify({
//                 email: $("#login_username").val(),
//                 password: $("#login_pw").val()
//             }),
//             success: function(json) {
//                 // console.log(json);
//                 console.log(json.data[0]);                
//                 console.log(json.data[0].token);                
//                 document.cookie = `login_cookie=${json.data[0].token}`;
//                 cookie = document.cookie.split("=");
//                 console.log(cookie[1]);
//                 console.log(document.cookie);
//                 window.location.href='./home_page.html'
//             },
//             error: function(err) { 
//                 console.log(err);
//                 alert("帳號或密碼有誤...請再試一次");
//                 $(".btn-login").html("LOG IN AGAIN")
//             },
//             });
//     }
// )

// 註冊
// $(".btn-register").click(
//     function() {
//         console.log($("#register_username").val())
//         console.log($("#register_pw").val())
//         console.log($("#register_pw2").val())
//         $(this).html("註冊中...")
//         $.ajax({
//             url: send_sign_up,
//             type: 'POST',
//             headers: {
//                 Accept: "application/json; charset=utf-8",
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//             data: JSON.stringify({
//                 email: $("#register_username").val(),
//                 password:$("#register_pw").val(),
//                 password_confirmation:$("#register_pw2").val()
//             }),
//             beforeSend: function(){
//                 console.log(this)
//             },
//             success: function(json) {
//                 alert("成功註冊");
//             },
//             error: function(err) { 
//                 console.log(err);
//                 alert("規格有誤...請再試一次");
//             },
//             });
//     }
// )

//////////////要翻新囉

const goSignUp = document.querySelector("#goSignUp");
const goSignIn = document.querySelector("#goSignIn");
const signIn = document.querySelector("#signIn");
const signUp = document.querySelector("#signUp");

goSignUp.addEventListener('click', signUpPage)

goSignIn.addEventListener('click', signInPage)

function signUpPage(){
    signIn.style = 'display: none'
    signUp.style = 'display: block'
}
function signInPage(){
    signIn.style = 'display: block'
    signUp.style = 'display: none'
}

// 登入
// $(".btn-signIn").click(
//     function() {
//         $(this).html("Loading...")
//         $.ajax({
//             url: send_login,
//             type: 'POST',
//             headers: {
//                 Accept: "application/json; charset=utf-8",
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//             data: JSON.stringify({
//                 email: $("#signIn_account").val(),
//                 password: $("#signIn_pw").val()
//             }),
//             success: function(json) {
//                 console.log(json);
//                 document.cookie = `login_cookie=${json.data[0].token}`;
//                 cookie = document.cookie.split("=");
//                 // window.location.href='./home_page.html'
//             },
//             error: function(err) { 
//                 console.log(err);
//                 alert("帳號或密碼有誤...請再試一次");
//                 $(".btn-login").html("LOG IN AGAIN")
//             },
//             });
//     }
// )

const btnSignIn = document.querySelector(".btn-signIn");
const btnSignUp = document.querySelector(".btn-signUp");

const signInAccount = document.querySelector("#signIn_account");
const signInPassword = document.querySelector("#signIn_pw");

const signUpAccount = document.querySelector("#signUp_account");
const signUpPassword = document.querySelector("#signUp_pw");
const signUpPasswordConfirm = document.querySelector("#signUp_pwConfirm");

btnSignIn.addEventListener('click', () => {
    btnSignIn.innerHTML = 'Loading...'
    fetch(send_login, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json; charset=utf-8", "Content-Type": "application/json; charset=utf-8"
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

btnSignUp.addEventListener('click', () => {
    btnSignUp.innerHTML = 'Wait for a moment...'
    fetch(send_sign_up, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json; charset=utf-8", "Content-Type": "application/json; charset=utf-8"
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
            alert("規格錯囉");
            btnSignUp.innerHTML = 'Sign Up'
            signInPage();
        })
})