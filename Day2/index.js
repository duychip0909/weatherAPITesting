const xhr = new XMLHttpRequest();
const provinceList = document.getElementById("pList");
const districtList = document.getElementById("districtList");
const districtInput = document.querySelector('input[name="districtList"]');
const wardList = document.getElementById("wardList");
const districts = {};
const wards = {};

xhr.open("GET", "https://provinces.open-api.vn/api/?depth=3");

xhr.onreadystatechange = function getList() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log("Request success!");
            let listObject = JSON.parse(xhr.responseText);
            console.log(listObject);
            for (let i in listObject) {
                const city = listObject[i];

                districts[city.code] = city.districts;
                for (let j in listObject[i].districts) {
                    const district = listObject[i].districts[j];
                    wards[district.code] = district.wards
                }
            }

            buildCityDropdown(listObject);
            document.querySelector('input[name="city"]').addEventListener('click', function (e) {
                e.currentTarget.value = '';  
                document.querySelector('input[name="districtList"]').value = '';
                document.querySelector('input[name="wardList"]').value = '';
            })
        } else {
            console.log("Request fails!");
        }
    }
};
xhr.send();

function buildCityDropdown(cities) {
    provinceList.innerHTML = cities.map((city) => `
        <option data-city="${city.code}" value="${city.name}">${city.name}</option>
    `);
}

function buildDistricts(districts) {
    districtList.innerHTML = districts.map((district) => `
        <option data-code="${district.code}" value="${(district.name)}">
            ${(district.name)}
        </option>
    `);
}

function buildWardsDropdown(wards) {
    document.querySelector('#wardList').innerHTML = wards
        .map((ward) => `<option value="${(ward.name)}">${(ward.name)}</option>`);
}

// function getData() {
//     console.log("hello")
//     let detailAddress = document.getElementById("detailAddress").value;
//     let city = document.querySelector('input[name="pList"]').value;
//     let district = document.querySelector('input[name="districtList"]').value;
//     let ward = document.querySelector('input[name="wardList"]').value;
//     if (city == "" || district == "" || ward == "") {
//         alert('bạn chưa nhập đủ thông tin')
//     } else {
//         document.getElementById("address").innerHTML = city + ',';
//     }
//     document.getElementById("detailAddress-res").innerHTML = detailAddress + ',';
//     document.getElementById("district").innerHTML = district + ',';
//     document.getElementById("ward").innerHTML = ward + '.';
// }


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('input[name="city"]').addEventListener('change', function (e) {
        var value = e.currentTarget.value;
        var selectedCode = document.querySelector(`#pList option[value="${value}"]`).dataset.city;
        console.log(selectedCode)
        districtList.innerHTML = '';
        districtInput.value = '';

        if (districts[selectedCode]) {
            buildDistricts(districts[selectedCode]);
        }
    });

    districtInput.addEventListener('change', function (e) {
        var value = e.currentTarget.value;
        var selectedCode = document.querySelector(`#districtList option[value="${value}"]`).dataset.code;

        console.log(wards[selectedCode]);

        if (wards[selectedCode]) {
            buildWardsDropdown(wards[selectedCode]);
        }
    });
});