/**
 * @author yanghaitao, 178224406@qq.com
 * @version 1.0.0
 * @date 2017-08-28
 */
const state = {	 
    frontData: [],
    current:{},
    parent:[],
    deteleId:[]
}
 
const getters = {
	getFrontInfo: state => state.frontData,
    getDeteleArrId: state => state.deteleId
}

const mutations = {
	fetchFrontData(state, data){
        let arr = data.list;
        let parentId = data.parentId;
        let mode = data.mode;

        // 初始化状态  只有第一级分类显示其它分类隐藏
        let init = function(arr){
            if(arr && arr.length>=1){
                arr.forEach(item=>{
                    item.show = false;
                    item.checked = false;
                    if(item.children && item.children.length>=1){
                        init(item.children);
                    }
                })
            }  
        }

        // 遍历数组，根据当前id找到对应的分类对象
        let _traversalArr =function(catId, arr) {
            for(let i in arr){       
                if(arr[i].catId == catId){
                    state.current = arr[i];
                    state.parent = arr;
                    break;
                }else{
                    _traversalArr(catId, arr[i].children);
                }    
            }
        }

        init(arr);


        if(mode=="display"){
            // 一级分类默认展示
            if(parentId==0 || !parentId){
                state.frontData = arr;
                return
            }

            _traversalArr(parentId, arr);

            arr.forEach(item => {
                // 需要展示的二级分类
                if(state.current.parentId == 0){
                    if(state.current.catId == item.catId){
                        if(item.children){
                            item.children.forEach( subitem =>{
                                subitem.show = true 
                            })
                        }
                    }
                // 需要展示的三级分类
                }else{
                    if(item.catId == state.current.parentId){
                        if(item.children){
                            item.children.forEach( subitem =>{
                                subitem.show = true;
                                if(state.current.children){
                                    state.current.children.forEach(sub=>{
                                        sub.show = true;
                                    })
                                }
                            })
                        } 
                    }
                }    
            })
        }

		state.frontData = arr;
	},

	handleFrontData(state, data){
		let catId = data.catId || 0;
        let mode = data.mode || "";
        let checked = data.checked;

        // 遍历数组，根据当前id找到对应的分类对象
        let _traversalArr =function(catId, arr, mode) {
            for(let i in arr){       
                if(arr[i].catId == catId){
                    if(mode=="delete"){
                        arr.splice(i,1);    //  删除店铺分类
                        state.current = null;
                        break;          
                    }else{
                        state.current = arr[i];
                        state.parent = arr;
                    }
                    break;
                }else{
                    _traversalArr(catId, arr[i].children, mode);
                }    
            }
        }

        let init = function(arr, val){
            if(arr && arr.length>=1){
                arr.forEach(item=>{
                    item.checked = val;
                    if(val){
                        addId(item)
                    }else{
                        removeId(item)
                    }
                    if(item.children && item.children.length>=1){
                        init(item.children, val);
                    }
                })
            }  
        }

        let removeId = function(obj){
            for(let i=0; i<state.deteleId.length; i++){
                if(state.deteleId[i].idsArr == obj.catId ){
                    state.deteleId.splice(i,1)
                }
            }
        }

        let addId = function(obj){
            let repeat = false
            let idsArr = obj.catId
            let level = obj.level
            for(let i=0; i<state.deteleId.length; i++){
                if(state.deteleId[i] && state.deteleId[i].idsArr == idsArr ){
                    repeat = true
                    break;
                }
            }
            if(!repeat){
                state.deteleId.push({idsArr:idsArr,level:level})
            }
        }

        //  点击展开和搜索
        if(mode == 'toggle'){
            _traversalArr(catId, state.frontData);
            if(state.current && state.current.children){
                state.current.children.forEach((item, index)=>{
                    item.show = !item.show
                })
            }
        }
        
        // 选择要删除所有选中的元素
        if(mode == 'delete'){  
            for(let i=0; i<state.deteleId.length; i++){
                let id = state.deteleId[i].idsArr;
                _traversalArr(id, state.frontData, mode)
            }
            state.deteleId = []
        }

        // 选择要删除的id
        if(mode == 'checkbox'){
            _traversalArr(catId, state.frontData, mode);
            if(state.current){
                state.current.checked = checked;
                if(checked){
                    addId(state.current)
                }else{
                    removeId(state.current)
                }
                if(state.current.children){
                    state.current.children.forEach(item=>{
                        item.checked = checked
                        if(checked){
                            addId(item)
                        }else{
                            removeId(item)
                        }
                        if(item.children){
                            item.children.forEach(subitem=>{
                                subitem.checked = checked
                                if(checked){
                                    addId(subitem)
                                }else{
                                    removeId(subitem)
                                }    
                            })
                        }
                    })
                }
            }
        }

        // 全选 or 取消全选
        if(mode == 'selectAll'){
            init(state.frontData, data.val)   
        }

        // 上移
        if(mode == 'moveUp'){
            _traversalArr(catId, state.frontData)
            for(let i=0; i<state.parent.length; i++){
                if(state.parent[i].catId == catId){
                    let temp = state.parent.splice(i,1)
                    state.parent.splice(i-1, 0, temp[0])
                    break;
                }
            }  
        }

        // 下移
        if(mode == 'moveDown'){
            _traversalArr(catId, state.frontData)
            for(let i=0; i<state.parent.length; i++){
                if(state.parent[i].catId == catId){
                    let temp = state.parent.splice(i,1)
                    state.parent.splice(i+1, 0, temp[0])
                    break;
                }
            }  
        }
	}
}
	 
const actions = {

}
 
export default{ 
    state,
	getters, 
   	actions, 
    mutations 
}