let aloitaNappi=document.getElementById("aloitaNappi");
aloitaNappi.addEventListener("click", startGame);

let pelaaUudelleenNappi=document.getElementById("pelaaUudelleen");
pelaaUudelleenNappi.addEventListener("click", restartGame);

let muteNappi=document.getElementById("muteButton");
muteNappi.addEventListener("click", muteGame);

function restartGame(){
  location.reload();
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {  //funktio pyöristetyille suorakulmioille
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
}

class Sound {   // musiikki peliin
  constructor(
    src
  )
  {
    this.src=src
    this.sound=document.createElement("audio");
    this.sound.src=src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display="none";
    document.body.appendChild(this.sound);
  
    this.play=function(){
      this.sound.play();
    }
    this.stop=function(){
      this.sound.pause();
    }
  }
}
let aanet="true";
let taustaMusiikki;
let gameOn=false;
let endingScreenOn=false;

if (localStorage.getItem("aanet")!==null){
aanet=localStorage.getItem("aanet");
}

taustaMusiikki=new Sound("./sounds/tavernaBiisi.mp3");  //tiedosto taustamusiikille
sivunKaanto=new Sound("./sounds/sivunKaanto.mp3");

if(aanet=="true"){
  muteNappi.src="./images/unMute.png";
}
else if(aanet=="false"){
  muteNappi.src="./images/mute.png";
}

function muteGame(){  // mute-napin toiminnallisuus
  if (gameOn==true){

  if(aanet=="true"){
    aanet="false";
    taustaMusiikki.stop();
    taustaMusiikki.sound.volume=0.0;
    sivunKaanto.sound.volume=0.0;
    muteNappi.src="./images/mute.png";
    localStorage.aanet="false";
  }
  else if(aanet=="false" && endingScreenOn!=true){
    aanet="true";
    taustaMusiikki.sound.volume=0.1;
    sivunKaanto.sound.volume=0.1;
    taustaMusiikki.play();
    muteNappi.src="./images/unMute.png";
    localStorage.aanet="true";
  }
}
  else if (gameOn==false){
    if(aanet=="true"){
    aanet="false";
    muteNappi.src="./images/mute.png";
    localStorage.aanet="false";
    }
    else if(aanet=="false"){
    aanet="true";
    muteNappi.src="./images/unMute.png";
    localStorage.aanet="true";
    }
  }
}

const canvas = document.getElementById("canvas1"); //canvas html-dokumentista
const ctx = canvas.getContext("2d"); // luodaan muuttuja ctx joka mahdollistaa canvaksen käsittelyn

const canvas2=document.getElementById("animationLayer");
const ctx2=canvas2.getContext("2d");

let alkuruutu=new Image();
alkuruutu.src="images/Alkuruutu.png"
ctx.drawImage(alkuruutu, 0, 0);

const kuvat = [];
const korttiKuvat = [];
const taustaKuvat = [];

// kuvat ja taustakuvat korteille
kuvat[0]  = { kuva: "images/kesa.png", tkuva: "images/ranta2.png" };
kuvat[1]  = { kuva: "images/kristallipallo.png", tkuva: "images/kyla.png" };
kuvat[2]  = { kuva: "images/saintyon.png", tkuva: "images/ranta2.png" };
kuvat[3]  = { kuva: "images/hamburger.png", tkuva: "images/ranta2.png" };
kuvat[4]  = { kuva: "images/raha.png", tkuva: "images/ranta2.png" };
kuvat[5]  = { kuva: "images/kristallipallo2.png", tkuva: "images/ranta2.png" };
kuvat[6]  = { kuva: "images/peli.png", tkuva: "images/ranta2.png" };
kuvat[7]  = { kuva: "images/sosiaalisuuskuva.png", tkuva: "images/ranta2.png" };
kuvat[8]  = { kuva: "images/opiskelu.png", tkuva: "images/kyla.png" };
kuvat[9]  = { kuva: "images/ateria.png", tkuva: "images/kyla.png" };
kuvat[10] = { kuva: "images/ranta3.png", tkuva: "images/kyla.png" };
kuvat[11] = { kuva: "images/viini.png", tkuva: "images/kyla.png" };
kuvat[12] = { kuva: "images/uinti.png", tkuva: "images/kyla.png" };
kuvat[13] = { kuva: "images/neulat.png", tkuva: "images/kyla.png" };
kuvat[14] = { kuva: "images/ruiskut.png", tkuva: "images/kyla.png" };
kuvat[15] = { kuva: "images/outo.png", tkuva: "images/kyla.png" };
kuvat[16] = { kuva: "images/lavistys.png", tkuva: "images/kyla.png" };
kuvat[17] = { kuva: "images/chillaus.png", tkuva: "images/kyla.png" };
kuvat[18] = { kuva: "images/chillaus.png", tkuva: "images/kyla.png" };
kuvat[19] = { kuva: "images/chillaus.png", tkuva: "images/kyla.png" };
kuvat[20] = { kuva: "images/sydan.png", tkuva: "images/kyla.png" };
kuvat[21] = { kuva: "images/sosiaalisuuskuva.png", tkuva: "images/kyla.png" };
kuvat[22] = { kuva: "images/pokaali.png", tkuva: "images/kyla.png" };

for (let i = 0; i < kuvat.length; i++) {
  korttiKuvat[i] = new Image();
  taustaKuvat[i] = new Image();
  korttiKuvat[i].src = kuvat[i].kuva;
  taustaKuvat[i].src = kuvat[i].tkuva;
}

let avustajaKuva=new Image();
avustajaKuva.src="./images/doggo.png"

function Peli() {
  // funktio joka pitää sisällään itse pelin

  let x = canvas.width / 2; // ruudun keskipiste vaakasuunnassa
  let y = canvas.height / 2; // ruudun keskipiste pystysuunnassa
  
  ctx.drawImage(taustaKuvat[0], 0, 0);

  let pisteet = 0; // aluksi 0
  let sosiaalisuus = 50; // aluksi 50?
  let elkut = 100; //  aluksi 100?
  let rahat = 150;
  let vuoro = 1;
  let vasen = true;

  gameOn=true;

  if(aanet=="true"){
    taustaMusiikki.play();
    taustaMusiikki.sound.volume=0.1;
    sivunKaanto.sound.volume=0.1;
  }
  else if(aanet=="false"){
    taustaMusiikki.sound.volume=0.0;
    sivunKaanto.sound.volume=0.0;
  }
  let gainPoints=false;
  let gainSocial=false;
  let gainHealth=false;
  let gainMoney=false;

  let losePoints=false;
  let loseSocial=false;
  let loseHealth=false;
  let loseMoney=false;

  let index = 0; // kortin id joka määrittää pelissä olevan kortin, aloitetaan kortista 0 koska js logiikka
  let yes = false; //alustetaan muuttuja yes

  ctx.font = "20px Century-Gothic"; // fontin valinta

  let kylla = document.getElementById("kylla"); //kyllä nappi html dokumentista
  let ei = document.getElementById("ei"); //ei nappi
  let valinta = document.getElementById("valinta");
  kylla.addEventListener("click", yesButtonClicked); //eventlistener napeille
  ei.addEventListener("click", noButtonClicked);
  valinta.addEventListener("click", valintaButtonClicked);

  kylla.style.display="inline";

  function drawScore() {
    // piirtää pisteet
    if (losePoints==true){
      ctx.fillStyle="red";
    }
    if (gainPoints==true){
      ctx.fillStyle="lightgreen";
    }
    else if (gainPoints==false && losePoints==false){
      ctx.fillStyle="white";
    }
    ctx.fillText(`Pisteet: ${pisteet}`, 220, 50); // kirjoitetaan teksti
    gainPoints=false;
    losePoints=false;
  }

  function drawSocial() {
    //piirtää sosiaaliset pisteet
    ctx.fillStyle = "white";
    if (loseSocial==true){
      ctx.fillStyle="crimson";
    }
    if (gainSocial==true){
      ctx.fillStyle="lightgreen";
    }
    ctx.fillText(`Sosiaalisuus: ${sosiaalisuus}`, canvas.width - 675, 50);
    gainSocial=false;
    loseSocial=false;   
  }

  function drawLife() {
    // piirtää elkut
    ctx.fillStyle = "white";
    if (loseHealth==true){
      ctx.fillStyle="crimson";
    }
    if (gainHealth==true){
      ctx.fillStyle="lightgreen";
    }
    ctx.fillText(`Elkut: ${elkut}`, canvas.width - 475, 50);
    gainHealth=false;
    loseHealth=false;
  }

  function drawMoney() {
    // piirtää rahat
    ctx.fillStyle = "white";
    if (loseMoney==true){
      ctx.fillStyle="red";
    }
    if(gainMoney==true){
      ctx.fillStyle="lightgreen";
    }
    ctx.fillText(`Rahat: ${rahat}`, canvas.width - 350, 50);
    gainMoney=false;
    loseMoney=false;
  }

  function drawTurn() {
    // piirtää vuoron
    ctx.fillStyle = "white";
    ctx.fillText(`Vuoro: ${vuoro}`, canvas.width - 100, 25);
  }

  function drawUI() {
    ctx.shadowColor = "black";
    ctx.shadowBlur = 15;
  
    ctx.beginPath();
    ctx.moveTo(150, 0); //siirretään "kynää"
    // ctx.lineTo(200, 68);
    ctx.arcTo(200, 75, 230, 75, 20);
    // ctx.lineTo(212, 75); //piirretään viivoja
    // ctx.lineTo(782, 75);

    ctx.arcTo(832, 75, 862, 20, 20);
    ctx.lineTo(874, 0);
    ctx.fillStyle = "#39a0ca";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.shadowBlur=0;
  }

  function draw() {
    // funktio piirtämiselle, kaikki osat määritellään erikseen omina funktioinaan, alin päällimmäisenä
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawCard();
    drawUI();
    drawLife();
    drawSocial();
    drawScore();
    drawMoney();
    drawTurn();
  }

  function addPoints(luku) {
    // lisää pisteitä, ei rajaa? Parametrin lukuarvo korttilistasta
    pisteet += luku;
    gainPoints=true;
    animationArray[0]=1;
    
    callAnimation();
  }

  function reducePoints(luku) {
    // vähentää pisteitä, minimipisteet 0?
    pisteet -= luku;
    if (pisteet < 0) {
      // jos pisteet menevät negatiiviseksi, pisteet = 0
      pisteet = 0;
    }

    losePoints=true;
    animationArray[1]=1;
    callAnimation();
  }

  function addSocial(luku) {
    // lisää sosiaalisia pisteitä, ei rajaa?
    sosiaalisuus += luku;
    gainSocial=true;
    animationArray[2]=1;
    callAnimation();
  }

  function reduceSocial(luku) {
    // vähentää sosiaalisia pisteitä
    sosiaalisuus -= luku;
    if (sosiaalisuus < 0) {
      sosiaalisuus = 0;
    }
    loseSocial=true;
    animationArray[3]=1;
    callAnimation();
  }

  function addLife(luku) {
    // lisää elämää, maksimielämä 200?
    elkut += luku;
    if (elkut > 200) {
      // jos elämät yli 200, elämät = 200
      elkut = 200;
    }
    animationArray[4]=1;
    callAnimation();
    gainHealth=true;
  }

  function reduceLife(luku) {
    // vähentää elämää
    if (elkut > 0) {
      elkut -= luku;
    }
    if (elkut < 0) {
      // jos elämät alle 0, elämät = 0
      elkut = 0;
    }
    loseHealth=true;
    animationArray[5]=1;
    callAnimation();
  }

  function addMoney(luku) {
    // lisää rahaa
    rahat += luku;
    gainMoney=true;
    animationArray[6]=1;
    callAnimation();
  }

  function reduceMoney(luku) {
    //vähentää rahaa
    rahat -= luku; // tähän ei tarvita negatiivisen tarkistusta?
    loseMoney=true;
    animationArray[7]=1;
    callAnimation();
  }

  function yesButtonClicked() {
    // jos painaa kyllä
    yes = 1; //yes arvo on nyt true, annetaan parametrina luokan Kortti metodille changeStats(yes)
    kortit[index].changeStats(yes);
    index = kortit[index].seuraavaKylla; // vaihdetaan korttia indexin mukaan
    vuoro += 1;
    draw(); //renderöidään kuva kerran, ei yli 9000 kertaa sekunnissa tarpeettomasti
  }

  function noButtonClicked() {
    // jos painaa ei
    yes = 2; //yes arvo on nyt false, annetaan parametrina luokan Kortti metodille changeStats(yes)
    kortit[index].changeStats(yes);
    index = kortit[index].seuraavaEi; // vaihdetaan korttia indexin mukaan
    vuoro += 1;
    draw(); //renderöidään kuva kerran kutsumalla sitä tässä, ei yli 9000 kertaa sekunnissa tarpeettomasti
  }

  function valintaButtonClicked() {
    yes = 3;
    kortit[index].changeStats(valinta);
    index = kortit[index].seuraavaValinta;
    vuoro += 1;
    draw();
  }

  function drawBackground() {
    ctx.drawImage(taustaKuvat[index], 0, 0, 1024, 768); // piirretään tausta
  }

  function drawCard() {
    sivunKaanto.play();
    if (gameOn==true)
    {
    // kortin piirtämiseksi nämä:
    //let img = new Image(); // kortin kuva
    //img.src=kortit[index].kuva;

    if (kortit[index].napit[0]!=""){
      kylla.innerHTML=kortit[index].napit[0];
    }
    if (kortit[index].napit[1]!=""){
      ei.innerHTML=kortit[index].napit[1];
    }
    if (kortit[index].napit[2]!=""){
      valinta.innerHTML=kortit[index].napit[2];
    }
    if (kortit[index].napit[1]==="none") {
      ei.style.display="none";
    }
      else if (kortit[index].napit!=="-") {
        ei.style.display="inline";
      }
    if (kortit[index].napit[2]==="") {  // valinnaisen 3. vaihtoehdon piilottaminen/näyttö
      valinta.style.display = "none";
    } else if (kortit[index].napit[2]!=="") {
      valinta.style.display = "inline";
    }
  }

    ctx.beginPath();

    ctx.shadowColor = "black";
    ctx.shadowBlur = 20;
    
    ctx.roundRect(x - 200, y - 300, 400, 575, 10, 8); // suorakulmio, itse kortti
    ctx.strokeStyle="white";
    ctx.fillStyle = "#39a0ca"; //täyttöväri
    ctx.fill(); //täytetään värillä, viivan saa käyttämällä ctx.stroke()
    ctx.drawImage(korttiKuvat[index], x - 181, y - 176, 362, 362); //kortin sisälle kuvaa
    ctx.fillStyle = "white"; // tekstin väri
    ctx.stroke();

    let text = kortit[index].tarinaTeksti;
    let text2 = kortit[index].teksti; // Tämän avulla kirjoitetaan teksti korttiin. Tässä kohdassa myös koodi rivinvaihdoille, canvas ei tue niitä vakiona.

    let lines = text.split("\n"); //rivinvaihdot tarinatekstille
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x - 175, y - 260 + i * 23);
    }

    let lines2 = text2.split("\n"); //rivinvaihdot valintatekstille
    for (let i = 0; i < lines2.length; i++) {
      ctx.fillText(lines2[i], x - 175, y + 210 + i * 23);
    }
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur=0;

    if(avustajat[index]!=undefined){
      let text3=avustajat[index].teksti;
      let lines3 = text3.split("\n");

      if (vasen===true){
      ctx.drawImage(avustajaKuva, 100, 525, 128, 128);
      ctx.roundRect(60, 525-lines3.length*30-30, 200, lines3.length*25, 8);
      ctx.fill();
      ctx.fillStyle="black";
      for (let i = 0; i < lines3.length; i++) {
        ctx.fillText(lines3[i], 75, 515-lines3.length*30 + i * 23);
      }
      vasen=false;
    }
      else {
      ctx.drawImage(avustajaKuva, 825, 525, 128, 128);
      ctx.roundRect(785, 525-lines3.length*30-30, 200, lines3.length*25, 8);
      ctx.fill();
      ctx.fillStyle="black";
      for (let i = 0; i < lines3.length; i++) {
        ctx.fillText(lines3[i], 800, 515-lines3.length*30 + i * 23);
      }
      vasen=true;
      }
    }
  }

  class Kortti {
    constructor(  //constructor arvojen alustamiselle new Kortti() mukaisesti
      id,
      tarinaTeksti,
      teksti,
      napit,
      kylla,
      ei,
      seuraavaKylla,
      seuraavaEi,
      valinta,
      seuraavaValinta
    ) {
      this.id = id;
      this.tarinaTeksti=tarinaTeksti
      this.teksti = teksti;
      this.napit=napit;
      this.kylla = kylla;
      this.ei = ei;
      this.seuraavaKylla = seuraavaKylla;
      this.seuraavaEi = seuraavaEi;
      this.valinta = valinta;
      this.seuraavaValinta = seuraavaValinta;  // valinnainen kolmas nappula ihan viimeisenä
    }
  

    changeStats(yes) {
      // muokkaa pisteitä pelissä
      if (yes === 1) {
        if (index==17){  // poistetaan/muutetaan myöhemmin
          quitGame();
        }
        //yesButtonClicked()
        for (let i = 0; i < this.kylla.length; i++) {
          // for loop joka looppaa kortti-olion vaihtoehdot läpi, mahdollistaa yhden tai useamman vaikutuksen kerralla
          functionArr[this.kylla[i].m](this.kylla[i].v); // etsii funktion functionArr-listasta ja kutsuu sitä this.kylla[i].vaikutuksen arvon mukaisesti
        }
      } else if (yes === 2) {
        //noButtonClicked()
        for (let i = 0; i < this.ei.length; i++) {
          functionArr[this.ei[i].m](this.ei[i].v);
        }
      } else if (valinta === 3) {
        //valintaButtonClicked()
        for (let i = 0; i < this.valinta.length; i++) {
          functionArr[this.valinta[i].m](this.valinta[i].v);
        }
      }
    }
  }

  class Avustaja {  //luokka avustajalle, voi vaihtaa kuvaa ja tekstiä
    constructor(
      id,
      kuva,
      teksti
      )
      {
        this.id=id;
        this.kuva=kuva;
        this.teksti=teksti;
      }
  }

  let avustajat=[]; //array avustajille

  let doggo1=new Avustaja(0, avustajaKuva, "hau hau");
  let doggo2=new Avustaja(1, avustajaKuva, "hau hau2\nhauhauhau\nhauahuahu");
  let doggo3=new Avustaja(2, avustajaKuva, "hau hau2\nhauhauhau\nhauahuahu\nahahahahahahahahu\nhauahhuhuahuahauh\nhauhauhauh");
  let doggo4=undefined;
  let doggo5=undefined;
  let doggo6=undefined;
  let doggo7=undefined;
  let doggo8=undefined;
  let doggo9=undefined;
  let doggo10=undefined;
  let doggo11=undefined;
  let doggo12=undefined;
  let doggo13=undefined;
  let doggo14=undefined;
  let doggo15=undefined;
  let doggo16=undefined;
  let doggo17=undefined;

  avustajat.push(doggo1);
  avustajat.push(doggo2);
  avustajat.push(doggo3);
  avustajat.push(doggo4);
  avustajat.push(doggo5);
  avustajat.push(doggo6);
  avustajat.push(doggo7);
  avustajat.push(doggo8);
  avustajat.push(doggo9);
  avustajat.push(doggo10);
  avustajat.push(doggo11);
  avustajat.push(doggo12);
  avustajat.push(doggo13);
  avustajat.push(doggo14);
  avustajat.push(doggo15);
  avustajat.push(doggo16);
  avustajat.push(doggo17);

  let functionArr = [
    addPoints,  // 0
    reducePoints, // 1
    addSocial,  // 2
    reduceSocial, // 3
    addLife,  // 4
    reduceLife, // 5
    addMoney, // 6
    reduceMoney,  // 7
  ]; // array joka pitää sisällään pelin keskeiset funktiot pisteiden muuttamiseksi

  let kortit = []; // array korteille//metodien numerot: 0: addPoints() 1: reducePoints 2: addSocial 3: reduceSocial 4: addLife 5: reduceLife
  
  // tehdään kortteja, oliolistat parametreina kohdille kylla, ei, seuraavaKylla ja seuraavaEi, (seuraavaValinta)     m=metodi, v=vaikutus, saattaa vaikuttaa sekavalta mutta vähentää merkittävästi kirjoittamista 

  let alku = new Kortti(0, "Kesäloma alkaa! \nMenetkö juhlistamaan sitä kavereiden\nvai perheen kanssa?", "Kumman valitset?", ["Kavereiden", "Perheen", ""],  [{ m: 2, v: 10 }, { m: 0, v: 50 }, { m: 6, v: -50 }],[{ m: 0, v: 50 }], 1 , 6 );  
  let ranta = new Kortti(1,"Menit kavereiden kanssa rannalle,\nsiellä oli hauskaa. \nEtsitkö kesätöitä vai jäätkö\nkatsomaan kristallipalloa?",  "Haetko?",["Juu", "Eips", ""],[{ m: 0, v: 250 }],[{ m: 0, v: 100 },{ m: 5, v: 5 },{ m: 2, v: 10 },{ m: 7, v: 25 },],2,6);
  let tarjous= new Kortti(2, "Pääset haluamaasi kesätyöpaikkaan.", "Työt alkavat muutaman\n päivän levättyäsi", ["OK", "none", ""], [{m: 0, v: 0}], [{m: 0, v: 0}], 3, 3);
  let ruokatauko=new Kortti(3, "Muutaman päivän levättyäsi\nolet töissä. Tulee ruokatauko.", "Syötkö evääsi vai\nhampurilaisen?", ["Eväät", "Burgeri", ""], [{m: 4, v: 10},{m: 0, v:50}], [{m:5, v: 10}, {m:7, v: 20}], 4, 4);
  let palkka=new Kortti(4, "Saat ensimmäisen osan palkastasi", "", ["OK", "none", ""], [{m: 6, v: 200}], [{m: 0, v: 0}], 5, 5);
  let lenkki=new Kortti(5, "Kristallipallo soi.\nKaverisi pyytää sinua lenkille.", "Menetkö mukaan?", ["Menen", "En mene", ""], [{m: 2, v: 10}, {m: 4, v: 5}], [{m: 3, v: 10}, {m: 5, v: 5}], 10, 10);

  let perhe=new Kortti(6, "Sinulla oli kivaa kotona\nveljesi kanssa pelatessa", "Etsitkö kesätöitä kristallipallolla\n vai jäätkö vain tuijottamaan sitä", ["Etsin", "Tuijotan", ""], [{m: 0, v: 250}], [{m: 7, v: 25}, {m: 0, v: 100}, {m: 5, v: 5}, {m: 2, v: 10}], 2, 7);
  let juhlat=new Kortti(7, "Kaverit menevät lomamatkalle\nmaatilalle.", "Menetkö heidän mukaan?", ["Menen", "En mene", ""], [{m :7, v: 25}, {m: 0, v: 100}, {m: 5, v: 5}, {m: 2, v: 10}], [{m: 3, v: 5}], 8, 8);
  let opiskelu=new Kortti(8, "Maatilaloma päättyy. Olet kotona.\nIsäsi tarjoaa mahdollisuutta tehdä kurssin.\nSaisit palkkion.", "Teetkö?", ["Teen", "En tee", ""], [{m:0, v: 100}, {m: 6, v: 50}, {m: 3, v: 5}], [{m: 0, v: 0}], 9, 9);
  let ruoka=new Kortti(9, "On ruoka-aika.", "Syötkö\nvanhempiesi tekemää ruokaa\nvai suklaata?", ["Ruokaa", "Suklaata", ""], [{m: 4, v: 5}, {m: 0, v: 50}], [{m: 7, v: 10}, {m: 5, v: 5}], 10, 10);

  let uinti=new Kortti(10, "Kaverisi pyytävät sinua uimaan.", "Päätät mennä mukaan", ["Okei", "none", ""], [{m: 0, v: 0}], [{m: 0, v: 0}], 11, 12);
  let viini=new Kortti(11, "Kaverisi nauttivat viiniä\nauringon laskiessa.", "Otatko sinäkin?", ["Otan", "En ota", ""], [], [], 12, 13);
  let vaara=new Kortti(12, "Löit jalkasi kiveen uidessa", "", ["Höh", "none", ""], [{m: 5, v: 20}], [], 14, 14);
  let piikki=new Kortti(13, "Kaverisi kompuroi kännissä ja\nastuu heikkaan hautautuneeseen neulaan.","Autat kaverin ensiapupisteelle.",["Huhhuh", "none", ""], [{m: 0, v: 100}, {m: 2, v: 10}], [], 14, 14);

  let ruiskut=new Kortti(14, "Rannalla on käytettyjä ruiskuja.\nKaverisi haluavat kerätä ne pois\nsotkemasta.","Keräätkö?",["Tietty", "En todellakaan", ""], [{m: 1, v: 25}, {m: 2, v: 5}, {m: 5, v: 5}], [{m: 0, v: 50}, {m: 4, v: 5}], 15, 15);
  let kotona=new Kortti(15, "Olet nyt kotona,\njoku kertoo kristallisomessa\nolleensa juomassa","Miten reagoit", ["Tykkäät", "Et tykkää", "En mitenkään"], [],[], 16, 16, [], 16);
  let bileet=new Kortti(16, "Menet kotibileisiin.\nSinulle tarjotaan lävistystä.","Otatko",["Joo", "En", ""], [{m: 5, v: 20}, {m: 2, v: 5}, {m: 1, v: 50}], [{m: 0, v:150}], 17, 17);
  let loppu=new Kortti(17, "Kesäloma päättyy.", "Katsotaan miten meni.", ["Katso tulokset!", "none", ""], [], [], 17, 17);

  kortit.push(alku); // laitetaan kortit listaan, pitää olla samassa järjestyksessä kuin kortit on numeroitu
  kortit.push(ranta);
  kortit.push(tarjous);
  kortit.push(ruokatauko);
  kortit.push(palkka);
  kortit.push(lenkki);
  kortit.push(perhe);
  kortit.push(juhlat);
  kortit.push(opiskelu);
  kortit.push(ruoka);
  kortit.push(uinti);
  kortit.push(viini);
  kortit.push(vaara);
  kortit.push(piikki);
  kortit.push(ruiskut);
  kortit.push(kotona);
  kortit.push(bileet);
  kortit.push(loppu);

  // kortit.push(resultScreen);
  //tässä kohtaa kokeiltu erilaisia animaatiolooppeja jotka lagaavat, pitää miettiä uudestaan jos myöhemmin lisää animaatioita, siihen asti tuskin tarvitsee
  // initialize the timer variables and start the animation

  function drawResultScreen(){
    stopAnimation();

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    endingScreenOn=true;
    muteNappi.style.display="none";
    if (aanet!=false){
    taustaMusiikki.src=("./sounds/sadCaves.mp3");
    taustaMusiikki.stop();
    let loppuMusiikki=new Sound("./sounds/sadCaves.mp3");
    loppuMusiikki.sound.volume=0.1;
    loppuMusiikki.play();
    }
    kylla.style.display="none";
    ei.style.display="none";
    valinta.style.display="none";
    pelaaUudelleenNappi.style.display="block";

    ctx2.fillStyle="#51d0de";
    ctx2.fillRect(0,0,1024,768);
    ctx2.fillStyle="black";
    ctx2.font="32px century-gothic"
    
    let pisteTulos="";
    let sosiaalisuusTulos="";
    let elkkuTulos="";
    let rahaTulos="";

    if (pisteet>1000){
      pisteTulos="Mahtava Tulos!";
    }
    else if (pisteet>500){
      pisteTulos="Hyvä Tulos!";
    }
    else if (pisteet>250){
      pisteTulos="Ok tulos";
    }
    else if (pisteet<250){
      pisteTulos="O ou";
    }

    if (sosiaalisuus>=100){
      sosiaalisuusTulos="Olet erittäin sosiaalinen!";
    }
    else if (sosiaalisuus<100 && sosiaalisuus>=75){
      sosiaalisuusTulos="Olet sosiaalinen!";
    }
    else if (sosiaalisuus<75 && sosiaalisuus>=50){
      sosiaalisuusTulos="Olet melko sosiaalinen";
    }
    else if (sosiaalisuus< 50 && sosiaalisuus>=25){
      sosiaalisuusTulos="Viihdyt yksin";
    }
    else if (sosiaalisuus<25 && sosiaalisuus>=0){
      sosiaalisuusTulos="Olet yksinäinen";
    }

    if (elkut>100){
      elkkuTulos="Olet todella hyvissä voimissa!";
    }
    else if (elkut>75){
      elkkuTulos="Olet terve";
    }
    else if (elkut>50){
      elkkuTulos="Olet lievästi epäterve";  //tähän sairauksia?
    }
    else if (elkut>=25){
      elkkuTulos="Olet huonossa kunnossa";
    }
    else if (elkut<25){
      elkkuTulos="Olet heikossa hapessa! O ouuuu!";
    }

    if (rahat>1000){
      rahaTulos="Olet rikas!";
    }
    else if (rahat>500){
      rahaTulos="Olet varakas";
    }
    else if (rahat>250){
      rahaTulos="Sinulla on hyvin rahaa";
    }
    else if (rahat>100){
      rahaTulos="Sinulla ei ole paljoa rahaa";
    }
    else if (rahat<100){
      rahaTulos="Vähän rahaa";
    }
    else if (rahat<50){
      rahaTulos="Tuhlasit kaikki rahasi!"
    }

    ctx2.fillText("Tuloksesi", x-100, 50);
    ctx2.fillText((`Pisteet: ${pisteet} ${pisteTulos}`), x-200, 150);
    ctx2.fillText((`Sosiaalisuus: ${sosiaalisuus} ${sosiaalisuusTulos}`), x-200, 300);
    ctx2.fillText((`Elkut: ${elkut} ${elkkuTulos}`), x-200, 475);
    ctx2.fillText((`Rahat: ${rahat} ${rahaTulos}`), x-200, 650);

    ctx2.drawImage(korttiKuvat[22], 50, 50, 150, 150);
    ctx2.drawImage(korttiKuvat[21], 50, 225, 150, 150);
    ctx2.drawImage(korttiKuvat[20], 50, 400, 150, 150 );
    ctx2.drawImage(korttiKuvat[4], 50, 575, 150, 150);
    }

    function quitGame(){
      drawResultScreen();
    }

  loseHealth=false;

  let pointsX=240;
  let socialX=250;
  let healthX=260;
  let moneyX=270;
  let pointsY=50;
  let socialY=50;
  let healthY=50;
  let moneyY=50;

  let animaatioIntervalli;

  function callAnimation() {
    // check if an interval has already been set up
    if (!animaatioIntervalli) {
      animaatioIntervalli = setInterval(drawAnimation, 16);
  }
    pointsX=240;
    socialX=400;
    healthX=575;
    moneyX=700;
    pointsY=50;
    socialY=50;
    healthY=50;
    moneyY=50;
  }

  let a=0;
  let b=0;
  let c=0;
  let d=0;
  let e=0;
  let f=0;
  let g=0;
  let h=0;

  ctx2.font = "75px Century-Gothic"
  ctx2.fillStyle="green";
  function drawAnimation() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
 
    if(animationArray[0]==1){
      animatePointsGain();
      a+=2;
      if(a==100){
        animationArray[0]=0;
        a=0;
      }
    }
    if(animationArray[1]==1){
      animatePointsLoss();
      b+=2;
      if(b==100){
        animationArray[1]=0;
        b=0;
      }
    }
    if(animationArray[2]==1){
      animateSocialGain();
      c+=2;
      if(c==100){
        animationArray[2]=0;
        c=0;
      }
    }
    if(animationArray[3]==1){
      animateSocialLoss();
      d+=2;
      if(d==100){
        animationArray[3]=0;
        d=0;
      }
    }
    if(animationArray[4]==1){
      animateHealthGain();
      e+=2;
      if(e==100){
        animationArray[4]=0;
        e=0;
      }
    }
    if(animationArray[5]==1){
      animateHealthLoss();
      f+=2;
      if(f==100){
        animationArray[5]=0;
        f=0;
      }
    }
    if(animationArray[6]==1){
      animateMoneyGain();
      g+=2;
      if(g==100){
        animationArray[6]=0;
        g=0;
      }
    }
    if(animationArray[7]==1){
      animateMoneyLoss();
      // console.log("money");
      h+=2;
      if(h==100){
        animationArray[7]=0;
        h=0;
      }
    }
    // animateSocial();
  }
  let animationArray=[  //array animaatioille
    animatePointsGain, 
    animatePointsLoss, 
    animateSocialGain, 
    animateSocialLoss, 
    animateHealthGain, 
    animateHealthLoss, 
    animateMoneyGain, 
    animateMoneyLoss,
  ]; 

  function animatePointsGain() {
    ctx2.fillStyle="green";
    ctx2.fillText("+", pointsX, pointsY, 100); 
    pointsY-=1
  }

  function animatePointsLoss() {
    ctx2.fillStyle="red";
    ctx2.fillText("-", pointsX, pointsY, 100); 
    pointsY-=1
  }

  function animateSocialGain() {
    ctx2.fillStyle="green";
    ctx2.fillText("+", socialX, socialY, 100); 
    socialY-=1;
  }

  function animateSocialLoss() {
    ctx2.fillStyle="red";
    ctx2.fillText("-", socialX, socialY, 100); 
    socialY-=1;
  }

  function animateHealthGain() {
    ctx2.fillStyle="green";
    ctx2.fillText("+", healthX, healthY, 100); 
    healthY-=1
  }

  function animateHealthLoss() {
    ctx2.fillStyle="red";
    ctx2.fillText("-", healthX, healthY, 100); 
    healthY-=1
  }

  function animateMoneyGain() {
    ctx2.fillStyle="green";
    ctx2.fillText("+", moneyX, moneyY, 100); 
    moneyY-=1;
  }

  function animateMoneyLoss() {
    ctx2.fillStyle="red";
    ctx2.fillText("-", moneyX, moneyY, 100); 
    moneyY-=1;
  }

  function stopAnimation(){  //pysäyttää animaation
    clearInterval(animaatioIntervalli);
  }

  window.requestAnimationFrame(draw);

}

function startGame(){ //käynnistetään peli
  valikko.style="display: none"
  Peli(); //funktio itse pelille
}
// Peli(); //käynnistetään peli

