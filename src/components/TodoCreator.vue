<template>
    <div class="todo-creator">
        <!-- 한글입력시 브라우저 문제로 v-model 사용x -->
        <input
        :value="title"
        type="text"
        placeholder="할 일을 추가하세요!"
        @input="title = $event.target.value"
        @keydown.enter="createTodo" />
        <button @click="createTodo">추가</button>
    </div>
</template>

<script>
    import { mapStores } from 'pinia';
    import { todoStore } from '~/store/todo.js';

    export default {
        data () {
            return {
                title:''
            }
        },
        computed:{
            ...mapStores(todoStore)
            // todo.js const -> todoStore(이름을 지정하는 변수)
            // 현재 스토어에서 todoStore를 맵핑해서 사용하겠다
        },
        methods:{
            createTodo(event) {
                // 한글 분석 오류때문에 2번 동작해서 아래 코드 삽입(한글일때만!)
                if (event.isComposing) return
                if (!this.title.trim()) return
                this.todoStore.createTodo(this.title)
                // todo.js defineStore 뒤의 이름
                this.title=''
            }
        }
    }
</script>