
// 定義 站內共乘資訊 的url
var record = "http://35.194.168.18/api/record"

// 定義 登出 的url
var logout = "http://35.194.168.18/api/logout"

// 定義 新增共乘 的url
// var logout = "http://35.194.168.18/api/post"

// get cookie
cookie = document.cookie.split("=");


// 一進畫面就先讀取一次第一筆資料
$(document).ready(function(){
    console.log(cookie[1])
    // get_record();
})


// 抓取 所有共乘資訊
function get_record(){
    $.ajax({
    url: record,
    type: 'GET',
    datatype: 'json',
    headers: {
        Authorization:`Bearer ${cookie[1]}`,
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
    },
    success: function(json) { 
        alert("Success");
        console.log(json);
        // data = json["data"];
        // message = json.message
        // level = json.message.level;
    },
    error: function(err) { 
        console.log(err);
        alert('Failed!'); 
    },
    });
}

$(".btn-add").click(
    function() {
        $("section").css("display","block");        
    }
)
$(".btn-secondary").click(
    function() {
        $("section").css("display","none");
    }
)

// 登出
$(".btn-danger").click(
    function() {
        $.ajax({
            url: logout,
            type: 'POST',
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${cookie[1]}`
            },
            // datatype: 'json',
            // contentType: "application/json",
            // headers: JSON.stringify({
            //     Authorization: `Bearer ${cookie[1]}`
            // }),
            beforeSend: function(){
                console.log(this)
            },
            success: function() {
                alert("登出成功");
                window.location.href='./index.html'
            },
            error: function(err) { 
                console.log(err);
                console.log(cookie[1]);
                alert("登出失敗");
            },
            });
    }
)

// 新增共乘資料
$(".btn-info").click(
    function() {
        $.ajax({
            url: logout,
            type: 'POST',
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${cookie[1]}`
            },
            data:{},
            success: function() {
                // console.log(json);
                // console.log(json.api_token);
                // document.cookie = `login_cookie = ${json.api_token}`;
                // cookie = document.cookie.split("=");
                // console.log(cookie[1]);
                alert("新增成功");
                // window.location.href='./index.html'
            },
            error: function(err) { 
                console.log(err);
                alert("新增失敗");
                // $(".btn-login").html("LOG OUT AGAIN")
            },
            });
    }
)