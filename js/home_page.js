
// 定義 所有共乘資訊 的url
const allRecordURL = "https://carsharing.rayoutstanding.space/api/post?row=100"

// 定義 站內共乘資訊 的url
const record_ptt = "https://carsharing.rayoutstanding.space/api/post?type=2&row=100"

// 定義 登出 的url
const logout = "https://carsharing.rayoutstanding.space/api/logout"

// 定義 新增共乘 的url
const post = "https://carsharing.rayoutstanding.space/api/post"

// get cookie
let cookie = document.cookie.split("=");

// var search_range = $("#search_range").val()
// var search_departure = $("#search_departure").val()

// 一進畫面就先讀取一次第一筆資料
$(document).ready(function(){
    console.log(cookie[1])
    // console.log(cookie)
    getAllRecord();
})


// 抓取 所有共乘資訊
function getAllRecord(){
    // $.ajax({
    // url: allRecordURL,
    // type: 'GET',
    // datatype: 'json',
    // headers: {
    //     Authorization:`Bearer ${cookie[1]}`,
    //     Accept: "application/json; charset=utf-8",
    //     "Content-Type": "application/json; charset=utf-8",
    // },
    // beforeSend: function(){
    //     console.log(this)
    // },
    // success: function(json) { 
    //     // alert("Success");
    //     // console.log(json);
    //     data = json["data"];
    //     type = data[0].type;
    //     // console.log(type);
    //     console.log("我要列出所有資料啦");
    //     recordlist();
    // },
    // error: function(err) { 
    //     console.log(err);
    //     // alert('Failed!'); 
    // },
    // });
    fetch(allRecordURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization:`Bearer ${cookie[1]}`, Accept: "application/json; charset=utf-8", "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response => {
            response = Promise.resolve(response.json());
            response.then(result => {
                data = result.data;
                type = data.type;
                // console.log(data);
                // console.log("我要列出所有資料啦");
                recordlist();
            });
        })
        .catch(err => {
            console.log(err);
            alert('Failed!'); 
        })
}

// 點擊按鈕開始新增共乘
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
// 點擊按鈕開始搜尋共乘
$(".btn-search").click(
    function() {
        $("#search").css("display","block");        
    }
)
$(".btn-warning").click(
    function() {
        $("#search").css("display","none");
        $("ul").html("");
        get_search_record()
    }
)
$(".btn-secondary").click(
    function() {
        $("#search").css("display","none");
        $("#list").css("display","none");
        $("#list_ptt").css("display","none");
    }
)

// 抓取 搜尋條件中的共乘資訊
function get_search_record(){
    var search_range = $("#search_range").val();
    var search_departure = $("#search_departure").val();
    var search_destination = $("#search_destination").val();
    var search_date = $("#search_departure_date").val();
    var search_url = `https://carsharing.rayoutstanding.space/api/post?departure_date=${search_date}&departure=${search_departure}&destination=${search_destination}&type=${search_range}&row=100`
    console.log(search_url);
    $.ajax({
    url: search_url,
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
        data = json["data"];
        type = data[0].type;
        console.log("我要列出ptt資料啦");
        recordlist();
    },
    error: function(err) { 
        console.log(err);
        // alert('Failed!'); 
    },
    });
}

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
                getAllRecord();
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
        function (array, index) {
            // console.log(index)
            // console.log(array)
            if ( array["type"] == 1 ) {
                $("ul").append(
                    `<li value="${index}">
                        <span class="local_data">[站內]</span>
                        <p>${array["subject"]}</p>
                    </li>`
                )
            } else if (array["type"] == 2) {
                $("ul").append(
                    `<li value="${index}">
                        <span class="ptt_data">[PTT]</span>
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
        function (array) {
            // console.log($(this).val());
            // dota = $(this).val() - 1;
            dota = $(this).val();
            // console.log(dota);
            console.log(data[dota].type);
            // console.log(data[$(this).val()].subject);

            if ( data[dota].type == 1 ) {
                $("#list").css("display","block");
                $("#list_subject").val(data[dota].subject)
                $("#list_departure_date").val(data[dota].departure_date)
                $("#list_departure").val(data[dota].departure)
                $("#list_destination").val(data[dota].destination)
                $("#list_seat").val(data[dota].seat)
                $("#list_description").val(data[dota].description)
            } else if (data[dota].type == 2) {
                $("#list_ptt").css("display","block");
                $("#list_ptt_subject").val(data[dota].subject)
                $("#list_ptt_departure_date").val(data[dota].departure_date)
                var ptt_url = document.getElementById("list_ptt_url");
                ptt_url.setAttribute("href",data[dota].ptt_url)
                $("#list_ptt_description").val(data[dota].description)
            }
        }
    )
}
// 清空新增欄位詳細資訊
function clean_records() {
    $("#add_subject").val("")
    $("#add_departure_date").val("")
    $("#add_departure").val("")
    $("#add_destination").val("")
    $("#add_seat").val("")
    $("#add_description").val("")
}