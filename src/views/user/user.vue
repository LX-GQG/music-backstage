<!--
 * @Author: LX_DUG
 * @Date: 2022-11-25 11:18:06
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-01-28 17:41:08
 * @Description: description
-->
<template>
  <div class="user-table">
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="search" class="search" >
      <el-form-item class="el-item" >
        <el-input  v-model="search" placeholder="搜索"></el-input>
      </el-form-item>
      <el-form-item class="el-item">
        <lx-button type="danger" @click="SearchValue">Search</lx-button>
      </el-form-item>
      <el-form-item class="el-item">
        <lx-button type="danger" @click="batchRemove">Batch Delete</lx-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border @selection-change="handleSelectionChange" row-key="id">
      <el-table-column type="selection" width="55" />
      <el-table-column label="登录名称" prop="loginName"></el-table-column>
      <el-table-column label="用户名称" prop="username"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="180px"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="Operations" width="180px">
        <template #default="{ row }">
          <div class="operations">
            <lx-button type="primary" @click="handelEdit(row)">Edit</lx-button>
            <el-popconfirm
              width="230px"
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="Scissor"
              icon-color="#c25afd"
              title="Are you sure to delete this?"
              @confirm="confirmEvent(row)"
            >
              <template #reference>
                <lx-button type="danger">Detail</lx-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="userList.length"
      :current-page="params.pageNo"
      :page-size="params.pageSize"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog title="EDIT" v-model="dialogTableVisible" width="400px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="loginName">
          <el-input v-model="form.loginName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="username">
          <el-input v-model="form.username" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="sex">
          <el-radio label="男" v-model="form.sex">男</el-radio>
          <el-radio label="女" v-model="form.sex">女</el-radio>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="form.email" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="address">
          <el-input v-model="form.address" placeholder=""></el-input>
        </el-form-item>
        <!--底部按钮区域-->
        <el-form-item class="form-bottom">
            <lx-button type="info" style="margin-left: 15px;" @click="cancelEdit">Cancel</lx-button>
            <lx-button type="primary" style="margin-left: 20px;" @click="confirmEdit">Confirm</lx-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { editUser, getUser, removeBatchUser, removeUser } from "@/api/user";
import { ElMessage } from "element-plus";
import { reactive, ref, toRefs } from "vue";
import { Scissor } from '@element-plus/icons-vue'

const userList = ref([]);
const dialogTableVisible = ref(false);
const multipleSelection = ref([])
const search = ref()

// 解构失去响应式
const editData: any = reactive({
  form: {},
});
// 用 toRefs()方法为它们添加响应性
const { form } = toRefs(editData);
const params = reactive({
  keyword: "",
  pageNo: 1,
  pageSize: 10,
});

function getUserList() {
  getUser(params)
    .then((res) => {
      userList.value = res.data.records;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSizeChange(val: number) {
  params.pageSize = val;
  getUserList();
}

function handleCurrentChange(val: number) {
  params.pageNo = val;
  getUserList();
}
// 编辑
function handelEdit(data: any) {
  dialogTableVisible.value = true;
  editData.form = data;
}
// 确认
const confirmEdit = () => {
  editUser(editData.form)
    .then((res:any) => {
      if(res.code == 200) {
        ElMessage({
          type: 'success',
          message: 'Successfully modified!'
        })
      }
      dialogTableVisible.value = false
      getUserList()
    })
    .catch((err) => {
      ElMessage({
          type: 'error',
          message: 'Fail to Edit!'
      })
      console.log(err);
    });
};

const SearchValue = () => {
  params.keyword = search.value
  getUser(params)
    .then((res) => {
      userList.value = res.data.records;
    })
    .catch((err) => {
      console.log(err);
    });
}

const cancelEdit = () => {
  dialogTableVisible.value = false
}
// 处理批量选中的事件
const handleSelectionChange = (val: any) => {
  // 每次点击都对之前的数据进行清空
  multipleSelection.value = [];
  val.map((item: any, index: number) => {
    multipleSelection.value.push(item['id'] as never)
  })
}

const batchRemove = () => {
  removeBatchUser(multipleSelection.value)
    .then((res: any) => {
      if(res.code == 200) {
        ElMessage({
          type:'success',
          message: 'Bulk deletion succeeded!'
        })
        getUserList()
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage({
        type:'error',
        message: err
    })
  })
}

// 确认删除
const confirmEvent = (data: any) => {
  removeUser(data.id)
  .then((res: any) => {
    if(res.code == 200) {
      ElMessage({
        type:'success',
        message: 'successfully deleted!'
      })
    }
    getUserList()
  })
  .catch((err) => {
    console.log(err)
    ElMessage({
      type:'error',
      message: err
    })
  })
}

getUserList();
</script>

<style lang="scss" scoped>
.user-table {
  padding: 15px;
}
.search {
  display: flex;
  padding: 10px 0;
  align-items: center;
}
.pagination {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.operations {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.form-bottom {
  margin-top: 25px;
}
.user-img {
  width: 50px;
  height: 50px;
}
.el-item {
  margin-bottom: 0;
}
</style>
