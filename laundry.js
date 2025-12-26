let buttons = document.querySelectorAll(".add-btn");
let cart = document.querySelector(".cart-item");
let totalBox = document.getElementById("total-price");
let emptyBox = document.querySelector(".empty");

let total = 0;

buttons.forEach(btn => {
  btn.addEventListener("click", function () {

    let service = this.parentElement;
    let name = service.children[0].innerText;
    let price = Number(service.children[1].innerText.replace("₹", ""));

    if (this.innerText === "Add Item ⊕") {
      // ADD
      let li = document.createElement("li");
      li.innerText = name + " - ₹" + price;
      cart.appendChild(li);

      total += price;
      totalBox.innerText = "₹ " + total;

      this.innerText = "Remove ✕";
      this.style.background = "red";
      this.style.color = "white";

      emptyBox.style.display = "none";
    } 
    else {
      // REMOVE
      let items = cart.querySelectorAll("li");

      items.forEach(item => {
        if (item.innerText.includes(name)) {
          item.remove();
          total -= price;
        }
      });

      totalBox.innerText = "₹ " + total;

      this.innerText = "Add Item ⊕";
      this.style.background = "";
      this.style.color = "";

      if (cart.children.length === 0) {
        emptyBox.style.display = "block";
      }
    }
  });
});

//email

// EMAIL JS INIT
(function () {
  emailjs.init("jbzAVyuRv4Z3HZbqD"); // public key
})();

// BOOK NOW BUTTON
document.querySelector(".book-btn").addEventListener("click", function () {

  let name = document.querySelector('input[placeholder="Full Name"]').value;
  let email = document.querySelector('input[placeholder="Email ID"]').value;
  let phone = document.querySelector('input[placeholder="Phone Number"]').value;

  let cartItems = document.querySelectorAll(".cart-item li");

  if (cartItems.length === 0) {
    alert("Please add at least one service");
    return;
  }

  if (!name || !email || !phone) {
    alert("Please fill all details");
    return;
  }

  // Services list
  let services = [];
  cartItems.forEach(item => {
    services.push(item.innerText);
  });

  let params = {
    customer_name: name,
    customer_email: email,
    phone: phone,
    services: services.join(", "),
    total: total
  };

  emailjs.send(
    "laundrywebsite009900",   // service id
    "template_64z29n2",      // template id
    params
  ).then(
    function () {
      alert(`Booking Successful ✅ Confirmation Email Sent`);

      // RESET
      document.querySelector(".cart-item").innerHTML = "";
      document.querySelector(".empty").style.display = "block";
      total = 0;
      document.getElementById("total-price").innerText = "₹ 0";

      document.querySelectorAll(".add-btn").forEach(btn => {
        btn.innerText = "Add Item ⊕";
        btn.style.background = "";
        btn.style.color = "";
      });

      document.querySelectorAll("input").forEach(i => i.value = "");
    },
    function (error) {
      alert("Email Failed ❌");
      console.log(error);
    }
  );
});

