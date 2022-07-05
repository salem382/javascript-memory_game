
var levelNumber = document.querySelector('.level-number'),
    allowErrors = document.querySelector('.allow-errors'),
    errorNumber = document.querySelector('.errors-number'),
    overlay = document.querySelector('.overlay'),
    statusU = document.querySelector('.status'),
    newLevel = document.querySelector('.new-level'),
    playBtn = document.querySelector('.play-btn');

var parentContent = document.querySelector('.content'),
    backs = Array.from(document.querySelectorAll('.back')),
    imgs = Array.from(document.querySelectorAll('.box  img')),
    boxs = Array.from(document.querySelectorAll('.box')),
    faces = document.querySelectorAll('.face'),
    parentLevel = document.querySelector('.parent-level');

var itemOne = null,
    itemTwo = null,
    enterTwice = false,
    worngCases = 0,
    truecases = 0,
    trueCassesToWin = null,
    allowErrorsNumber = null;

    if (localStorage.getItem('nowLeve') == null) {
        var nowLeve = 1;
        var x = -1;//0
    } else {
        var nowLeve = JSON.parse(localStorage.getItem('nowLeve'));
        var x = JSON.parse(localStorage.getItem('x'))
        console.log (x)
    }


function resetAllowErrorsNumber () {
    allowErrorsNumber = allSrc.length - (nowLeve + x);
    allowErrors.textContent = allowErrorsNumber;
    localStorage.setItem('x',JSON.stringify(x));
    x = x + 1;
    console.log ('done')
}     

function htmlSetting () {
    levelNumber.textContent = nowLeve;
    parentLevel.textContent = 'start level '+ nowLeve;
}
htmlSetting ();


function startSetting (stu) {
    allSrc = ['1.png','2.jpg','3.png','4.png','5.png','6.jpg','1.png','2.jpg','3.png','4.png','5.png','6.jpg'];
    trueCassesToWin = allSrc.length / 2;
    if (stu == 'win') {
        resetAllowErrorsNumber ();
    }
    imgs.forEach ((ele) => {
        var randomIndx = Math.floor(Math.random () * allSrc.length);
        ele.setAttribute('src',`images/${allSrc[randomIndx]}`);
        allSrc.splice(randomIndx,1);
    })
}
startSetting('win');
imgs.forEach((ele, ind) => {

    console.log(ind+1 +' '+ele.getAttribute('src'));
})


parentContent.addEventListener('click',(e) => {

    if (e.target.classList.contains('content') == false) {
        
        open(e.target.parentElement);
        if (itemOne == null && e.target.classList.contains('back')) {
            itemOne = e.target.nextElementSibling.children[0];
        }
        else if (itemTwo == null && e.target.classList.contains('back')) {
            itemTwo = e.target.nextElementSibling.children[0];
            enterTwice = true;
            stopClick();
        }
        if (isSame() == false) {
            setTimeout(() =>{
                close(itemOne.parentElement.parentElement);
                close(itemTwo.parentElement.parentElement);
                resrtItems ();
                worngCases++;
                errorNumber.textContent = worngCases;
                lose();
                openClcik();
            },1000)
        }
    }
});


function open (item) {
    item.classList.add('is-fliped');
}
function close (item) {
    item.classList.remove('is-fliped');
}

function isSame () {

    if (enterTwice) {
        if (itemOne.getAttribute('src') == itemTwo.getAttribute('src')) {
            resrtItems ();
            enterTwice = false;
            win ();
            openClcik();
            return true;
        } else {
            enterTwice = false;
            return false;
        }
    }
}

function resrtItems () {
    itemOne = null;
    itemTwo = null;   
}

function stopClick () {
    backs.forEach((ele)=> {
        ele.classList.add('stop-click');
    })
}
function openClcik() {
    backs.forEach((ele)=> {
        ele.classList.remove('stop-click');
    })
}

function lose () {
    if (worngCases == allowErrorsNumber) {
        levelReset('lose');
    }
}

function win () {
    truecases++;
    if (truecases == trueCassesToWin) {
        if (nowLeve == 6) {
            overlay.style.display = 'flex';
            statusU.textContent = 'You End the Gam';
            parentLevel.textContent = '';
            playBtn.textContent = 'start from level 1';
            playBtn.addEventListener('click',() => {
                localStorage.clear();
                location.reload();
            })
        }
        else {
            nowLeve = nowLeve + 1;
            localStorage.setItem('nowLeve',JSON.stringify(nowLeve));
            levelReset('win');
        }
    }
}

playBtn.addEventListener('click',() => overlay.style.display = 'none' );


function levelReset(stu) {
    overlay.style.display = 'flex';
    worngCases = 0;
    truecases = 0;
    errorNumber.textContent = worngCases;
    startSetting(stu);
    if (stu == 'lose') {
        statusU.textContent = 'lose !';
        playBtn.textContent = 'try again';
        parentLevel.textContent = '';
    } else if (stu == 'win') {
        parentLevel.textContent = 'start level' + ' ' + nowLeve;
        statusU.textContent = 'win !';
        playBtn.textContent = 'start';
        levelNumber.textContent = nowLeve;
    }
    setTimeout(() => {
        boxs.forEach((ele) => close(ele));
    },1000)
}