<template>
    <el-container class="outer-container">
        <el-header class="header-container">
            <p class="header-title">用户设置</p>
        </el-header>
        <el-container class="inner-container">
            <el-aside class="main-selector">
                <el-menu class="menu" @select="handleIndex" >
                    <el-menu-item class="menu-item" index="1" style="display: flex; align-items: center;">
                        <span slot="title" style="font-size: 20px; margin: auto;">通用设置</span>
                    </el-menu-item>
                    <el-divider style="margin:0"></el-divider>
                    <el-menu-item class="menu-item" index="2" style="display: flex; align-items: center;">
                        <span slot="title" style="font-size: 20px; margin: auto;">账号管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main>
                <div class="setting-container" v-if="activeIndex==='1'">
                    <div class="filter-container">
                        <el-form-item label="消息推送">
                            <el-checkbox-group :min="1" v-model="filterList" @change="handlefilterChange" >
                                <el-checkbox  v-for="(account,index) in accountList" :label="index" :key="index">
                                    <span class="checkbox-area">
                                        <img :src="account.image" class="iconimg"/>
                                    </span>
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <el-divider style="margin:0"></el-divider>
                    <div class="other-container">
                        <el-form-item label="更新频率(秒)">
                            <el-input-number
                                controls-position="right"
                                size="small"
                                v-model="updatetime"
                                :min="3"
                                :max="3600">
                            </el-input-number>
                            <span style="margin-left: 20px">
                            </span>
                        </el-form-item>
                        <el-form-item label="推送">
                            <el-switch 
                                v-model="push"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </div>
                </div>

                <div class="account-container" v-else>
                    <div class="account-card" v-for="(account,index) in accountList" :key="index" >
                        <img :src = "account.image" class="platform-image">
                        <div class="account-info">
                            <span>{{ account.name }}</span>
                            <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button quit-button">退出登录</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="account-card" >
                        <el-button type="text" class="button">添加账户</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>


    </el-container>
</template>

<script>

    export default{
        data(){
            return{
                activeIndex:'1',
                accountList: [
                    { image: new URL('../assets/biliblack.png', import.meta.url).href, name: "Account1" },
                    { image: new URL('../assets/weibo.png', import.meta.url).href, name: "Account2" },
                    { image: new URL('../assets/steam.png', import.meta.url).href, name: "Account3" }
                ],
                filterList: this.accountList,
                currentDate: "" ,
                updatetime:0,
                push:true,
            }    
        },
        methods:{
            handleIndex(index){
                this.activeIndex = index
                // console.log(this.activeIndex)
            },
            handlefilterChange(value){

            },
            
        },




    }
</script>

<style>
.el-container{
    background-color: aquamarine;
}
.header-title{
    font-size: 30px;
    color: white;
}
.outer-container{
    height: 700px;
}

.header-container{
    background-color: #409EFF;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-main{
    background-color:white;
}
.el-aside{
    --el-aside-width: 150px;
    background-color: #DCDFE6
}
.main-selector{
    display: flex;
    flex-direction: column;
}
.menu{
    flex: 1;
    display: flex;
    flex-direction: column;
}
.menu-item{
    flex: 1;
}
.setting-container{
    display: flex;
    flex-direction: column;
    
}
.other-container{
    margin-top: 50px;
}
.checkbox-area {
    display: flex;
    align-items: center;
    .iconimg {
        margin-right: 5px;
        width: 30px;
    }
}

.account-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.el-card {
    overflow: visible;
}
.account-card{
    height: 100px;
    width: 250px;
    margin: 20px;
    display: flex;
    flex-direction: row;
    box-shadow: var(--el-box-shadow-light);
}
.platform-image{
    margin:10px 0 0 10px;
    max-width: 100%;
    max-height: 60%;
    object-fit: contain;
}
.account-info{
    width: 100%;
    padding: 15px;
    position: relative;
}
.quit-button{
    position:absolute;
    right: 15px;
    bottom: 15px;
}
</style>