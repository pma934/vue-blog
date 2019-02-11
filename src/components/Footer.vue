<template>
    <footer>
        <a href="https://github.com/pma934">github.com/pma934</a>
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
    background: #333;
    padding: 6px;
    text-align: center;
    word-wrap:break-word;
}
footer a{
    color: white;
    cursor: pointer;
    text-decoration: none;
}
</style>
