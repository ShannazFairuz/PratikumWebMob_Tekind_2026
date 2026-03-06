
let kodeShift = Number(prompt("Masukkan kode shift (1=Pagi, 2=Siang, 3=Malam)"));

switch (kodeShift) {
    case 1:
        console.log("Shift Anda adalah Pagi");
        break;
    case 2:
        console.log("Shift Anda adalah Siang");
        break;
    case 3:
        console.log("Shift Anda adalah Malam");
        break;
    default:
        console.log("Shift Tidak Valid");
}