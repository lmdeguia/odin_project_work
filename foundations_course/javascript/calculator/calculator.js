var elem= document.querySelector('.display');
let input = document.querySelector('#input');
let output= document.querySelector('#output');

let just_evaluated = false;
let open_brkt = true;

input.textContent = '';
output.textContent = '';

let input_char = (e) => {
    let char = e.target.textContent;
    if (just_evaluated){
        input.textContent = char;
        just_evaluated = false;
        elem.scrollLeft = elem.scrollWidth;
        return;
    }
    input.textContent += char;
    elem.scrollLeft = elem.scrollWidth;
};

let del_char = (e) => {
    let s = input.textContent;

    if (s[s.length-1] === '('){
        open_brkt = true;
    }else if (s[s.length-1] === ')'){
        open_brkt = false;
    }
    input.textContent = s.slice(0, s.length-1);
    elem.scrollLeft = elem.scrollWidth;
};

let clr_disp = (e) => {
    let s = input.textContent;
    open_brkt = true;
    input.textContent = '';
    output.textContent = '';
    elem.scrollLeft = elem.scrollWidth;
};


let input_brkt = () => {
    if (just_evaluated){
        open_brkt = true;
        input.textContent = '';
    }
    let char = ')';
    if (open_brkt){
        char = '(';
        open_brkt = false;
    }else{
        open_brkt = true;
    }
    input.textContent += char;
    just_evaluated = false;
    elem.scrollLeft = elem.scrollWidth;
    return;
};

let brkt_button = document.querySelector('#brkt');
brkt_button.addEventListener('click', input_brkt);

let del_button = document.querySelector('button[data-id="del"]');
del_button.addEventListener('click', del_char);

let clr_button = document.querySelector('button[data-id="clr"]')
clr_button.addEventListener('click', clr_disp);


for (let i = 0; i <= 9; i++){
    let button = document.querySelector(`button[data-id="${i}"]`);
    button.addEventListener('click', input_char);
}

let operators = ['+', '-', '×', '÷', '.'];
for (op of operators){


    let button = document.querySelector(`button[data-id="${op}"]`);
    button.addEventListener('click', input_char);
}






// d = "1×1÷1+1×1÷1+1×1÷1"


let evaluate = document.querySelector('button[data-id="="]')
let expression_eval = () => {
    let expression = input.textContent;
    if (expression.length === 0){
        just_evaluated = false;
        return;
    }
    expression = expression.replaceAll("×", "*");
    expression = expression.replaceAll("÷", "/");
    let out = null;
    try{
        out = eval(expression);
        just_evaluated = true;
    }catch{
        out = 'ERROR';
        just_evaluated = true;
    }
    if (out === Infinity || out === -Infinity){
        out = 'ERROR';
    }
    if (typeof(out) === 'number'){
        out = Math.floor((out*(10**9)))/(10**9)
    }
    output.textContent = out;
};
evaluate.addEventListener('click', expression_eval);
