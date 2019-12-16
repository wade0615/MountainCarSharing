// 使用者登入 api
var send_login = "http://rayoutstanding.space/api/login"
// 使用者註冊 api
var send_sign_up = "http://rayoutstanding.space/api/register"

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

// 登入
$(".btn-login").click(
    function() {
        console.log($("#login_username").val())
        console.log($("#login_pw").val())
        $(this).html("LOADING...")
        $.ajax({
            url: send_login,
            type: 'POST',
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8",
            },
            data: JSON.stringify({
                email: $("#login_username").val(),
                password: $("#login_pw").val()
            }),
            success: function(json) {
                // console.log(json);
                console.log(json.data[0]);
                document.cookie = `login_cookie = ${json.data[0].token}`;
                cookie = document.cookie.split("=");
                console.log(cookie[1]);
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

// 註冊
$(".btn-register").click(
    function() {
        console.log($("#register_username").val())
        console.log($("#register_pw").val())
        console.log($("#register_pw2").val())
        $(this).html("註冊中...")
        $.ajax({
            url: send_sign_up,
            type: 'POST',
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8",
            },
            data: JSON.stringify({
                email: $("#register_username").val(),
                password:$("#register_pw").val(),
                password_confirmation:$("#register_pw2").val()
            }),
            beforeSend: function(){
                console.log(this)
            },
            success: function(json) {
                // console.log(json);
                // console.log(json.api_token);
                // document.cookie = `login_cookie = ${json.api_token}`;
                // cookie = document.cookie.split("=");
                // console.log(cookie[1]);
                alert("成功註冊");
            },
            error: function(err) { 
                console.log(err);
                alert("規格有誤...請再試一次");
            },
            });
    }
)