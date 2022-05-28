var user = {
  data: [
    // { username: "Mina", Pass: "123", ConfirmPass: "123", "E-mail": "min@com" },
    // { username: "Ehab", Pass: "345", ConfirmPass: "345", "E-mail": "hoba@com" },
  ],
};
if (localStorage.getItem("user") !== null) {
} else {
  localStorage.setItem("user", JSON.stringify(user));
}

function signIn() {
  var nam = document.getElementById("user").value;
  var pwwd = document.getElementById("pass").value;
  var user_data = JSON.parse(localStorage.getItem("user"));
  var check = 0;
  for (x in user_data.data) {
    if (user_data.data[x].username == nam && user_data.data[x].Pass == pwwd) {
      check++;
      alert("You have an account");
      alert("Hello" + user_data.data[x].username);
      //Go to home page
      window.open("full.html");
    }
  }
  if (check == 0) {
    alert("go to create an account");
  }
}


function signUp() {
  var uname = document.getElementById("user1").value;
  var pwd = document.getElementById("pass1").value;
  var rpwd = document.getElementById("pass2").value;
  var email = document.getElementById("emal").value;
  var user_data = JSON.parse(localStorage.getItem("user"));

  var check = 0;
  for (x in user_data.data) {
    if (user_data.data[x].username == uname && user_data.data[x].Pass == pwd) {
      check++;
      alert("You already have an account");
    }
  }
  if (check == 0) {
    user_data.data.push({
        username: uname,
        Pass: pwd,
        ConfirmPass: rpwd,
        "E-mail": email,
    });
    alert("Account Created Successfully");
  }
  localStorage.setItem("user", JSON.stringify(user_data));
}

function validpass() {
  var pswd = document.getElementById("pass1").value;
  var rpsw = document.getElementById("pass2").value;
  var sp = document.getElementById("spass");
  if (pswd == rpsw) {
    sp.innerHTML = "Passwords are identical ";
  } else {
    sp.innerHTML = "passwords not identical";
  }
}


function valid() {
  var str = document.getElementById("emal").value;
  var patemail = /^[^\s]([a-zA-Z0-9]+)@([a-zA-Z]+)(com|edu|net|org)(\.eg)$/g;
  var spac = document.getElementById("spa1");
  if (str.match(patemail)) {
    spac.innerHTML = " ";
  } else {
    spac.innerHTML = "Invalid E-mail";
  }
}


function val() {
  var str = document.getElementById("user1").value;
  var spac = document.getElementById("va");
  var patname = /^[^\s]([a-zA-Z]+){3,18}[^\s]$/g;
  //var patname = /^[^\s]([a-zA-Z]+){3}\s([a-zA-Z]+){3}\s([a-zA-Z]+){3}[^\s]$/g
  if (str.match(patname)) {
    spac.innerHTML = " ";
  } else {
    spac.innerHTML = "Invalid Name ";
  }
}

