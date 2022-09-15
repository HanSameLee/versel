<template>
  <div class="todo-item">
    <!-- true false 값 -->
    <input
      v-model="done"
      type="checkbox"
      @change="updateTodo" />
    <span class="order-handle">:::</span>
    <input
      :value="title"
      type="text"
      @input="title = $event.target.value"
      @change="updateTodo" />
    {{ dateFormatter(todo.createdAt) }}
    <button @click="todoStore.deleteTodo(todo.id)">
      삭제
    </button>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapStores } from 'pinia'
import { todoStore } from '~/store/todo.js'

export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            title: '',
            done: false
        }
    },
    computed: {
        ...mapStores(todoStore)
        //this.todoStore
    },
    created() {
        this.title = this.todo.title
        this.done = this.todo.done
    },
    methods: {
        dateFormatter(date) {
            return dayjs(date).format('YYYY.MM.DD')
        },
        updateTodo() {
            this.todoStore.updateTodo({
                id: this.todo.id,
                title: this.title,
                done: this.done
            })
        }
    }
}
</script>

<style>
</style>
