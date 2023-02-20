    $(document).ready(function() {
        var second = 00;
        var m_sec = 00;
        var appendMin = document.querySelector("span.min");
        var appendSec = document.querySelector("span.sec");
        var buttonStart = document.querySelector("button.start");
        var buttonStop = document.querySelector("button.stop");
        var buttonReset = document.querySelector("button.reset");
        var startInterval;
        buttonStart.addEventListener("click", function() {
            clearInterval(startInterval);
            startInterval = setInterval(start, 10);
        })
        buttonStop.addEventListener("click", function() {
            clearInterval(startInterval);
        })
        buttonReset.addEventListener("click", function() {
            clearInterval(startInterval);
            second = "00";
            m_sec = "00";
            appendMin.innerHTML = second;
            appendSec.innerHTML = m_sec;
        })

        function start() {
            m_sec++;
            if (m_sec <= 9) {
                appendSec.innerHTML = `0${m_sec}`;
            } else {
                appendSec.innerHTML = m_sec;
            }
            if (m_sec > 99) {
                second++;
                appendMin.innerHTML = `0${second}`;
                m_sec = 00;
                appendSec.innerHTML = `0${m_sec}`;
            }
            if (second > 9) {
                appendMin.innerHTML = second;
            }
        }
        // for time
        function time() {
            let date = new Date();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            let session = " AM"
            let appendTime = document.querySelector(".time");
            let appendDate = document.querySelector(".date");
            let appendDays = document.querySelector(".day");
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
            if (hour > 12) {
                hour = hour - 12;
                session = " PM"
            }
            appendTime.innerHTML = (hour > 9 ? hour : "0" + hour) + ":" + (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec) + session;
            appendDate.innerHTML = (`${day}/${month>9?month:"0"+month}/${year}`);
            appendDays.innerHTML = days[date.getDay()];
        }
        setInterval(() => {
            time();
        }, 1000);

        getWeather();

        // function getLocation() {
        //     $.get("https://ipapi.co/json", function(data) {
        //         getWeather(data.city);
        //     });
        // }
        let hehe = "hehe"

        function getWeather() {
            function convertion(val) {
                return (val - 273).toFixed(1);
            }
            var api =
                "http://api.openweathermap.org/data/2.5/weather?q=";
            var appid = "&APPID=061f24cf3cde2f60644a8240302983f2";
            var $http = api + "panchkula" + appid;
            $.getJSON($http, function(data) {
                temp = data.main.temp;
                console.log(data);
                $(".temp").html(convertion(temp) + "C");
            });
        }
        var city;
        var location = (position) => {
            var { latitude, longitude } = position.coords;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c19597d952e44ff8a99469d3a4774495`).then(responce => responce.json()).then(data => data.results[0].components.state_district);
        };
        console.log(city);
        // navigator.geolocation.getCurrentPosition(location);
    })