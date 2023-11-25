const PLACE = document.querySelector("#place");
const NUMBER = document.querySelector("#phone");
const NAME = document.querySelector("#cName");
const DISPLAY_TABLE = document.querySelector(".displayTable");
const C_NO_FIELD = document.querySelector("#cId");
const HEAD_BOOKING = document.querySelector('#heading-booking');
const HEAD_LOG = document.querySelector('#heading-log');




function getDateTime() {
  date = new Date();
  dateTime = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getHours() + '-' + date.getMinutes();
  // console.log((dateTime));
  return dateTime;
}


if (!localStorage.getItem('consumers')) {
  let consumerArray = [
    {
      "id": 123456,
      "name": "Random Name 1",
      "place": "Place A",
      "phone": "1234567890",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 654321,
      "name": "Random Name 2",
      "place": "Place B",
      "phone": "9876543210",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 111111,
      "name": "Random Name 3",
      "place": "Place C",
      "phone": "5555555555",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 222222,
      "name": "Random Name 4",
      "place": "Place D",
      "phone": "1112223333",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 333333,
      "name": "Random Name 5",
      "place": "Place A",
      "phone": "4445556666",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 444444,
      "name": "Random Name 6",
      "place": "Place B",
      "phone": "7778889999",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 555555,
      "name": "Random Name 7",
      "place": "Place C",
      "phone": "3337779999",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 666666,
      "name": "Random Name 8",
      "place": "Place D",
      "phone": "8888888888",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 777777,
      "name": "Random Name 9",
      "place": "Place A",
      "phone": "6667778888",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 888888,
      "name": "Random Name 10",
      "place": "Place B",
      "phone": "4444444444",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 999999,
      "name": "Random Name 11",
      "place": "Place C",
      "phone": "9999999999",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 101010,
      "name": "Random Name 12",
      "place": "Place D",
      "phone": "2223334444",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 121212,
      "name": "Random Name 13",
      "place": "Place A",
      "phone": "5556667777",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 131313,
      "name": "Random Name 14",
      "place": "Place B",
      "phone": "3333333333",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 141414,
      "name": "Random Name 15",
      "place": "Place C",
      "phone": "7777777777",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 151515,
      "name": "Random Name 16",
      "place": "Place D",
      "phone": "1111111111",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 161616,
      "name": "Random Name 17",
      "place": "Place A",
      "phone": "8889990000",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 171717,
      "name": "Random Name 18",
      "place": "Place B",
      "phone": "6666666666",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 181818,
      "name": "Random Name 19",
      "place": "Place C",
      "phone": "2222222222",
      "booking": "True",
      "deliveryDate": ""
    },
    {
      "id": 191919,
      "name": "Random Name 20",
      "place": "Place D",
      "phone": "9998887777",
      "booking": "True",
      "deliveryDate": ""

    }
  ]
  localStorage.setItem(
    'consumers',
    JSON.stringify(consumerArray)
  )
  location.reload();
  display();
} else {
  consumerArray = JSON.parse(
    localStorage.getItem('consumers')
  )
  // console.log(consumerArray);
  display();
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



function display() {
  HTML = ``;
  // console.log(consumerArray);
  consumerArray.forEach((element) => {
    if (element.id && element.booking == 'True') {
      HTML += `
                <div class="bill">
                    <div class="field">${element.id}</div>
                    <div class="field">${element.place}</div>
                    <div class="field">${element.phone}</div>
                    <div class="field">${element.name}</div>
                    <div class="field"><input type="button" value="O"" onclick="removeBooking(${element.id})"></div>
                </div>
      `
    }
  });
  // console.log(HTML);
  HEAD_BOOKING.classList.add('active');
  HEAD_LOG.classList.remove('active');
  DISPLAY_TABLE.innerHTML = HTML;
}


function addBooking(id) {
  if (validation(id)) {
    bill = consumerArray.filter(
      (bill) => parseInt(bill.id) == id
    )
    bill = bill[0];
    bill.booking = "True";
    saveToLocalStorage();
    display();
  }

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
    display();
  }
}

// function store(id, place, phone, name){
//     var valid = validation(id, phone);
//     if(valid){
//         bill = {
//             "id" : id,
//             "place" : place,
//             "phone" : phone,
//             "name" : name
//         };
//         saveToLocalStorage(bill);
//     }else{
//         console.log('input err');
//     }
//     display();
// }


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

function checkBill(id) {
  // console.log(typeof (id));
  bill = consumerArray.filter(
    (bill) => parseInt(bill.id) == id
  )
  bill = bill[0]
  if (bill) {
    NAME.value = bill.name;
    PLACE.value = bill.place;
    NUMBER.value = bill.phone;
    //console.log(bill);
  }
}


function todayLog() {
  HTML = ``;
  date = getDateTime().slice(0, 5)
  consumerArray.forEach(bill => {
    deliveryDate = (bill.deliveryDate).slice(0, 5);
    if (deliveryDate == date) {
      HTML += `
        <div class="bill">
          <div class="field">${bill.id}</div>
          <div class="field">${bill.place}</div>
          <div class="field">${bill.name}</div>
        </div>
      `
    }
  });
  //console.log(HTML);
  HEAD_LOG.classList.add('active');
  HEAD_BOOKING.classList.remove('active');
  DISPLAY_TABLE.innerHTML = HTML;
}



n = 0;
C_NO_FIELD.onkeypress = (e) => {
  if (e.key == 'Enter') {
    switch (n) {
      case 0:
        if (validation(C_NO_FIELD.value)) {
          checkBill(C_NO_FIELD.value);
        }
        n++;
        break;
      case 1:
        addBooking(C_NO_FIELD.value);
        n = 0;
      default:
        break;
    }
  }
}




