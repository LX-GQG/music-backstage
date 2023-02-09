<!--
 * @Author: LX_DUG
 * @Date: 2023-01-29 15:31:54
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-02-01 15:43:41
 * @Description: description
-->
<template>
  <div class="user-table">
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="search" class="search" >
      <el-form-item class="el-item">
        <lx-button type="danger" @click="batchRemove">Batch Delete</lx-button>
      </el-form-item>
    </el-form>
    <el-table :data="songList" border @selection-change="handleSelectionChange" row-key="id">
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="歌手" prop="musicSong"></el-table-column>
      <el-table-column label="歌名" prop="musicName"></el-table-column>
      <el-table-column label="封面" prop="image" width="180px">
        <template #default="{ row }">
          <img class="img" :src="row.image" alt="background" />
        </template>
      </el-table-column>
      <el-table-column label="歌曲文件" prop="musicUrl"></el-table-column>
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
      :total="songList.length"
      :current-page="params.pageNo"
      :page-size="params.pageSize"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog title="EDIT" v-model="dialogTableVisible" width="400px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="歌手">
          <el-input v-model="form.musicSong" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="歌曲">
          <el-input v-model="form.musicName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <upload-pic
            style="width: 260px"
            ref="uploadPicRef"
            :fileList="ImgList"
            @success-callback="fileChangePic"
            @remove-callback="fileChangePic"
          >
          </upload-pic>
        </el-form-item>
        <el-form-item label="歌曲地址">
          <upload-file
            style="width: 260px"
            ref="uploadRef"
            :fileName="'file'"
            :action="'http://www.gqgwr.cn:8666/api/uploadFile'"
            :fileList="FileList"
            :limit="1"
            @success-callback="fileChange"
            @remove-callback="fileChange"
          >
          </upload-file>
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
import { editSong, getSongList, removeSong, removeBatchSong } from "@/api/songList";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref, toRefs } from "vue";
import { Scissor } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import uploadFile from "@/components/uploadFile.vue";
import uploadPic from "@/components/uploadPic.vue";

components: {
  uploadFile;
  uploadPic;
}

const route = useRoute();
const songList = ref([]);
const dialogTableVisible = ref(false);
const multipleSelection = ref([])
const search = ref()
const FileList: any = ref([]);
const ImgList: any = ref([]);

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
// 钩子函数里使用这个状态，接收路由传过来的参数
onMounted(() => {
  // String(route.params.passValue)是因为传递过来的参数类型与状态类型不符合：状态类型是string，
  params.keyword = String(route.query.id);
  getSong();
})

function getSong() {
  getSongList(params)
    .then((res) => {
      songList.value = res.data.records;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSizeChange(val: number) {
  params.pageSize = val;
  getSong();
}

function handleCurrentChange(val: number) {
  params.pageNo = val;
  getSong();
}
// 编辑
function handelEdit(data: any) {
  dialogTableVisible.value = true;
  editData.form = data;
  // fileList格式必须要按照name,url的形式（可以参考element ui中文件格式），这里通过接口数据完成图片回显
  FileList.value = [{ name: data.musicUrl.substring(33), uid: data.id, url: data.musicUrl }];
  ImgList.value = [{ name: data.musicUrl.substring(33), uid: data.id, url: data.image }];
}

// 上传附件成功
const fileChange = (UploadObject: any) => {
  const file: any = Object.values(UploadObject);
  form.value.musicUrl = "https://www.gqgwr.cn" + file[0].message;
  FileList.value = file;
};

const fileChangePic = (UploadObject: any) => {
  const file: any = Object.values(UploadObject);
  form.value.image = "https://www.gqgwr.cn" + file[0].message;
  ImgList.value = file;
};

// 确认
const confirmEdit = () => {
  editSong(editData.form)
    .then((res:any) => {
      if(res.code == 200) {
        ElMessage({
          type: 'success',
          message: 'Successfully modified!'
        })
      }
      dialogTableVisible.value = false
      getSong()
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
  getSongList(params)
    .then((res) => {
      songList.value = res.data.records;
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
  removeBatchSong(multipleSelection.value)
    .then((res: any) => {
      if(res.code == 200) {
        ElMessage({
          type:'success',
          message: 'Bulk deletion succeeded!'
        })
        getSong()
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
  removeSong(data.id)
  .then((res: any) => {
    if(res.code == 200) {
      ElMessage({
        type:'success',
        message: 'successfully deleted!'
      })
    }
    getSong()
  })
  .catch((err) => {
    console.log(err)
    ElMessage({
      type:'error',
      message: err
    })
  })
}

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
