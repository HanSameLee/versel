import { defineStore } from 'pinia'
//ㄴ store 정의하기 - 직역하면

export const todoStore = defineStore('todo', {
    //       ㄴ 이 이름과 뒤에 todo 적힌 부분의 이름은 다르게 해도 된다, but 같이 만들어주는게 덜 헷갈림
    // data
    state: () => ({
        // get으로 가지고온 todo - 
        todos: [],
        filters: {
            done : 'all',
            sortBy : 'none'
        }
    }),
    // computed
    getters: {
        filteredTodos(state) {
            let filteredTodos = [...state.todos]
            // 표시
            if (state.filters.done !== 'all' ) {
                filteredTodos = state.todos.filter(todo => {
                    switch (state.filters.done) {
                        case 'true' : 
                            return todo.done
                        case 'false' :
                            return !todo.done
                    }
                })
            }
            // 정렬
            if (state.filters.sortBy !== 'none') {
                filteredTodos.sort((a, b) => {
                    const aTime = new Date(a.createdAt).getTime()
                    const bTime = new Date(b.createdAt).getTime()
                    switch (state.filters.sortBy) {
                        case 'newst' : 
                            return bTime - aTime
                        case 'oldest' :
                            return aTime - bTime
                        default :
                            return 0
                    }
                })
            }
            return filteredTodos
        }
    },
    //m ethods
    actions: {
        async createTodo(title) {
            await request({
                method: 'POST',
                body: { title }
            })
            // 원래 기본 작성법인데 중복을 줄이기 위해 리퀘스트 함수를 만들고 위와 같이 호출
            // fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
            //     method: 'POST',
            //     headers:{

            //         'content-type': "application/json",
            //         apikey: "FinTech202207",
            //         username: "ShinBoKyung"

            //     },
            //     body: JSON.stringify({
            //         // 속성의 이름과 매개변수의 이름이 같으면 하나로 축약할 수 있다
            //         title
            //     })
            // })

            this.readTodos()
        },
        async readTodos() {
            this.todos = await request({
                method: 'GET',
            })
            console.log(this.todos)
        },
        async updateTodo(payload) {
            const { id, title, done, order } = payload
            await request({
                method: 'PUT',
                body: {
                    title,
                    done,
                    order,
                },
                id
            })
            this.readTodos()
        },
        async deleteTodo(id) {
            await request({
                method: 'DELETE',
                id
            })
            this.readTodos()
        },
        async reorderTodos({oldIndex, newIndex}) {
            const todoIds = this.todos.map(todo => todo.id)
            const oldId = todoIds[oldIndex] // copy
            todoIds.splice(oldIndex, 1)
            todoIds.splice(newIndex, 0, oldId)

            await request({
                id: 'reorder',
                method: 'PUT',
                body : {
                    todoIds
                }
            })
            await this.readTodos()
        }
    }
})

// 비동기 함수
async function request(options) {
    const { method, body, id = '' } = options
    const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`, {
        method,
        headers: {
            'content-type': "application/json",
            apikey: "FinTech202207",
            username: "ShinBoKyung"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}