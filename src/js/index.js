//基础障碍物信息
function basicobj(xpos,ypos){
    this.xpos=xpos;
    this.ypos=ypos;
    this.collisionFlag=0;
    this.npccollisionFlag=0;
    this.type="obstacle";
}
//人物基本信息
function people(dom,xpos,ypos,increase,width,height,movearr,moveFlag){
    //dom元素获取
    this.dom=dom;
    //人物运动各个状态帧存储
    this.movearr=movearr?movearr:[
        [[0,-32],[-32,-32],[-64,-32]],
        [[0,-64],[-32,-64],[-64,-64]],
        [[0,-96],[-32,-96],[-64,-96]],
        [[0,0],[-32,0],[-64,0]]
    ];
    //人物类型
    this.type="player";
    //人物运动方向及当前状态帧
    this.moveFlag=moveFlag?moveFlag:[2,0];
    //人物碰撞检测标志
    this.collisionFlag=0;
    //位置初始化
    this.xpos=xpos?xpos:0;
    this.ypos=ypos?ypos:0;
    //活动边界
    this.width=width?width-32:612-32;
    this.height=height?height-32:610-32;
    //运动速度
    this.increase=increase?increase:4;
    //获取人物在活动场景中的x坐标
    this.getXpos=function(){
        this.xpos+=this.increase;
        if(this.xpos<0)
            this.xpos=0;
        if(this.xpos>this.width)
            this.xpos=this.width;
        return this.xpos+"px";
    };
    //获取人物在活动场景中的y坐标
    this.getYpos=function(){
        this.ypos+=this.increase;
        if(this.ypos<0)
            this.ypos=0;
        if(this.ypos>this.height)
            this.ypos=this.height;
        return this.ypos+"px";
    };

}


//人物动画帧播放实现
function dirMove(character,stopFlag) {

    if(stopFlag!=-1&&character.type=="player")
    {
        if(character.moveFlag[1]>=3)
            character.moveFlag[1]=0;
        var dirGo=character.movearr[character.moveFlag[0]][character.moveFlag[1]][0]+"px "+character.movearr[character.moveFlag[0]][character.moveFlag[1]][1]+"px";
        character.dom.style["background-position"]=dirGo;
        character.moveFlag[1]++;
    }

    if(character.type=="npc"){
        if(character.moveFlag[1]>=3)
            character.moveFlag[1]=0;
        var dirGo=character.movearr[character.moveFlag[0]][character.moveFlag[1]][0]+"px "+character.movearr[character.moveFlag[0]][character.moveFlag[1]][1]+"px";
        character.dom.style["background-position"]=dirGo;
        character.moveFlag[1]++;
    }

}
var boyanim;
//人物动画帧播放控制
function pAnima(character){
    this.character=character;
    switch (dirKeyCode){
        case 37 ://左移
            character.moveFlag = [0, 0];
            boyanim=setInterval('dirMove(this.character,dirKeyCode)',animaSpeed);
            break;
        case 38 ://上移
            character.moveFlag = [2, 0];
            boyanim=setInterval('dirMove(this.character,dirKeyCode)',animaSpeed);
            break;
        case 39 ://右移
            character.moveFlag = [1, 0];
            boyanim=setInterval('dirMove(this.character,dirKeyCode)',animaSpeed);
            break;
        case 40 ://下移
            character.moveFlag = [3, 0];
            boyanim=setInterval('dirMove(this.character,dirKeyCode)',animaSpeed);
            break;
        default :
            clearInterval(boyanim);
            break;
    }
}


//人物行走实现
function  cmove(character,dir) {
    switch(dir){
        case "left":
            character.increase=-Math.abs(character.increase);
            character.dom.style.left=character.getXpos();
            break;
        case "top":
            character.increase=-Math.abs(character.increase);
            character.dom.style.top=character.getYpos();
            break;
        case "right":
            character.increase=Math.abs(character.increase);
            character.dom.style.left=character.getXpos();
            break;
        case "bottom":
            character.increase=Math.abs(character.increase);
            character.dom.style.top=character.getYpos();
            break;
        default:
            break;
    }
}
//collisionFlag
var collisionFlag=0;
//玩家人物行走控制
function pMove(characterinfo,characterinfo1,obs) {
   // console.log(characterinfo.xpos-characterinfo1.xpos);
    //防止障碍物集合数量变化
    var obs=obs;
    obs.push(characterinfo1);
    var length=obs.length;
   // console.log(obs[length-1]);
    switch (dirKeyCode){
        case 37 ://左移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==1) {
                    collisionFlag=1;
                }
            if(collisionFlag!=1)
                cmove(characterinfo,"left");
            collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            break;
        case 38 ://上移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==3) {
                    collisionFlag=3;
                }
            if(collisionFlag!=3)
                cmove(characterinfo,"top");
            collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            break;
        case 39 ://右移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==2) {
                    collisionFlag=2;
                }
                //console.log(obs[3]);
            if(collisionFlag!=2)
                cmove(characterinfo,"right");
            collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            break;
        case 40 ://下移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==4) {
                    collisionFlag=4;
                }
            if(collisionFlag!=4)
                cmove(characterinfo,"bottom");
            collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            break;
        default :
            break;
    }
}

