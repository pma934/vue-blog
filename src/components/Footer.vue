<template>
    <footer>
        <h1>{{title}}</h1>
    </footer>
</template>

<script>
export default{
    name:'Footer',
    data(){
        return{
            title:"footer_title"
        }
    },
}
</script>

<style scoped>
footer{
    background: rgba(255, 255, 255, 0.7);;
    padding: 6px;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    word-wrap:break-word;
}
h1{
    color:lawngreen;
}
</style>
