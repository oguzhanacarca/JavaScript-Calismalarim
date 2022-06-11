// prompt'tan aldığımız ismi bastırma kısmı

let getName = prompt("Adınız giriniz.")
let myName = document.querySelector("#myName")


// geçerli isim mi değil mi onu kontrol etmek istiyorsak
if(getName.length > 1) {
    myName.innerHTML = `${getName}`
} else {
    alert ("Geçerli bir isim giriniz.")

}

// Saati yapalım .getHours

function showTime() {
    let date = new Date() 
    let saniye = date.getSeconds()
    let dakika = date.getMinutes()
    let saat = date.getHours()
    setTimeout(showTime, 1000)
    
    
    let info = ` ${saat.toString().padStart(2, '0')}:${dakika.toString().padStart(2, '0')}:${saniye.toString().padStart(2, '0')} ${new Date().toLocaleString('tr-tr', {  weekday: 'long' })}`
    let tarih = document.querySelector("#myClock")
    tarih.innerHTML = `${info}`
}

showTime();