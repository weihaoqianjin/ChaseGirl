//基础障碍物信息
function basicobj(xpos,ypos){
    this.xpos=xpos;
    this.ypos=ypos;
    this.collisionFlag=0;
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
    //人物运动方向及当前状态帧
    this.moveFlag=moveFlag?moveFlag:[3,0];
    //人物碰撞检测标志
    this.collisionFlag=0;
    //位置初始化
    this.xpos=xpos?xpos:0;
    this.ypos=ypos?ypos:0;
    //活动边界
    this.width=width?width-32:600-32;
    this.height=height?height-32:640-32;
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

    if(stopFlag!=-1)
    {
        if(character.moveFlag[1]>=3)
            character.moveFlag[1]=0;
        var dirGo=character.movearr[character.moveFlag[0]][character.moveFlag[1]][0]+"px "+character.movearr[character.moveFlag[0]][character.moveFlag[1]][1]+"px";
        character.dom.style["background-position"]=dirGo;
        character.moveFlag[1]++;
    }

    if(character.id=="girl"){
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
//人物行走控制
function pMove(characterinfo,characterinfo1,obs) {
    //防止障碍物集合数量变化
    var obs=obs;
    obs.push(characterinfo1);
    var length=obs.length;
    var go=1;
    switch (dirKeyCode){
        case 37 ://左移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==1){
                    collisionFlag=1;
                    break;
                }
            if(collisionFlag!=1)
                cmove(characterinfo,"left");
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            collisionFlag=0;
            break;
        case 38 ://上移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==3){
                    collisionFlag=3;
                    break;
                }
            if(collisionFlag!=3)
                cmove(characterinfo,"top");
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            collisionFlag=0;
            break;
        case 39 ://右移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==2){
                    collisionFlag=2;
                    break;
                }
            if(collisionFlag!=2)
                cmove(characterinfo,"right");
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            collisionFlag=0;
            break;
        case 40 ://下移
            for(var i=0;i<length;i++)
                if(obs[i].collisionFlag==4){
                    collisionFlag=4;
                    break;
                }
            if(collisionFlag!=4)
                cmove(characterinfo,"bottom");
            for(var i=0;i<length;i++)
                obs[i].collisionFlag=0;
            collisionFlag=0;
            break;
        default :
            break;
    }
}

//碰撞检测
function collisionCheck(obj1,obj2){
    //坐标差值
    var x=obj1.xpos-obj2.xpos;
    var y=obj1.ypos-obj2.ypos;
    var xabs=Math.abs(x);
    var yabs=Math.abs(y);

    if(x<32&&x>0&&yabs<10)
    //console.log("左侧返回");
        obj2.collisionFlag=1;
    if(x<0&&x>-32&&yabs<10)
    //console.log("右侧返回");
        obj2.collisionFlag=2;
    if(y<32&&y>0&&xabs<10)
    //console.log("上侧返回");
        obj2.collisionFlag=3;
    if(y<0&&y>-32&&xabs<10)
    //console.log("下侧返回");
        obj2.collisionFlag=4;

};

//基础障碍物集
var obstacleset=[];

//地图元素添加
function addElement(elements,scene) {
    var outside=elements.length;
    var inside=elements[0].length;
    for(var i=0;i<outside;i++){
        for(var j=0;j<inside;j++){
            if(elements[i][j]=="1"){
                obstacleset.push(new basicobj(j*36,i*32+8));
                var element=document.createElement("img");
                element.src="src/img/obstacle.png";
                element.style.position="absolute";
                element.style.left=j*32+8+"px";
                element.style.top=i*32+"px";
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
var boyinfo=new people(boy,0,0,10);

//人物动画帧切换速度
var animaSpeed=200;
//人物运动执行间隔
var moveSpeed=100;

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

// ----------------------------------------------------------------------------------------------------------------------
//女孩相关操作
//女孩人物获取
var girl=document.getElementById("girl");
//女孩人物信息
var girlinfo=new people(girl,400,400,10);
//触发女孩动画播放
setInterval('dirMove(girlinfo)',200);

// ------------------------------------------------------------------------------------------------------------------------
//碰撞检测
setInterval('collisionCheck(boyinfo,girlinfo)',100);

//障碍物碰撞检测
function occ(amount) {
    for(var i=0;i<amount;i++){
        (function (i) {

            setInterval(function () {
                collisionCheck(boyinfo,obstacleset[i]);
            },100);
        })(i);
    }
}
setTimeout('occ(obstacleset.length)',100);


//地图读取及场景绘制
var file="src//gamemap//map.txt";
var scene=document.getElementById("back");
drawMap(file,scene);

