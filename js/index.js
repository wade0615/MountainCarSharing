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

goSignUp.addEventListener('click', () => {
    signIn.style = 'display: none'
    signUp.style = 'display: block'
})

goSignIn.addEventListener('click', () => {
    signIn.style = 'display: block'
    signUp.style = 'display: none'
})

// 登入
$(".btn-signIn").click(
    function() {
        $(this).html("Loading...")
        $.ajax({
            url: send_login,
            type: 'POST',
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8",
            },
            data: JSON.stringify({
                email: $("#signIn_account").val(),
                password: $("#signIn_pw").val()
            }),
            success: function(json) {             
                document.cookie = `login_cookie=${json.data[0].token}`;
                cookie = document.cookie.split("=");
                window.location.href='./home_page.html'
            },
            error: function(err) { 
                console.log(err);
                alert("帳號或密碼有誤...請再試一次");
                $(".btn-login").html("LOG IN AGAIN")
            },
            });
    }
)