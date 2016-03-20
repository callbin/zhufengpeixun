
function getIndex(ele){//表示计算ele这个元素的索引号
	var index=0;
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			index++;	
		}
		p=p.previousSibling;
	}
	return index;
}