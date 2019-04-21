//index.js
//获取应用实例


Page({
  data:{
    // 文本框的数据模型
    search:"",
    // 任务清单数据
    todos:[
      { name:"Learnning HTML", completed:false},
      { name:"Learnning JavaScript", completed: true},
      { name:"Learnning CSS", completed: false}
    ],
    leftCount:2,
    all:false
    },
  addTodoHandle: function () {
    // console.log(this.data.search)
    if(!this.data.search) return
    var todos = this.data.todos;
      todos.push({
      name:this.data.search,
      completed:false
    })
    // 必须显示的通过setData去改变数据 同步到界面上
    this.setData({
      todos:todos,
      search:'',
      leftCount:this.data.leftCount + 1
    })

  },
  change:function(e){
    // console.log(e)
    // console.log(e.detail.value)
      this.setData({
      search:e.detail.value
    })
  },
  toggle:function(e){
    // console.log(e.currentTarget.dataset.index)
    var item = this.data.todos[e.currentTarget.dataset.index];
    // console.log(item)
    item.completed = !item.completed
    // 根据任务的完成状态决定添加或者减少
    var leftCount = this.data.leftCount + (item.completed ? -1 : 1)
    // 因为上一步操作中修改的已经是原本todos里的值了 下面只要直接重新赋值就好了
    this.setData({
      todos:this.data.todos,
      leftCount:leftCount
    })
  },
  removeHandle:function(e){
    var index = e.currentTarget.dataset.index;
    var todos = this.data.todos
    // item 就是splice方法删除掉的元素
    var item = todos.splice(index,1)[0]
    var leftCount = this.data.leftCount - (item.completed ? 0 : 1)

    this.setData({
      todos:todos,
      leftCount:leftCount
    })
  },
  toogleAll:function(){
    this.data.all = !this.data.all
    var todos = this.data.todos
    todos.forEach(item =>{
      item.completed = this.data.all
    })
    var leftCount = this.data.all ? 0 : this.data.todos.length
    this.setData({
      todos: todos,
      leftCount:leftCount
    })
  },
  clearHandle:function(){
    var todos = this.data.todos.filter(item =>{
      return !item.completed
    })
    this.setData({
      todos: todos
    })
  }
})
