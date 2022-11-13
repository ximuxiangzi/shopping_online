<template>
    <div  class="loginBox zoomInDown animated animated-delay05">
        <!--  顶部 logo  -->
                <div class="logoBox">
                    <img src="@/assets/images/peoplelogo.jpg" alt="logo" width="120px" height="auto">
                    <span style="margin-left:62px">栗子后台管理系统</span>
                </div>
         <div class="login">
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
            >
                <h2 class="title">用户登录</h2>
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        type="text"
                        auto-complete="off"
                        placeholder="用户名"
                    >
                        <img
                            slot="prefix"
                            class="moban"
                            src="@/assets/images/login/moban.png"
                        />
                        <!--                        <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>-->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        auto-complete="off"
                        placeholder="密码"
                        @keyup.enter.native="handleLogin"
                    >
                        <img
                            slot="prefix"
                            class="mima"
                            src="@/assets/images/login/mima.png"
                        />
                        <!--                        <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>-->
                    </el-input>
                </el-form-item>
         
                <el-checkbox
                    v-model="loginForm.rememberMe"
                    class="rememberMeBox"
                    >记住密码</el-checkbox
                >
                <div class="removepass">忘记密码？</div>
                <el-form-item style="width: 100%">
                    <el-button
                        :loading="loading"
                        size="medium"
                        type="danger"
                        style="width: 100%"
                        class="loginBtn"
                        @click.native.prevent="handleLogin"
                    >
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 录 中...</span>
                    </el-button>
                  
                </el-form-item>
            </el-form>
       </div>
        <!--  底部  -->
        <div class="el-login-footer">
          <span>Copyright © 2022 栗子科技有限公司</span>
        </div>
    </div>
</template>

<script>
import { Login } from '@/api/login'
import {permissionList}from '@/api/sys'
import {setToken} from '@/utils/auth'

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
                rememberMe: false,
                code: "",
                uuid: ""
            },
            loginRules: {
                username: [
                    { required: true, trigger: "blur", message: "请输入您的账号" }
                ],
                password: [
                    { required: true, trigger: "blur", message: "请输入您的密码" }
                ],
                code: [{ required: true, trigger: "change", message: "请输入验证码" }]
            },
            loading: false,
        };
    },
    methods: {
        getSystem(){
            permissionList({}).then(res => {
                console.log(res)
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let data = {
                      mobile:this.loginForm.username,
                      password: this.loginForm.password
                    }
                      Login(data).then(res => {
                        console.log(res)
                        if(res.code !== 200 ){
                            alert('登录失败')
                        }else{
                          this.getSystem();
                          setToken(res.data.success_token)
                          this.$store.commit("my_userInfo",res.data.userInfo);
                          this.$router.push({ path: "/home" }).catch(() => {});
                        }
                        this.loading = false;
                      });
                      this.loading = false;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.loginBox {
    padding-left: 7%;
    padding-right: 12.5%;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url("../assets/images/login/BG.jpg");
    background-size: 100% 100%;
}
.loginDreTxt {
    display: flex;
    position: absolute;
     top: 339px;
     left: 159px;
    .log1 {
        width: 654px;
        height: 117px;
    }
    .title {
        font-size: 60px;
        font-weight: bold;
        line-height: 94px;
        width: 815px;
        color: #ffffff;
        text-shadow: 0px 7px 7px rgba(46, 110, 171, 0.6);
        -webkit-text-stroke: 1px #000000;
        text-stroke: 1px #000000;
        background: linear-gradient(0deg, #46f5fe 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .log2 {
        margin-top: 7px;
        width: 147px;
        height: 80px;
    }
}

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    //height: 100%;
    //width: 32%;
    width: 499px;
    min-height: 502px;
    position: absolute;
    top: 261px;
    right: 193px;
    //transform: translate(-50%, -50%);
}

.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #fff;
    letter-spacing: 6px;
    font-size: 38px;
    font-weight: 400;
}

.login-form {
    //position: relative;
    width: 100%;
    padding: 10px 60px 5px 60px;

    &::before {
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        //opacity: 0.2;
        border-radius: 6px;
        z-index: -1;
        background-image: url("../assets/images/login/s-BG.png");
        background-size: 100% 100%;
        //border: 1px solid #cf9d27cb;
        //box-shadow: 0 0 30px #6bfffe;
    }

    ::v-deep {
        .el-form-item {
            margin-bottom: 40px;
        }

        .el-input {
            height: 48px;

            input {
                height: 48px;
                line-height: 48px;
                background-color: rgba(255, 255, 255, 0.34);
                //border: none;
                border-radius: 6px;
                padding-left: 48px;
                color: #fff;
                border: 2px solid rgba(29, 191, 255, 0.5);
                //opacity: 0.6;
                //border-radius: 6px;

                &::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: #f1f1f1;
                    font-size: 14px;
                }

                &::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: #f1f1f1;
                    font-size: 14px;
                }

                &:-ms-input-placeholder {
                    /* Internet Explorer 10+ */
                    color: #f1f1f1;
                    font-size: 14px;
                }
            }
        }

        .el-form-item__error {
            color: #e21d25;
            letter-spacing: 2px;
        }
    }

    .input-icon {
        height: 48px;
        width: 20px;
        margin-left: 12px;
        color: #fff;
    }

    .loginBtn {
        padding: 14px 20px;
        font-size: 18px;
        border-radius: 6px;
        //background-color: #e21d25;
        border-color: transparent;

        width: 403px;
        height: 56px;
        background: linear-gradient(0deg, #0354FF, #1292FF);;
        border-radius: 6px;
    }
}

.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}

.login-code {
    width: 33%;
    height: 48px;
    float: right;

    img {
        cursor: pointer;
        vertical-align: middle;
    }
}

.login-code-img {
    height: 48px;
    width: 100%;
    cursor: pointer;
}

.rememberMeBox {
    margin: 0px 0px 16px 0px;

    ::v-deep {
        .el-checkbox__inner {
            width: 16px;
            height: 16px;
            border: 1px solid #00b8ff;
            background-color: transparent;
            &::after {
                border-color: #1a5285;
                left: 5px;
            }
        }

        .el-checkbox__label {
            font-size: 15px;
            color: #fff !important;
        }

        .el-checkbox__input {
            &.is-focus {
                .el-checkbox__inner {
                    border: 1px solid #dcdfe6;
                }
            }

            &.is-checked {
                .el-checkbox__inner {
                    border: 1px solid #dcdfe6;
                    background-color: #fff;
                }
            }
        }
    }
}

.error {
    font-size: 10px;
    background-color: rgba(255, 255, 255, 0.34);
    text-align: center;
    color: #f1f1f1;
    line-height: 20px;
    cursor: pointer;
    height: 100%;
}

.placeholder {
    font-size: 10px;
    background-color: rgba(255, 255, 255, 0.34);
    text-align: center;
    color: #f1f1f1;
    height: 100%;
}

.logoBox {
    position: fixed;
    top: 86px;
    left: 154px;
    color: #fff;
    font-size: 32px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
}

.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 42px;
    left:1300px;
    width: 100%;
    letter-spacing: 1px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    opacity: 0.5;
}
.moban {
    width: 22px;
    height: 22px;
    margin-left: 10px;
    margin-top: 12px;
}
.mima {
    width: 22px;
    height: 22px;
    margin-left: 10px;
    margin-top: 12px;
}
.removepass{
    float: right;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1BB7FF;
}
</style>