//npc行走控制
function npcMove(characterinfo,characterinfo1,obs) {
    //防止障碍物集合数量变化
    var obs=obs;
    obs.push(characterinfo);
    var length=obs.length;
     // if(characterinfo.collisionFlag!=0)
     //     clearInterval(gameover);
    //console.log(characterinfo.collisionFlag);
    // 简易自由运动算法
    var toWhere=Math.floor(Math.random()*4);
    switch (characterinfo1.moveFlag[0]){
        case 0 ://左移
            for(var i=0;i<length;i++)
                if(obs[i].npccollisionFlag==1) {
                    characterinfo1.moveFlag[0]=toWhere;
                    collisionFlag=1;
                }
            if(collisionFlag!=1)
                cmove(characterinfo1,"left");
            collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].npccollisionFlag=0;
            break;
        case 2 ://上移
            for(var i=0;i<length;i++)
                if(obs[i].npccollisionFlag==3) {
                    characterinfo1.moveFlag[0]=toWhere;
                    collisionFlag=3;
                }
            if(characterinfo1.collisionFlag!=3)
                cmove(characterinfo1,"top");
                collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].npccollisionFlag=0;
            break;
        case 1 ://右移
            for(var i=0;i<length;i++)
                if(obs[i].npccollisionFlag==2) {
                    characterinfo1.moveFlag[0]=toWhere;
                    collisionFlag=2;
                }
            //console.log(obs[3]);
            if(collisionFlag!=2)
                cmove(characterinfo1,"right");
            collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].npccollisionFlag=0;
            break;
        case 3 ://下移
            for(var i=0;i<length;i++)
                if(obs[i].npccollisionFlag==4) {
                    characterinfo1.moveFlag[0]=toWhere;
                    collisionFlag=4;
                }
            if(collisionFlag!=4)
                cmove(characterinfo1,"bottom");
            collisionFlag=0;
            for(var i=0;i<length;i++)
                obs[i].npccollisionFlag=0;
            break;
        default :
            break;
    }
    //简易自由运动算法
     if(characterinfo1.xpos<=0||characterinfo1.xpos>=characterinfo1.width||characterinfo1.ypos<=0||characterinfo1.ypos>=characterinfo1.height)
         characterinfo1.moveFlag[0]=toWhere;
   // console.log(characterinfo1.xpos);
}

//碰撞检测
function collisionCheck(obj1,obj2){
    //坐标差值
    var x=obj1.xpos-obj2.xpos;
    var y=obj1.ypos-obj2.ypos;
    var xabs=Math.abs(x);
    var yabs=Math.abs(y);

    switch (obj1.type){
        case "player":
            switch(obj2.type){
                case "obstacle":
                    if(x<=41&&x>=0&&yabs<=26)
                    //console.log("左侧返回");
                        obj2.collisionFlag=1;
                    if(x<=0&&x>=-33&&yabs<=26)
                    //console.log("右侧返回");
                        obj2.collisionFlag=2;
                    if(y<=35&&y>=0&&xabs<=28)
                    //console.log("上侧返回");
                        obj2.collisionFlag = 3;
                    if(y<=0&&y>=-43&&xabs<=28)
                    //console.log("下侧返回");
                        obj2.collisionFlag = 4;
                    break;
                case "npc":
                    if(x<=36&&x>=0&&yabs<22)
                    //console.log("左侧返回");{
                    {
                        obj2.collisionFlag=1;
                       gameFlag=1;
                    }

                    if(x<=0&&x>=-36&&yabs<22)
                    //console.log("右侧返回");
                    {
                        obj2.collisionFlag=2;
                        gameFlag=1;
                    }
                    if(y<=36&&y>=0&&xabs<22)
                    //console.log("上侧返回");
                    {
                        obj2.collisionFlag = 3;
                        // console.log(y);
                        gameFlag=1;
                    }
                    if(y<=0&&y>=-36&&xabs<22)
                    //console.log("下侧返回");
                    {
                        obj2.collisionFlag = 4;
                        gameFlag=1;
                    }
                    break;
                default :
                    break;
            };
            break;

        case "npc":
            switch(obj2.type){
                case "obstacle":
                    if(x<=41&&x>=0&&yabs<=26)
                    //console.log("左侧返回");
                        obj2.npccollisionFlag=1;
                    if(x<=0&&x>=-33&&yabs<=26)
                    //console.log("右侧返回");
                        obj2.npccollisionFlag=2;
                    if(y<=35&&y>=0&&xabs<=28)
                    //console.log("上侧返回");
                        obj2.npccollisionFlag = 3;
                    if(y<=0&&y>=-43&&xabs<=28)
                    //console.log("下侧返回");
                        obj2.npccollisionFlag = 4;
                    break;
                case "player":
                    if(x<=36&&x>=0&&yabs<22)
                    //console.log("左侧返回");
                        obj1.collisionFlag=1;
                    if(x<=0&&x>=-36&&yabs<22)
                    //console.log("右侧返回");
                        obj1.collisionFlag=2;
                    if(y<=36&&y>=0&&xabs<22)
                    //console.log("上侧返回");
                    {
                        obj1.collisionFlag = 3;
                        // console.log(y);
                    }
                    if(y<=0&&y>=-36&&xabs<22)
                    //console.log("下侧返回");
                    {
                        obj1.collisionFlag = 4;
                        //console.log(y);
                    }
                    break;
            };
            break;
        default:
            break;
    }
};

