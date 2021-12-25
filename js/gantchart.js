class gantChart {
    constructor() {
        this.changeWidth = document.querySelectorAll('#changeWidth');
        this.gantchart = document.getElementById('gantchart');
        this.chart = document.querySelectorAll('#chart');
        this.rightDrag = document.querySelectorAll('div[id="rightDrag"]');
        this.leftDrag = document.querySelectorAll('div[id="leftDrag"]');
        this.flag = 'NO';
        this.x;
        this.width;
        this.leftWidth = '';
        this.rightWidth = '';
        this.checkWidth = '';
        this.left;
        this.index;
    }
    forLeft() {
        this.leftDrag.forEach((value, index) => {
            console.log(index);
            value.addEventListener('mousedown', { index: index, flag: 'leftOK', handleEvent: widthChan }, false)
            value.addEventListener('click', { index: index, flag: 'NO', handleEvent: widthChan }, false);
        });
    }

    widthChan(e) {
        
        let left = parseFloat(this.chart[this.index].style.left.replace(/px/, ''));
        let width = parseFloat(this.changeWidth[this.index].style.width.replace(/px/, ''));
        this.gantchart.addEventListener('mousemove', (event) => {

            let checkWidth = parseFloat(this.changeWidth[this.index].style.width.replace(/px/, ''));
            if (this.flag === 'rightOK' && checkWidth > 1) {

                event.preventDefault();
                this.changeWidth[this.index].style.width = ((x - event.x) + width) + 'px';
                this.chart[this.index].style.left = ((event.x - x) + left) + 'px';

            }
            else if (this.flag === 'rightOK' && checkWidth <= 1) {
                this.changeWidth[this.index].style.width = ((x - event.x) + width) + 'px';

            }
        }, false);
    }


}


let changeWidth = document.querySelectorAll('#changeWidth');
let gantchart = document.getElementById('gantchart');
let chart = document.querySelectorAll('#chart');
let rightDrag = document.querySelectorAll('div[id="rightDrag"]');
let leftDrag = document.querySelectorAll('div[id="leftDrag"]');
let flag = 'NO';
let x;
let width;
let leftWidth = '';
let rightWidth = '';
let checkWidth = '';
let left;
let index;

padding_gan = gantchart.style.marginLeft;
console.log(padding_gan);

const move = function moveFun(event) {

    if (flag === 'leftOK') {
        leftWidth = ((event.x - x) + width) + 'px';
        changeWidth[index].style.width = leftWidth;
    }
    else if (flag === 'rightOK' && checkWidth > 1) {
        console.log(((event.x - x) + left) + 'px');
        changeWidth[index].style.width = ((x - event.x) + width) + 'px';
        chart[index].style.left = ((event.x - x) + left) + 'px';

    }
    else if (flag === 'rightOK' && checkWidth <= 1) {
        changeWidth[index].style.width = ((x - event.x) + width) + 'px';

    }
};


gantchart.addEventListener('mousemove', { width: width, flag: flag, x: x, handleEvent: move }, false);


let widthChan = function widthChan(e) {
    flag = this.flag;
    console.log('flag:', flag)
    x = e.clientX;
    e.stopPropagation();
    width = parseFloat(changeWidth[this.index].style.width.replace(/px/, ''));
    index = this.index;
    resultPHP(x-width, width);
}
let widthChanR = function widthChanR(e) {
    x = e.clientX;
    flag = this.flag;
    console.log('flag:', flag)
    left = parseFloat(chart[this.index].style.left.replace(/px/, ''));
    width = parseFloat(changeWidth[this.index].style.width.replace(/px/, ''));
    index = this.index;
    checkWidth = parseFloat(changeWidth[this.index].style.width.replace(/px/, ''));
    resultPHP(x, width);
}


leftDrag.forEach((value, index) => {
    console.log('leftDrag')
    value.addEventListener('mousedown', { index: index, flag: 'leftOK', handleEvent: widthChan }, false)
    value.addEventListener('click', { index: index, flag: 'NO', handleEvent: widthChan }, false);
});


rightDrag.forEach((value, index) => {
    console.log('rightDrag')
    value.addEventListener('mousedown', { index: index, flag: 'rightOK', handleEvent: widthChanR }, false)
    value.addEventListener('click', (e) => {
        e.stopPropagation();
        flag = 'NO';
    }, false);
});

window.addEventListener('click', () => { flag = 'NO'; }, false);

let resultPHP = function(x, width){
    var req = new XMLHttpRequest();

    var result = document.getElementById('result_php');
    req.open('GET', 'datePHP.php?x=' + encodeURIComponent(x) + '&width=' + encodeURIComponent(width));
    req.send(null);
    req.onreadystatechange = function(){
        if(req.readyState === 4){
            console.log('start')
            if(req.status == 200){
                console.log('ok')
                result.innerHTML = req.responseText;
            }
            else{
                console.log(req);
            }
        }
    }
}