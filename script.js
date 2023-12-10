let city = ['غزة', 'القاهرة', 'مكة المكرمة', 'الرباط', 'الكويت'], selectCity = document.querySelector('select');
for(op of city){
    selectCity.innerHTML += `
        <option>${op}</option>
    `;
}
selectCity.onchange = () => {
    let val = selectCity.value;
    document.querySelector('.head h1').innerHTML = val;
    if(val == 'غزة'){
        changeTimes('ps', 'gaza');
    }
    else if(val == 'القاهرة'){
        changeTimes('eg', 'cairo');
    }
    else if(val == 'مكة المكرمة'){
        changeTimes('sa', 'makkah al-mukarramah');
    }
    else if(val == 'الرباط'){
        changeTimes('ma', 'rabat');
    }
    else if(val == 'الكويت'){
        changeTimes('kw', 'kuwait');
    }
}

function changeTimes(countryName, cityName){
    let params = {
        country: countryName,
        city: cityName
    };
    function GetTimes(){
        let req = new XMLHttpRequest();
        req.open('Get', `http://api.aladhan.com/v1/timingsByCity/:date?country=${params.country}&city=${params.city}`);
        req.responseType = 'json';
        req.send();
        req.onload = () =>{
            if(req.status >= 200 && req.status < 300){
                let res = req.response.data, times = res.timings, date = res.date.hijri;
            
                document.querySelector('.head span').innerHTML = `${date.weekday.ar} ${date.day} ${date.month.ar} 
                    ${date.year}`;
        
                document.querySelector('#fajr').innerHTML = times.Fajr;
                document.querySelector('#shroq').innerHTML = times.Sunrise;
                document.querySelector('#zohr').innerHTML = times.Dhuhr;
                document.querySelector('#aser').innerHTML = times.Asr;
                document.querySelector('#maghrib').innerHTML = times.Maghrib;
                document.querySelector('#isha').innerHTML = times.Isha;
            }
            else{
                alert('Connection Error');
            }
        }
    }
    GetTimes();
}