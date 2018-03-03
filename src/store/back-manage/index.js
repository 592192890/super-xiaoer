/**
 * @author yanghaitao, 178224406@qq.com
 * @version 1.0.0
 * @date 2017-09-06
 */
const state = {	 
    backData: [],
    current:{},
    parent:[],
    deteleId:[]
}
 
const getters = {
	getBackInfo: state => state.backData,
    getDeteleId: state => state.deteleId
}

const mutations = {
	fetchBackData(state, data){
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
        let _traversalArr =function(catbackId, arr) {
            for(let i in arr){       
                if(arr[i].catbackId == catbackId){
                    state.current = arr[i];
                    state.parent = arr;
                    break;
                }else{
                    _traversalArr(catbackId, arr[i].children);
                }    
            }
        }

        init(arr);


        if(mode=="display"){
            // 一级分类默认展示
            if(parentId==0 || !parentId){
                state.backData = arr;
                return
            }

            _traversalArr(parentId, arr);

            arr.forEach(item => {
                // 需要展示的二级分类
                if(state.current && state.current.parentId == 0){
                    if(state.current.catbackId == item.catbackId){
                        if(item.children){
                            item.children.forEach( subitem =>{
                                subitem.show = true 
                            })
                        }
                    }
                // 需要展示的三级分类
                }else{
                    if(item.catbackId == state.current.parentId){
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

		state.backData = arr;
	},

	handleBackData(state, data){
		let catbackId = data.catbackId || 0;
        let mode = data.mode || "";
        let checked = data.checked;

        // 遍历数组，根据当前id找到对应的分类对象
        let _traversalArr =function(catbackId, arr, mode) {
            for(let i in arr){       
                if(arr[i].catbackId == catbackId){
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
                    _traversalArr(catbackId, arr[i].children, mode);
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
                if(state.deteleId[i].id == obj.catbackId ){
                    state.deteleId.splice(i,1)
                }
            }
        }

        let addId = function(obj){
            let repeat = false
            let id = obj.catbackId
            let level = obj.level
            for(let i=0; i<state.deteleId.length; i++){
                if(state.deteleId[i] && state.deteleId[i].id == id ){
                    repeat = true
                    break;
                }
            }
            if(!repeat){
                state.deteleId.push({id:id,level:level})
            }
        }

        //  点击展开和搜索
        if(mode == 'toggle'){
            _traversalArr(catbackId, state.backData);
            if(state.current && state.current.children){
                state.current.children.forEach((item, index)=>{
                    item.show = !item.show
                })
            }
        }
        
        // 删除所有选中的元素
        if(mode == 'delete'){  
            for(let i=0; i<state.deteleId.length; i++){
                let id = state.deteleId[i].id;
                _traversalArr(id, state.backData, mode)
            }
            state.deteleId = []
        }

        // 选择准备要删除的id
        if(mode == 'checkbox'){
            _traversalArr(catbackId, state.backData, mode);
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
            init(state.backData, data.val)   
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