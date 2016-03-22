var c = {};
c.win = function(attr,value){
    if(typeof value =="undefined"){
        return document.documentElement[attr]||document.body[attr];
    } else{
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
}