// 使用者登入 api
var send_login = "https://bboa14171205.nctu.me/api/user/login"
// 使用者註冊 api
var send_sign_up = "https://bboa14171205.nctu.me/api/user/register"

// $("h5").click(
//     function() {
//         window.location.href='./index.html'
//     }
// )

$(".bt-sign-up").click(
    function() {
        $(".sign-in").css("display","none");
        $(".sign-up").css("display","block");
    }
)
$(".bt-sign-in").click(
    function() {
        $(".sign-in").css("display","block");
        $(".sign-up").css("display","none");
    }
)

$(".btn-login").click(
    function() {
        console.log($("#username").val())
        console.log($("#pw").val())
        $(this).html("LOADING...")
        $.ajax({
            url: send_login,
            type: 'POST',
            datatype: 'json',
            data:{
                // username: $("#username").val(),
                account: $("#account").val(),
                password: $("#pw").val()
            },
            success: function(json) {
                // console.log(json);
                // console.log(json.api_token);
                document.cookie = `login_cookie = ${json.api_token}`;
                cookie = document.cookie.split("=");
                // console.log(cookie[1]);
                // console.log(json.name);
                if (json.name == "Bank") {
                    console.log("開始洗錢囉");
                    window.location.href='./admin.html'
                }else{
                    console.log("歡迎加入");
                    window.location.href='./country_imfor.html'
            }
            },
            error: function(err) { 
                console.log(err);
                alert("SERIOUSLY ? Don't U remember Ur passwords?"); 
                $(".btn-login").html("LOG IN AGAIN")
            },
            });
    }
)
