let boxes=document.querySelectorAll('.box');
let reset=document.querySelector('#reset');
let winheading=document.querySelector('#winmsg');
let new_game=document.querySelector('#new_game')
let msg_container=document.querySelector('.msgcontainer')

let count=0;
let playerO=true; //player O turn

let winnerarr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box)=>
{
    box.addEventListener('click',()=>
    {
        if(playerO===true){
            box.style.color='green';
            box.textContent='O';
            playerO=false;
            count++;
        }
        else{
            box.style.color='red';
            box.textContent='X';
            playerO=true;
            count++;

        }
        box.disabled=true;
        checkwinner();
        if(count===9){
            msg_container.classList.remove('hide');
            winheading.innerText=`DRAW`;
            count=0;
            setTimeout(() => {
                reset_game();
            }, 2000);     
        }
    });
});

function boxes_disabled(){
    for(box of boxes){
        box.disabled=true;
    }
}

let showwinner=(winner)=>{
    msg_container.classList.remove('hide');
    if (winner==='O'){
        winheading.innerText=`WINNER IS PLAYER 1`;
    }
    else{
        winheading.innerText=`WINNER IS PLAYER 2`;
    }
    boxes_disabled();

}

let checkwinner=()=>{
    for (pattern of winnerarr){
        
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1 !=='' && pos2!=='' && pos3!==''){
            if(pos1===pos2 &&  pos2===pos3){
                showwinner(pos1);
                count=0;
            }
        }
    }
}

let reset_game=()=>{
    for(box of boxes){
        box.disabled=false;
        msg_container.classList.add('hide');
        box.innerText='';
    }
    playerO=true;
}

new_game.addEventListener('click',reset_game)

reset.addEventListener('click',reset_game)