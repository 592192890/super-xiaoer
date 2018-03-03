/**
 * @author yanghaitao, 178224406@qq.com
 * @version 1.0.0
 * @date 2017-08-11
 */
const state = {	 
    cData: [],
    current:{},
    parent:[]
}
 
const getters = {
	getInfo: state => state.cData,
    getParentCtn: state => state.current
}

const mutations = {
	fetchData(state, data){
        let arr = data.list;
        let parentId = data.parentId;
        let id = data.id;
        let mode = data.mode;

        // 初始化状态  只有第一级分类显示其它分类隐藏
        let init = function(arr){
            if(arr && arr.length>=1){
                arr.forEach(item=>{
                    item.show = false;
                    if(item.children && item.children.length>=1){
                        init(item.children);
                    }
                })
            }  
        }

        // 遍历数组，根据当前id找到对应的分类对象
        let _traversalArr =function(id, arr) {
            for(let i in arr){       
                if(arr[i].id == id){
                    state.current = arr[i];
                    state.parent = arr;
                    break;
                }else{
                    _traversalArr(id, arr[i].children);
                }    
            }
        }

        init(arr);


        /*mode = 'display'
        parentId =1;
        id = 3;*/

        if(mode=="display"){
            // 一级分类默认展示
            if(parentId==0 || !parentId){
                state.cData = arr;
                return
            }

            _traversalArr(parentId, arr);

            arr.forEach(item => {
                // 需要展示的二级分类
                if(state.current.parentId == 0){
                    if(state.current.id == item.id){
                        item.children.forEach( subitem =>{
                            subitem.show = true 
                        })
                    }
                // 需要展示的三级分类
                }else{
                    if(item.id == state.current.parentId){
                        item.children.forEach( subitem =>{
                            subitem.show = true;
                            state.current.children.forEach(sub=>{
                                sub.show = true;
                            })
                        })
                    }
                }    
            })
        }

		state.cData = arr;
	},

	handleData(state, data){
		let id = data.id || 0;
        let mode = data.mode || "";
        let order = data.order||"";

        // 遍历数组，根据当前id找到对应的分类对象
        let _traversalArr =function(id, arr, mode) {
            for(let i in arr){       
                if(arr[i].id == id){
                    if(mode=="delete"){
                        arr.splice(i,1);    //  删除店铺分类
                        state.current = null;           
                    }else{
                        state.current = arr[i];
                        state.parent = arr;
                    }
                    break;
                }else{
                    _traversalArr(id, arr[i].children, mode);
                }    
            }
        }

        // true 全部展开  false 全部收缩
        let isFolder = function(data, bool){
            if(data && data.length>=1){
                data.forEach(item=>{
                    item.show = bool;
                    if(item.children && item.children.length>=1){
                        isFolder(item.children, bool);
                    }
                })
            }  
        }

        //  删除店铺分类
        if(mode == 'delete'){    
            _traversalArr(id, state.cData, mode); 
        }

        //  点击展开和搜索
        if(mode == 'toggle'){
            _traversalArr(id, state.cData);
            if(state.current && state.current.children){
                state.current.children.forEach((item, index)=>{
                    item.show = !item.show
                })
            }
        }

        if(mode == 'isFolder'){
            isFolder(state.cData, data.val);
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