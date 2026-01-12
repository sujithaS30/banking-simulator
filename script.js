const BASE_URL="http://localhost:8080";

function showSection(id){
    document.querySelectorAll(".section").forEach(sec=> sec.style.display ='none');
    document.getElementById(id).style.display='block';
}

//create account

function createAccount(){
    const data={
        name :document.getElementById("c-name").value,
        email : document.getElementById("c-email").value,
        balance : document.getElementById("c-balance").value
    };

    fetch(BASE_URL+"/accounts/create" , {
        method :"POST",
        headers :{
             "Content-Type" : "application/json"
        },
        body :JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("create-result").innerText="Account is Created and here is your Account Number"+result.accountNumber
    });
}

function deposite() {
    const accNo = document.getElementById("d-acc").value;
    const amount = document.getElementById("d-amount").value;

    fetch(BASE_URL + "/accounts/" + accNo + "/deposite", {
        method: "PUT", // POST kedaiyaathu, PUT thaan correct
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("deposite-result").innerText = "Success! New Balance: " + data.balance;
    })
    .catch(err => {
        document.getElementById("deposite-result").innerText = "Error! Account number check pannunga.";
    });
}

function withdraw(){
    const accNo = document.getElementById("w-acc").value;
    const amount = document.getElementById("w-amount").value;

    fetch(BASE_URL + "/accounts/" + accNo + "/withdraw", {
        method: "PUT",
        headers: {
             "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: parseFloat(amount) })
    })
    .then(res => {
        if(!res.ok) throw new Error("Insufficient Funds");
        return res.json();
    })
    .then(data => {
        document.getElementById("withdraw-result").innerText = "Withdraw Success! New Balance: " + data.balance;
    })
    .catch(err => {
        document.getElementById("withdraw-result").innerText = err.message;
    });
}

function transfer(){
    const data={
        fromAcc : document.getElementById("t-from").value,
        toAcc :document.getElementById("t-to").value,
        amount :document.getElementById("t-amount").value
    }
    fetch(BASE_URL+"/transactions/transfer" , {
        method :"POST",
        headers :{
             "Content-Type" : "application/json"
        },
        body :JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        document.getElementById("transfer-result").innerText=msg;
    });
}

function viewAccount(){
   const acc= document.getElementById("v-acc").value;
   fetch(BASE_URL+"/accounts/"+acc)
   .then(res => res.json())
   .then(data => {
    document.getElementById("view-result").innerText =JSON.stringify(data);
   });
}

function listAccount(){
    fetch(BASE_URL+"/accounts/all")
    .then(res => res.json())
    .then(data => {
        document.getElementById("list-result").innerText = JSON.stringify(data);
    });
}
