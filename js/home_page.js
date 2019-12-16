
// 定義 站內共乘資訊 的url
var record = "http://rayoutstanding.space/api/post?row=100"

// 定義 登出 的url
var logout = "http://rayoutstanding.space/api/logout"

// 定義 新增共乘 的url
var post = "http://rayoutstanding.space/api/post"

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
            data: JSON.stringify({
                subject: $("#add_subject").val(),
                departure_date: $("#add_departure_date").val(),
                departure: $("#add_departure").val(),
                destination: $("#add_destination").val(),
                description: $("#add_description").val(),
                seat: $("#add_seat").val(),
            }),
            success: function() {
                alert("新增成功");
                $("#add").css("display","none");
                $("#list").css("display","none");
                $("ul").empty();
                get_record();
                clean_records();
            },
            error: function(err) { 
                console.log(err);
                alert("新增失敗");
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
                        <span>[站內]</span>
                        <p>${array["subject"]}</p>
                    </li>`
                )
            } else if (array["type"] == 2) {
                $("ul").append(
                    `<li value="${array["id"]}">
                        <span>[PTT]</span>
                        <p>${array["subject"]}</p>
                    </li>`
                )
            }
        }
    )
    more_imfor()
}

// 列出詳細資訊
function more_imfor() {
    $("li").click(
        function () {
            console.log($(this).val());
            dota = $(this).val() - 1;
            // dota = $(this).val() % 15 - 1;
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
// 清空詳細資訊
function clean_records() {
    $("#add_subject").val("")
    $("#add_departure_date").val("")
    $("#add_departure").val("")
    $("#add_destination").val("")
    $("#add_seat").val("")
    $("#add_description").val("")
}