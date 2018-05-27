<template>
    <div id="app">
        <com-map></com-map>
    </div>

</template>
<script>
import '../../script/SuperMap/libs/SuperMap.Include'
import GCMap from './map'
export default {
    data:function(){
        return{

        }
    },
    components:{
        'com-map':GCMap
    },
    mounted:function(){

    },
    methods:{

    }
}
</script>
<style scoped>

</style>


