<template>
    <div class="headerAll">
        <div class="logo">
            <h3>CAMP US</h3>
        </div>
        <div class="menu">
            <span>캠핑장 조회</span>
            <span>찜 목록 조회</span>
            <span>리뷰 조회</span>
            <span>예약 조회</span>
        </div>
        <div class="login">
            <p>login</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.headerAll {
    display: grid;
    grid-template-columns: 100px auto 100px;
    background-color: #E6E6E6;
    height: 70px;
}

.logo {
    align-self: center;
    justify-self: center;
}

.logo h3{
    margin: 0;
}

.menu {
    align-self: center;
}

.menu span{
    margin-left: 10px;
}

.login {
    align-self: center;
    justify-self: center;
}

.login p {
    margin: 0;
    
}


</style>