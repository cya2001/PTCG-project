<template>
    <div class="item-container" >
        <div class="item-card" v-for="item in cardlist" :key="item.id">
            <div class="form-check check-box">
            <input class="form-check-input" type="checkbox" v-model="item.selected" :id="item.id" @change="handleChangeCount">
            </div>
            <img class="card-image" :src="item.img">
            <div class="card-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-value">${{ item.value }}</div>
                <el-input-number class="count" v-model="item.count" 
                    @change="handleChangeCount"   label="描述文字">
                </el-input-number>
            </div>
            
        </div>
    </div>
</template>

<script>

export default {
    name: "App",
    
    props:{
        cardlist:{
            type:Array,
            requried:true,
            default:[],
        }
    },
    data(){
        return{
            // newCardList:[],
        }
    },
    methods:{
        handleChangeCount(updatedCardList){
            // console.log(this.cardlist)
        }
    }

};
</script>

<style lang="less" scoped>
.item-container{
    display: flex;
    flex-direction: column;
}
.item-card{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px;
    border: 5px solid rgb(209, 208, 208);
    height: 430px;
    .form-check-input{
        height: 40px;
        width: 40px;
        border-radius: 80%;
        margin: 0 25px 0 5px;
    }
    .card-image{
        height: 400px;
        margin: 10px;
        padding: 10px;

    }
    }
.card-info{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    position: relative;
    .item-name{
        position: absolute;
        top: 50px;
        font-size: 40px;
    }
    .item-value{
        position: absolute;
        bottom: 50px;
        font-size: 40px;
    }
    .count{
        width: 150px;
        height: 50px;
        position: absolute;
        right: 30px;
        bottom: 50px;

    }
    /deep/.el-input__inner{
        font-size: 30px;
        font-style: italic;
    }

}


</style>