//障碍物碰撞检测
function occ(objamount,characterinfo) {
    for(var i=0;i<objamount;i++){
        (function (i) {
            setInterval(function () {
                collisionCheck(characterinfo,obstacleset[i]);
            },10);
        })(i);
    }
}

//基础障碍物集
var obstacleset=[];
//地图元素添加
function addElement(elements,scene) {
    var outside=elements.length;
    var inside=elements[0].length;
    for(var i=0;i<outside;i++){
        for(var j=0;j<inside;j++){
            if(elements[i][j]=="1"){
                obstacleset.push(new basicobj((j)*38,i*38+4));
                var element=document.createElement("img");
                element.src="src/img/obstacle.png";
                element.style.position="absolute";
                element.style.left=(j)*38+4+"px";
                element.style.top=i*38+"px";
                scene.appendChild(element);
            }
        }
    }
}
//地图绘制函数
function drawMap(file,scene) {
    var filePath=file;
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();    // 实例化对象
    xmlHttp.onreadystatechange = function()
    {
        if( xmlHttp.readyState == 4  && xmlHttp.status == 200 ){
            var str=xmlHttp.responseText;
            for(var i=0;i<11;i++) {
                str = str.replace('\r\n', "");
            }
            str=str.split('g');
            str.pop();
            var result;
            var outside=str.length;
            result=str[0].split("");
            for(var i=0;i<outside;i++){
                result[i]=str[i].split("");
            }
            var deletenum=result.length-outside;
            for(var i=0;i<deletenum;i++)
                result.pop();

            addElement(result,scene);
        }
    }
    xmlHttp.open( "GET",filePath, true );
    xmlHttp.send( null );
}

// -----------------------------------------------------------------------------------------------------

//游戏结束标志
var gameFlag=0;
//男孩人物获取
var boy=document.getElementById("boy");
//男孩人物信息
var boyinfo=new people(boy,0,0,2);

//人物动画帧切换速度
var animaSpeed=150;
//人物运动执行间隔
var moveSpeed=24;

//存储人物运动方向
var dirKeyCode=-1;
//停止行走标志
var pMoveFlag;

//触发人物动画播放
setInterval('pAnima(boyinfo)',animaSpeed);
//人物运动方向实时监听并触发人物行走
document.onkeydown=function () {
    if(dirKeyCode==-1&&!gameFlag) {
        pMoveFlag = setInterval('pMove(boyinfo,girlinfo,obstacleset)', moveSpeed);
    }
    if(gameFlag)
        clearInterval(pMoveFlag);
    dirKeyCode=event.keyCode;
};

//停止人物行走
document.onkeyup=function () {
    if(event.keyCode>36||event.keyCode<41) {
        clearInterval(pMoveFlag);
    }
    dirKeyCode=-1;
};

//----------------------------------------------------------------------------------------------------------------------
//女孩相关操作
//女孩人物获取
var girl=document.getElementById("girl");
//女孩人物信息
var girlinfo=new people(girl,380,500,2);
girlinfo.type="npc";
//触发女孩动画播放
setInterval('dirMove(girlinfo)',100);
//触发npc自由运动
var gameover=setInterval('npcMove(boyinfo,girlinfo,obstacleset)',40);
//clearInterval(gameover)

// function npcMove(characterinfo){
//     this.character=characterinfo;
//     setInterval('cmove(girlinfo,"top")',40);
// }
//
// npcMove(girlinfo);

// ------------------------------------------------------------------------------------------------------------------------
//游戏玩家与npc碰撞检测
setInterval('collisionCheck(boyinfo,girlinfo)',moveSpeed);
//游戏玩家碰撞检测开始
setTimeout('occ(obstacleset.length,boyinfo)',moveSpeed);
//npc碰撞检测开始
setTimeout('occ(obstacleset.length,girlinfo)',moveSpeed);
//clearInterval(gameFlag);
//setTimeout('clearInterval(gameFlag)',3000);
//地图读取及场景绘制
var file="src//gamemap//map.txt";
var scene=document.getElementById("back");
drawMap(file,scene);

setInterval(function () {
    var distance=Math.sqrt((boyinfo.xpos-girlinfo.xpos)*(boyinfo.xpos-girlinfo.xpos)+(boyinfo.ypos-girlinfo.ypos)*(boyinfo.ypos-girlinfo.ypos));
   // console.log(distance);
    if(distance<=40)
        clearInterval(gameover);
},10);

setInterval(function () {
    if(gameFlag) {
        alert("GameOver");
        for(var i=0;i<20;i++) {
            clearInterval(i);
        }
    }
},100);



