//人物动画帧播放控制
function boyMove(cspeed){
    boyflag=setInterval(dirMove,cspeed);
}

//人物动画帧播放控制实际函数体
function dirMove() {
    if(moveFlag[1]>=3)
        moveFlag[1]=0;
    var dirGo=movearr[moveFlag[0]][moveFlag[1]][0]+"px "+movearr[moveFlag[0]][moveFlag[1]][1]+"px";
    boy.style["background-position"]=dirGo;
    moveFlag[1]++;
}
//男孩人物获取
var boy=document.getElementById("boy");

//人物运动各个状态帧存储
var movearr=[
    [[0,-32],[-32,-32],[-64,-32]],
    [[0,-64],[-32,-64],[-64,-64]],
    [[0,-96],[-32,-96],[-64,-96]],
    [[0,0],[-32,0],[-64,0]]
];
//人物运动方向及当前状态帧
var moveFlag=[3,0];
//人物动画帧切换速度
var fspeed=200;
//保存男孩的setInterval返回值
boyMove(fspeed);

function getDir(){
    switch (dirkeyCode) {
        case 37 ://左移
            moveFlag = [0, 0];
            boyMove(fspeed);
            break;
        case 38 ://上移
            moveFlag = [2, 0];
            boyMove(fspeed);
            break;
        case 39 ://右移
            moveFlag = [1, 0];
            boyMove(fspeed);
            break;
        case 40 ://下移
            moveFlag = [3, 0];
            boyMove(fspeed);
            break;
        default :
            break;
    }
}

setInterval(getDir,400);
