<template>
    <div>
        <div v-for="(item,index) in data" :key="index" class="item">
            {{item.type}}
            <digui :data="item.children" v-if="item.children"></digui>
        </div>
    </div>
</template>

<script>
export default {


name:"digui",
props:["data"]
}
</script>

<style>
.item>div{
    margin-left: 20px;
}
</style>
