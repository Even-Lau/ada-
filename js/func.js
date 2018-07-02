/**
 * Created by Administrator on 2017/9/8.
 */
;function slideUpSlideDown(button,target,minheight,maxheight,time){

    var timer = null;
    var toggled = false;



    target.style.height = minheight + 'px'; //not so imp,just for my example
    button.onclick = function() {
        clearInterval(timer);
        /*获取当前高度*/
        var currentHeight = parseInt(target.style.height);  // Current height
        /*获取开始时间*/
        var initTime = (new Date()).getTime(); //start time
        /*点击前为最小值时，此时height为最大值
        * 点击前为最大值时，此时height为最小值*/
        /*即高度将要到达的值*/
        var toHeight = (toggled = !toggled) ? maxheight: minheight; //if toggled

        var heightDifference = toHeight - currentHeight;
        timer = setInterval(function() {
            var animatingTime = (new Date()).getTime() - initTime; //animating time
            if(animatingTime <= time ) { //0 -> time seconds
                var pos = currentHeight + Math.floor(heightDifference * animatingTime / time);
                target.style.height =  pos + 'px';
            }else {
                target.style.height = toHeight + 'px'; //safety side ^^
                clearInterval(timer);
            }
        },1);
    };
};
function slideLeftSlideRight(button,target,minwidth,maxwidth,time){

    var timer = null;
    var toggled = false;



    target.style.width = minwidth + 'px'; //not so imp,just for my example
    button.onclick = function() {
        clearInterval(timer);
        /*获取当前高度*/
        var currentWidth = parseInt(target.style.width);  // Current height
        /*获取开始时间*/
        var initTime = (new Date()).getTime(); //start time
        /*点击前为最小值时，此时height为最大值
         * 点击前为最大值时，此时height为最小值*/
        /*即高度将要到达的值*/
        var toWidth = (toggled = !toggled) ? maxwidth: minwidth; //if toggled

        var widthDifference = toWidth - currentWidth;
        timer = setInterval(function() {
            var animatingTime = (new Date()).getTime() - initTime; //animating time
            if(animatingTime <= time ) { //0 -> time seconds
                var pos = currentWidth + Math.floor(widthDifference * animatingTime / time);
                target.style.width =  pos + 'px';
            }else {
                target.style.width = toWidth + 'px'; //safety side ^^
                clearInterval(timer);
            }
        },1);
    };
};