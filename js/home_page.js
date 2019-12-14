
// 定義 站內共乘資訊 的url
var record = "http://35.194.168.18/api/post"

// 定義 登出 的url
var logout = "http://35.194.168.18/api/logout"

// 定義 新增共乘 的url
var post = "http://35.194.168.18/api/post"

// get cookie
cookie = document.cookie.split("=");


// 一進畫面就先讀取一次第一筆資料
$(document).ready(function(){
    console.log(cookie[1])
    get_record();
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
    beforeSend: function(){
        console.log(this)
    },
    success: function(json) { 
        // alert("Success");
        console.log(json);
        data = json["data"];
        type = data[0].type;
        console.log(type);
        recordlist();
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
        $("#add").css("display","block");        
    }
)
$(".btn-secondary").click(
    function() {
        $("#add").css("display","none");
        $("#list").css("display","none");
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
            beforeSend: function(){
                console.log(this)
            },
            success: function() {
                // alert("登出成功");
                window.location.href='./index.html'
            },
            error: function(err) { 
                console.log(err);
                console.log(cookie[1]);
                alert("登出失敗");
                window.location.href='./index.html'
            },
            });
    }
)

// 新增共乘資料
$(".btn-info").click(
    function() {
        $.ajax({
            url: post,
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

// 顯示共乘資訊
function recordlist() {
    console.log("陣列出共乘資訊");
    data.forEach(
        function (array) {
            if ( array["type"] == 1 ) {
                $("ul").append(
                    `<li value="${array["id"]}">
                        <span class="active">[站內]</span>
                        <p>${array["subject"]}</p>
                    </li>`
                )
            } else if (array["type"] == 2) {
                $("ul").append(
                    `<li>
                        <span class="active" href="#">[站外]</span>
                        <p>${array["subject"]}</p>
                    </li>`
                )
            }
            
        }
    )
    more_imfor()
}

function more_imfor() {
    $("li").click(
        function () {
            console.log($(this).val());
            dota = $(this).val() - 1;
            console.log(dota);
            $("#list").css("display","block");
            // console.log(data[$(this).val()].subject);
            $("#list_subject").val(data[dota].subject)
            $("#list_departure_date").val(data[dota].departure_date)
            $("#list_departure").val(data[dota].departure)
            $("#list_destination").val(data[dota].destination)
            $("#list_seat").val(data[dota].seat)
            $("#list_description").val(data[dota].description)
        }
    )
}

