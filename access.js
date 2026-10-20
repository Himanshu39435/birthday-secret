const ACCESS_KEY = "birthday-surprise-unlocked";

if (sessionStorage.getItem(ACCESS_KEY) !== "true") {
  window.location.replace("passcode.html");
}
