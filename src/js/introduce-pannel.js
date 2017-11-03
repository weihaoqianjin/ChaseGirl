//切换角色
function changeCharactor(num){
    num=Math.abs(num)%3;
    var setAvatar=document.getElementById("avatar");
    setAvatar.style['background-image']='url("src/img/'+avatar[num]+'")';
    var setWork=document.getElementById("work");
    setWork.innerHTML=work[num];
    var setSign=document.getElementById("sign");
    setSign.innerHTML=sign[num];
    var setSkill=document.getElementById("skill");
    setSkill.innerHTML=skill[num];
    var setTool=document.getElementById("tool");
    setTool.innerHTML=tool[0];
    var order=document.getElementById("order");
    order.innerHTML=num+1+"/"+amount;
}
//角色切换控制
function choose() {
    var pannel=document.getElementById("introduce-pannel");
    if(show){
        pannel.style.opacity=0;
        show=0;
    }
    else{
        pannel.style.opacity=1;
        show=1;
    }

}

var work=["程序员","Demon少爷","Sunny Boy"];
var sign=["好的男人就像别人调好的软件，只不过他一身bug的时候，你没遇见而已。","当我展开恶魔双翼的时候，你就放弃奔跑吧，前面已经无路可逃了。","来吧，追逐阳光和我一起在球场奔跑吧。"];
var skill=["有几率让女主瞎眼倒追。","可飞跃一块障碍物包括墙壁。","投出篮球砸晕女主。"];
var tool=["暂无"];
var avatar=["programmer.png","demon.png","sport.png"];
var amount=work.length;
var position=0;
var show=0;
var larr=document.getElementById("larr");
larr.onclick=function(){
    changeCharactor(--position);
};
var rarr=document.getElementById("rarr");
rarr.onclick=function(){
    changeCharactor(++position);
}
