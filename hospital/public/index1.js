
//Register function

var firebaseConfig = {
    apiKey: "AIzaSyDioYAzvJooHpspr8Z58bImI0s2jaIRU90",
    authDomain: "testlogin-c11b6.firebaseapp.com",
    projectId: "testlogin-c11b6",
    storageBucket: "testlogin-c11b6.appspot.com",
    messagingSenderId: "598921663451",
    appId: "1:598921663451:web:8bc05bbb07d312f1650dfe",
    measurementId: "G-4N0GNYZQ8J"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()
//Phân quyền


function login(){

email = document.getElementById('email').value 
password = document.getElementById('password').value


if (valid_email(email) == false || valid_password == false){
    alert('Email or Password is not valid')
    return
}

auth.signInWithEmailAndPassword(email, password)
.then( function(){
    database.ref('Register').orderByChild('email').equalTo(email).once('value')
    .then((snapshot) => {
    
        snapshot.forEach((childSnapshot) => {
            userID = childSnapshot.val().phone_number
            
            var database_ref = database.ref()
        
            var user_data = {
                last_login : Date.now()
            }
            database_ref.child('Login/' + userID).update(user_data)
            alert('user logged in!')
            window.location.href = "index1.html";
        })
    })
   
}


)
}
function submit(){
  
    fullName = document.getElementById('full_name21').value
    gender = document.getElementById('gender').value
    age = document.getElementById('age').value
    phoneNumber = document.getElementById('number').value
    address = document.getElementById('address').value
    bhyt = document.getElementById('bhyt').value
    khoa = document.getElementById('khoa').value 
    var data = {
        full_name: fullName,
        gender: gender,
        age: age,
        phone_number: phoneNumber,
        address: address,
    }
    firebase.database().ref('Appointment/' + firebase.auth().currentUser.uid).update(data)
    .then(()=>{
        alert('Du lieu updated')
    }

    )
}
function valid_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }

function valid_password(password) {
    
    // Firebase only accepts lengths greater than 6
    if (password.length < 6) {
      return false
    } else {
      return true
    }
  }
function valid_name(name){
    if (name == null){
        return false
    }
    if (name.length <= 0){
        return false
    } else {
        return true
    }
}


function addPatient(){
    fullName = document.getElementById('patient_name').value
    phoneNumber = document.getElementById('phonenumberpat').value

    var data = {
        Ho_va_ten : fullName,
        SDT : phoneNumber
    }
    firebase.database().ref('patientList/' + phoneNumber).set(data)
    .then(()=>{
        alert('Them benh nhan thanh cong')
    }
    )
}
//+ firebase.auth().currentUser.uid
function searchPatient(){
    searchInput = document.getElementById('searchInput').value;
    patientListRef = database.ref('patientList');

    database.ref('patientList').orderByChild('SDT').equalTo(searchInput).once('value')
      .then((snapshot) => {
        const patients = snapshot.val();
        if (patients) {
            //xóa thông tin của bệnh nhân trước đó 
            const patientInfoDiv = document.getElementById('patientInfo');
            patientInfoDiv.innerHTML = ''; // Xóa nội dung của phần tử

            //tìm kiếm từng bệnh nhân
            snapshot.forEach((childSnapshot) => {
                const patient = childSnapshot.val(); 
                const patientInfoDiv = document.getElementById('patientInfo');
                const patientDiv = document.createElement('div');
                patientDiv.innerHTML = `<p>Tên: ${patient.Ho_va_ten}</p>
                                         <p>SDT: ${patient.SDT}</p>`;
                patientInfoDiv.appendChild(patientDiv);
                
                const editButton = document.createElement('button');
                editButton.textContent = 'Chỉnh sửa';
                editButton.addEventListener('click',()=>{
                    editPatientInfo(childSnapshot.key, patient.Ho_va_ten, patient.SDT) 
                }
                
                )
                patientInfoDiv.appendChild(editButton);
            });
          
       
          console.log("Bệnh nhân được tìm thấy:");
         
          console.log(patients);
        } 
        else {
          console.log("Không tìm thấy bệnh nhân có tên là");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm bệnh nhân:", error);
      });
  
};
function editPatientInfo(patientID, name,phone){
    const newName = prompt("Nhập tên", name)
    const newSDT = prompt("Nhập sđt", phone)

    if(newName !== null && newSDT !== null){
 
        database.ref('patientList/' + patientID).update({
            Ho_va_ten: newName,
            SDT: newSDT
        })
        .then(()=>{
            alert('cap nhat thanh cong')
        }
        ) .catch((error) => {
            console.error("kooix",error)
        })
    }
}


   
//    document.addEventListener('DOMContentLoaded', function() {
//        checkLoginStatus();
//    });

// function checkLoginStatus() {
//        firebase.auth().onAuthStateChanged(function(user) {
//    if (user) {
       
//        console.log("User is signed in.");
       
//    } else {
       
//        console.log("No user is signed in.");

//    }
//     });
       
       
//    }
 function logout(){
     firebase.auth().signOut().then(function(){
         console.log("User signed out")
     }).catch(function(error){
         console.error("Error signing out", error)
})
 }

