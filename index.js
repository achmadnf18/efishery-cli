const TodoStore = require('./models/todo');
const UserStore = require('./models/user');

const init = async () => {
    await UserStore.initialize();
    await TodoStore.initialize();
    await TodoStore.initializeRemote();
}

const closeConn = async () => {
    await UserStore.deinitialize();
    await TodoStore.deinitialize();
}

const listTodo = async () => {
    await init();
    const todoList = await TodoStore.fetchData();
    todoList.map(v => console.info({ 
        text: v.text, 
        _id: v._id, 
        _rev: v._rev,
        dirtyAt: v.dirtyAt,
        is_complete: v.is_complete || false, 
        uploaded: TodoStore.checkIsUploaded(v) 
    }));
    await closeConn();
    console.log('Finish fetching data !')
}

const createTodo = async (todo) => {
    await init();
    await TodoStore.addItem({
        text: todo.title,
        is_complete: false
    }, UserStore.data)
    await closeConn();
    console.log('Success create data !')
}

const syncTodo = async () => {
    try{
        await init();
        await TodoStore.upload();
        await closeConn();
        console.log('Success upload data !')
    }catch(e){
        console.log(e.message);
    }
}

const updateTodo = async (_id, todo) => {
    await init();
    await TodoStore.editItem(_id, {
        text: todo.title
    }, UserStore.data)
    await closeConn();
    console.log('Success update data !')
}

const deleteTodo = async (_id) => {
    await init();
    await TodoStore.deleteItem(_id, UserStore.data)
    await closeConn();
    console.log('Success delete data !')
}

const findTodo = async (title) => {
    await init();
    const todoList = await TodoStore.getDocuments({
        selector: {
            text: title
        },
        fields: ['_id', 'text', 'is_complete'],
        sort: ['text']
    })
    await closeConn();
    console.log(todoList);
}

const finishTodo = async (_id) => {
    await init();
    await TodoStore.editItem(_id, {
        is_complete: true
    }, UserStore.data)
    await closeConn();
    console.log('Success complete todo');
}

// Export All Methods
module.exports = {
    listTodo,
    createTodo,
    syncTodo,
    updateTodo,
    findTodo,
    deleteTodo,
    finishTodo
}
