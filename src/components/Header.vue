<template>
    <div class="header">
        <div class="header-left">
            <div class="collapse" @click="toggle(isToggle)">
                <component :is="isToggle?fold:expand" style="width: 20px; height:20px;margin-left:10px"/>
            </div>
            <div class="search">
                <el-icon size="16" color="#666">
                    <Search />
                </el-icon>
                <input class="search-input" type="text" placeholder="Search everything">
            </div>
        </div>
        
        <div class="header-info">
            <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                    <!-- 默认头像 -->
                    <div class="user-avatar">
                        <img :src="userInfo.image ? userInfo.image : 'src/assets/img/unLogin.jpg'" alt="avatar" />
                    </div>
                    <div class="username">
                        {{ userInfo.username }}
                    </div>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="home">个人中心</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
        </div>
    </div>
    <el-dialog title="Personal Center" v-model="dialogUserVisible" width="400px">
      <el-form :model="userInfo" label-width="100px">
        <el-form-item label="username">
          <el-input v-model="userInfo.username" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="image">
            <upload-pic
            style="width: 260px"
            ref="uploadImageRef"
            :fileList="FileList"
            @success-callback="fileChangePic"
            @remove-callback="fileChangePic"
          >
          </upload-pic>
        </el-form-item>
        <!--底部按钮区域-->
        <el-form-item class="form-bottom">
            <lx-button type="info" style="margin-left: 15px;" @click="cancelEdit">Cancel</lx-button>
            <lx-button type="primary" style="margin-left: 20px;" @click="confirmEdit">Confirm</lx-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import router from '@/router'
import uploadPic from "./uploadPic.vue";
import { getCurrentUser, setCurrentUser, removeCurrentUser, removeToken } from '@/utils/auth'
import emitter from '@/utils/eventBus';
import { editUser, getUserId } from '@/api/user';
import { ElMessage } from 'element-plus';

export default defineComponent({

    components: {uploadPic},
    setup() {
        const isToggle = ref(true);
        const fold = ref("Fold")
        const expand = ref("Expand")
        const dialogUserVisible = ref(false)
        // 解构失去响应式
        const user: any = reactive({
            userInfo: {},
        });
        // 用 toRefs()方法为它们添加响应性
        const { userInfo } = toRefs(user);
        const FileList:any = ref([])
        userInfo.value = getCurrentUser()
        // 用户名下拉菜单选择事件
        function handleCommand(command:string) {
            // 退出登录
            if (command === "loginout") {
                removeToken()
                removeCurrentUser()
                router.push({ path: '/login' })
            }
            if (command === 'home') {
                dialogUserVisible.value = true
                
                // fileList格式必须要按照name,url的形式（可以参考element ui中文件格式），这里通过接口数据完成图片回显
                FileList.value = [{ name: new Date(), url: userInfo.value.image }];
                console.log(FileList.value)
            }
        }

        function toggle(data: boolean) {
            isToggle.value = !data
            emitter.emit('changToggle',data)
        }

        function fileChangePic (UploadObject: any) {
            const file: any = Object.values(UploadObject);
            userInfo.value.image = "https://www.gqgwr.cn" + file[0].message;
            FileList.value = file;
        }

        // 确认
        function confirmEdit () {
            editUser(userInfo.value)
                .then((res: any) => {
                if (res.code == 200) {
                    ElMessage({
                        type: "success",
                        message: "Successfully modified!",
                    });
                }
                dialogUserVisible.value = false;
                    setCurrentUser(res.data)
                    userInfo.value = res.data
                })
                .catch((err) => {
                    ElMessage({
                        type: "error",
                        message: "Fail to Edit!",
                    });
                console.log(err);
            });
        }

        function cancelEdit () {
            dialogUserVisible.value = false;
        };

        return {
            expand,
            fold,
            isToggle,
            userInfo,
            FileList,
            dialogUserVisible,
            toggle,
            handleCommand,
            fileChangePic,
            cancelEdit,
            confirmEdit
        }     
    },
})
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        box-shadow: rgba(179, 125, 241, 0.15) 0px 11px 13px -8px;
        border-bottom: 1px solid #e8e8e8;
        height: 100%;
        .header-left {
            display: flex;
            align-items: center;
            .collapse {
                display: flex;
                align-items: center;
            }
            .search {
                margin-left: 10px;
                border-radius: 25px;
                background: rgb(243, 243, 255);
                padding-left: 20px;
                display: flex;
                align-items: center;
                height: 32px;
                .search-input {
                    width: 250px;
                    margin-left: 8px;
                    height: 30px;
                    border: none;
                    background: transparent;
                    outline: none;
                    font-size: 12px;
                }
                .search-input::-webkit-input-placeholder{
                    font-size: 12px;
                    color: #99969c;
                }
                .search-input::-moz-placeholder{  
                    font-size: 12px;
                    color: #99969c;
                }
                .search-input:-ms-input-placeholder{  
                    font-size: 12px;
                    color: #99969c;    
                }
            }
        }
        .header-info {
            display: flex;
            align-items: center;
            margin-right: 15px;
            .el-dropdown-link {
                display: flex;
                align-items: center;
            }
            .user-avatar {
                width: 38px;
                height: 38px;
                margin-right: 8px;
                
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            
        }
    }
</style>