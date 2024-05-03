<template>
    <div class="footer-container">
        <div class="form-check check-box">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                全选
            </label>
        </div>
        <div class="sum-container">
            <span class="price">总金额：</span> 
            <button type="button" class="btn btn-primary btn btn-lg">提交</button>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>

<style lang="less" scoped>
.footer-container{
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 100%;
    background-color: #409EFF;
    display: flex;
    justify-content: space-around;
}
.check-box{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1;
    .form-check-input{
        position: absolute;
        left: 50px;
        width: 30px;
        height: 30px;
        border-radius: 80%;
    }
    .form-check-label{
        position: absolute;
        left: 70px;
        font-size: 35px;
        color: white;
    }
}
.sum-container{
    display: flex;
    justify-content: center;
    align-items: center;
    .price{
        font-size: 35px;
        color: white
    }
    .btn{
        --bs-btn-font-size: 30px;
        margin: 0 20px 0 150px;
    }
}
</style>