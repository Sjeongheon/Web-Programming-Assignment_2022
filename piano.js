class Notes {
    constructor(src) {
        this.src = src;
        this.pressed = false;
        this.pushdown = function () {
            var audio = new Audio(src);
            if(!this.pressed)
                audio.play();
        };
    }
}

function hideNotes(){
    document.querySelectorAll('i').forEach(function(e){
        e.classList.toggle('hide-notes');
    });
}

var note_n = 3;
var note_inf = {
    1 : ['A0','G2'],
    2 : ['A1','G3'],
    3 : ['A2','G4'],
    4 : ['A3','G5'],
    5 : ['A4','G6'],
    6 : ['A5','G7']
};

function changerangeinf(){
    document.querySelector(".piano_rangeinf").innerHTML = "<br><br>현재 음역대는 " + note_inf[note_n][0] + "에서 " +note_inf[note_n][1] + "까지 입니다.<br><br>";
}

document.querySelector('#rangeselection').addEventListener('change', () => {
    changerangeinf();
});

function changeRange(n){
    note_n = n;
}


var NoteDic = {};
for(let i=0;i<7;i++){
    let k = 1;
    let source1 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'a'] = new Notes(source1);
    let source2 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'ais'] = new Notes(source2);
    let source3 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'b'] = new Notes(source3);
    let source4 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'c'] = new Notes(source4);
    let source5 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'cis'] = new Notes(source5);
    let source6 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'d'] = new Notes(source6);
    let source7 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'dis'] = new Notes(source7);
    let source8 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'e'] = new Notes(source8);
    let source9 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'f'] = new Notes(source9);
    let source10 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'fis'] = new Notes(source10);
    let source11 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'g'] = new Notes(source11);
    let source12 = './notes/' + (k++ + 12*i)+ '.mp3';
    NoteDic[ (i+1) +'gis'] = new Notes(source12);
}

var notekeys1 = { 'Tab' :'a',  '1' : 'ais' , 'q' : 'b', 'w':'c','3':'cis','e':'d','4':'dis','r' :'e', 't' : 'f', '6':'fis','y':'g','7':'gis'};
var notekeys2 = { 'u' :'a',  '8' : 'ais' , 'i' : 'b', 'o':'c','0':'cis','p':'d','-':'dis','[' :'e', ']' : 'f', 'Backspace':'fis','\\':'g','Insert':'gis'};
var rangekeys = {'F1':1,'F2':2, 'F3':3,'F4':4,'F5':5,'F6':6};

window.addEventListener('keydown',(e) => {
    if(e.key in notekeys1 && !NoteDic[note_n+notekeys1[e.key]].pressed){
        let curNote1 = Number(note_n) + notekeys1[e.key];
        NoteDic[curNote1].pushdown();
        NoteDic[curNote1].pressed = true;
        document.getElementById(1+notekeys1[e.key]).classList.add('active');
    }
    if(e.key in notekeys2 && !NoteDic[(note_n+1)+notekeys2[e.key]].pressed){
        let curNote2 = Number(note_n+1) + notekeys2[e.key];
        NoteDic[curNote2].pushdown();
        NoteDic[curNote2].pressed = true;
        document.getElementById(2+notekeys2[e.key]).classList.add('active');
    }
    if(e.key in rangekeys){
        changeRange(rangekeys[e.key]);
        let range = document.querySelector('#rangeselection');
        range.options.selectedIndex = note_n-1;
        changerangeinf();
    }
    if(e.key == 'Tab' || e.key == 'Backspace' || e.key == 'Insert' || e.key in rangekeys)
        e.preventDefault();
});

window.addEventListener('keyup',(e)=>{
    if(e.key in notekeys1){
        let curNote = Number(note_n) + notekeys1[e.key];
        document.getElementById((1+notekeys1[e.key])).classList.remove('active');
        NoteDic[curNote].pressed = false;
    }
    if(e.key in notekeys2){
        let curNote = Number(note_n+1) + notekeys2[e.key];
        document.getElementById(2+notekeys2[e.key]).classList.remove('active');
        NoteDic[curNote].pressed = false;
    }
});

const keys = document.querySelectorAll('.white-key, .black-key');
keys.forEach(function(key){
    key.addEventListener('mousedown', ()=>{
        key.classList.add('active');
        let curNote = (Number(note_n)+Number(key.id[0]-1)) + key.id.slice(1);
        NoteDic[curNote].pushdown();
        NoteDic[curNote].pressed = true;
    });
    key.addEventListener('mouseup', ()=>{
        key.classList.remove('active');
        let curNote = (Number(note_n)+Number(key.id[0]-1)) + key.id.slice(1);
        NoteDic[curNote].pressed = false;
    });
    key.addEventListener('mouseout', ()=>{
        key.classList.remove('active');
        let curNote = (Number(note_n)+Number(key.id[0]-1)) + key.id.slice(1);
        NoteDic[curNote].pressed = false;
    });
});
