<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

</script>

<style lang="scss">
*{
  margin: 0px;
  padding: 0px;
  text-decoration: none;
}
#app{
    position: absolute;
    background-color: #FFFFFF;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
@media screen and (min-width:500px){
	html{font-size: 1px;}
} 
@media screen and (min-width:600px){
	html{font-size: 12px;}
}
@media screen and (min-width:960px){
	html{font-size: 13px;}
}
@media screen and (min-width:1055px){
	html{font-size: 14px;}
} 
@media screen and (min-width:1300px){
	html{font-size: 15px;}
}
 @media screen and (min-width:1480px){
	html{font-size: 16px;}
} 
@media screen and (min-width:1920px){
	html{font-size: 17px;}
}
</style>