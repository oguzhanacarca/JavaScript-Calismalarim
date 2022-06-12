const space = ""; // girilen input boş ise hata verilecek değilse success.
const test = /^''$/.test(space); // multiplication space kullanımını engellemek için
const liveToastBtn = document.querySelector("#liveToastBtn"); // Ekle butonunu js de bir değişkene atadık ve bu değişkene bazı tanımlamalar yapacağız
const inputTask = document.querySelector("#inputTask"); // inputTask değişkeni Bugün ne yapacaksın değerini alıyor
const toDoList = document.querySelector("#toDoList"); // toDoList değişkeni bu listeye erişiyor
liveToastBtn.addEventListener("click", clickDegiskeni); // clickDegiskeni diye bir değişkeni ifade ettik. click işleminde bu değişkeni çağırıcaz


let taskArray = []; // localStorage için bir array oluşturduk.

//clickDegiskeni = bu değişkenin işlevi: click event'ı yapıldığında ne tür bir fonksiyon çalışacağıdır.
function clickDegiskeni() {
  if (inputTask.value && !(inputTask.value == test)) {
    taskArray.push(inputTask.value); // inputTask değişkeni boş değilse taskArray'e push ediyoruz.
    localStorage.setItem("toDoList", JSON.stringify(taskArray)); // localStorage'a taskArray'i string olarak atıyoruz.
    $(".success").toast("show");
    let liEkle = document.createElement("li"); // addNewToDo değişkeni bir Li elemanı yaratsın dedik.
    liEkle.innerHTML = inputTask.value; // addNewToDo değişkeni inputa girilen değere eşit olacak
    let closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.textContent = "x";
    liEkle.append(closeButton);
    closeButton.onclick = removeButton;
    toDoList.appendChild(liEkle); // toDoList'in en sonuna üstteki kodu append et dedik. Eğer yeni eklenen bilgi üste gelsin istiyorsan prepend yazmamız lazım
    liEkle.onclick = check;
  } else {
    // değilse aşağıdaki işlemleri yapacak
    $(".error").toast("show");
  }
  inputTask.value = ""; // burada üstteki işlemleri yaptıktan sonra kullanıcıdan veri alcağımız kısmı boşalttık.
}

function check() {
  this.classList.toggle("checked"); // css'deki toDoList'imizi check etme olayını kullanıyoruz
}

function removeButton() {    
    taskArray.pop(this.parentElement.remove()+1); // maddeyi silmek için parentElement.remove classını kullandık.
    localStorage.setItem("toDoList", JSON.stringify(taskArray)); // silinen gitsin ve eskisi kalsın.
    $(".delete").toast("show"); // maddeyi silmek için X e tıklarsan bildirim çıkacak ekranda
}

// ben ek olarak görevi bitirdiğinde tebrik mesajı ile bunun zamanını belirttim
// html dosyası üzerinde yeni bir toast header yarattım bunun için inceleyebilirsiniz.
function showTime() {
  let date = new Date();
  let saniye = date.getSeconds();
  let dakika = date.getMinutes();
  let saat = date.getHours();
  setTimeout(showTime, 1000);
  let info = ` ${saat.toString().padStart(2, "0")}:${dakika
    .toString()
    .padStart(2, "0")}:${saniye
    .toString()
    .padStart(2, "0")} ${new Date().toLocaleString("tr-tr", {
    weekday: "long",
  })}&nbsp&nbsp`;
  let tarih = document.querySelector("#myClock");
  tarih.innerHTML = `${info}`;
} showTime();

/** LocalStorage'a eklenen verileri listeleme işlemi
 *  Verileri aldık taskArray'e gönderdik ve en son getLocalStorage fonksiyonunu çağırdık ki ekledikleriiz ekranda görünsün */
function getLocalStorage() {
  (localStorage.getItem("toDoList")) ? 
  taskArray = JSON.parse(localStorage.getItem("toDoList")) : taskArray = [];
  taskArray.forEach(function(element) {
    let liEkle = document.createElement("li");
    liEkle.innerHTML = element;
    let closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.textContent = "x";
    liEkle.append(closeButton);
    closeButton.onclick = removeButton;
    toDoList.appendChild(liEkle);
    liEkle.onclick = check;
  })} getLocalStorage();