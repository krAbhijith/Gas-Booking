const PLACE = document.querySelector("#place");
const NUMBER = document.querySelector("#phone");
const NAME = document.querySelector("#cName");
const DISPLAY_TABLE = document.querySelector(".displayTable");
const C_NO_FIELD = document.querySelector("#cId");
const HEAD_BOOKING = document.querySelector('#heading-booking');
const HEAD_LOG = document.querySelector('#heading-log');
const SECTION_RIGHT = document.querySelector('#section-right');
const CONTAINER = document.querySelector('#container');
const FORM_DIV = document.querySelector('#form-div');
const STORE_BTN = document.querySelector('#btn-store');
const ADD_BTN = document.querySelector('#btn-add');

// const PLACES = ['Pazhayannur', 'Vadakkethara', 'Kallepadam', 'Kumbalakode', 'Vennur', 'Thirumani', 'Elanad', 'Thrikanaya'];


if (!localStorage.getItem('consumers')) {
  let consumerArray = [];
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
        consumerArray.push(...data);
        localStorage.setItem('consumers', JSON.stringify(consumerArray));
        location.reload();
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
  });
} else {
  consumerArray = JSON.parse(
    localStorage.getItem('consumers')
  )
  // console.log(consumerArray);
}


function getDateTime() {
  date = new Date();
  format = (time) =>{
    return (time < 10) ? '0' + time : time;
  }
  dateTime = date.getDate() + '-' + (date.getMonth() + 1) + '-' + format(date.getHours()) + '-' + format(date.getMinutes());
  // console.log((dateTime));
  return dateTime;
}



function display(place) {
  HTML = ``;
  // console.log(consumerArray);
  consumerArray.forEach((element) => {
    if (element.id && element.booking == 'True' && element.place == place) {
      HTML += `
        <div class="bill">
        <div class="field">${element.id}</div>
        <div class="field">${element.place}</div>
        <p class="field"> +91 \xa0 ${element.phone}</p>
        <div class="field">${element.name}</div>
        <div class="field"><input type="button" class="btn-done" onclick="removeBooking(${element.id})"></div>
        </div>
      `
    }
  });
  // console.log(HTML);
  CONTAINER.classList.add('active-section-right');
  SECTION_RIGHT.style.display = 'block';
  HEAD_BOOKING.classList.add('active');
  HEAD_LOG.classList.remove('active');
  DISPLAY_TABLE.innerHTML = HTML;
  redirectTo()
}


// function validates phoneNo and consumer number 

function validation(id, phone) {
  var phoneno = /^\d{10}$/;
  var cNo = /^\d{6}$/;
  if (id.match(cNo) && phone.match(phoneno)) {
    // console.log('matced');
    return 1;
  }
}


function validation(id) {
  var cNo = /^\d{6}$/;
  if (id.match(cNo)) {
    // console.log('matced');
    return 1;
  }
}


function validationError() {
  C_NO_FIELD.classList.add('error');
  console.log(C_NO_FIELD.classList);
}


function addBooking(id) {
  if (validation(id)) {
    bill = consumerArray.filter(
      (bill) => parseInt(bill.id) == id
    )
    bill = bill[0];
    if(bill){
      bill.booking = "True";
      saveToLocalStorage();
      display(bill.place);
    }else{
      console.log('no bill');
      validationError();
    }
  }
  C_NO_FIELD.value =  '';
}


function store(id, place, phone, name){
    var valid = validation(id, phone);
    if(valid){
        bill = {
            "id" : id,
            "name" : name,
            "place" : place,
            "phone" : phone,
            "booking": 'True',
            "deliveryDate": ''
        };
        console.log(bill);
        saveToLocalStorage(bill);
    }else{
        console.log('input err');
    }
    FORM_DIV.classList.remove('active');
    STORE_BTN.style.display = 'none';
    ADD_BTN.style.display = 'block';
}


function removeBooking(id) {
  id = JSON.stringify(id)
  if (validation(id)) {
    bill = consumerArray.filter(
      (bill) => parseInt(bill.id) == id
    )
    bill = bill[0];
    bill.booking = "False";
    bill.deliveryDate = getDateTime();
    //console.log(bill);
    saveToLocalStorage();
    display(bill.place);
  }
}



function saveToLocalStorage(bill) {
  //console.log(consumerArray);
  if (bill) {
    // console.log(bill);
    // console.log(consumerArray);
    consumerArray.push(bill);
  }
  localStorage.setItem(
    'consumers',
    JSON.stringify(consumerArray)
  )
}


// function deleteBill(index) {
//     console.log(index);
//     consumerArray.splice(index, 1);
//     saveToLocalStorage();
//     display();
// }

// function checkBill(id) {
//   // console.log(typeof (id));
//   bill = consumerArray.filter(
//     (bill) => parseInt(bill.id) == id
//   )
//   bill = bill[0]
//   if (bill) {
//     NAME.value = bill.name;
//     PLACE.value = bill.place;
//     NUMBER.value = bill.phone;
//     //console.log(bill);
//   }else{
//     console.log('error');
//   }
// }


function todayLog() {
  HTML = ``;
  date = getDateTime().slice(0, 5)
  consumerArray.forEach(bill => {
    deliveryDate = (bill.deliveryDate).slice(0, 5);
    if (deliveryDate == date) {
      deliverytime = (bill.deliveryDate).slice(6, 11);
      HTML += `
        <div class="deliveredBill">
          <div class="field">${bill.id}</div>
          <div class="field">${bill.place}</div>
          <div class="field">${bill.name}</div>
          <div class="field">${deliverytime}</div>
        </div>
      `
    }
  });
  //console.log(HTML);
  CONTAINER.classList.add('active-section-right');
  SECTION_RIGHT.style.display = 'block';
  HEAD_LOG.classList.add('active');
  HEAD_BOOKING.classList.remove('active');
  DISPLAY_TABLE.innerHTML = HTML;
}



// n = 0;
// C_NO_FIELD.onkeypress = (e) => {
//   if (e.key == 'Enter') {
//     switch (n) {
//       case 0:
//         if (validation(C_NO_FIELD.value)) {
//           checkBill(C_NO_FIELD.value);
//         }
//         n++;
//         break;
//       case 1:
//         addBooking(C_NO_FIELD.value);
//         n = 0;
//       default:
//         break;
//     }
//   }
// }

C_NO_FIELD.addEventListener('keypress', (e)=>{
  (e.key == 'Enter') ? addBooking(C_NO_FIELD.value) : 0 ;
})

function redirectTo() {
  document.getElementById('targetDiv').scrollIntoView({behavior : "smooth"});
}

function activeStoreDiv() {
  FORM_DIV.classList.add('active');
  STORE_BTN.style.display = 'block';
  ADD_BTN.style.display = 'none';
}