<!--
 * @Author: LX_DUG
 * @Date: 2022-12-28 14:13:44
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-01-29 17:32:14
 * @Description: description
-->
<template>
  <div class="music-table">
    <el-form :model="searchData">
      <el-form-item label=""
        ><lx-button class="add_button" type="Joyful" @click="handelAdd"
          >Add</lx-button
        ></el-form-item
      >
    </el-form>
    <el-table
      :data="musicList"
      border
      @selection-change="handleSelectionChange"
      row-key="id"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="歌手" prop="musicSong"></el-table-column>
      <el-table-column label="封面" prop="image" width="180px">
        <template #default="{ row }">
          <img class="img" :src="row.image" alt="background" />
        </template>
      </el-table-column>
      <el-table-column label="歌曲管理" prop="musicUrl">
        <template #default="{ row }">
          <!-- <div class="fileName">{{ row.musicUrl.substring(33) }}</div> -->
          <lx-button style="margin:0 18px;" type="primary" @click="SongList(row.id)">歌曲管理</lx-button>
        </template>
      </el-table-column>
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
      :total="musicList.length"
      :current-page="params.pageNo"
      :page-size="params.pageSize"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog
      :title="visibleTitle ? 'EDIT' : 'ADD'"
      v-model="dialogTableVisible"
      width="430px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="歌名">
          <el-input v-model="form.musicName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="歌手">
          <el-input v-model="form.musicSong" placeholder=""></el-input>
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
          <lx-button type="info" style="margin-left: 15px" @click="cancelEdit"
            >Cancel</lx-button
          >
          <lx-button
            type="primary"
            style="margin-left: 20px"
            @click="visibleTitle ? confirmEdit() : confirmAdd()"
            >Confirm</lx-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  addMusic,
  editMusic,
  getMusicList,
  removeBatchMusic,
  removeMusic,
} from "@/api/musicSource";
import { ElMessage } from "element-plus";
import { reactive, ref, toRefs } from "vue";
import { Scissor, UploadFilled } from "@element-plus/icons-vue";
import uploadFile from "@/components/uploadFile.vue";
import uploadPic from "@/components/uploadPic.vue";
import { useRouter } from 'vue-router'

components: {
  uploadFile;
  uploadPic;
}

const musicList: any = ref([]);
const searchData = ref([]);
const dialogTableVisible = ref(false);
const multipleSelection = ref([]);
const uploadRef: any = ref(null);
const uploadPicRef: any = ref(null);
const visibleTitle = ref(true);
const FileList: any = ref([]);
const ImgList: any = ref([]);
const router = useRouter()
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

function getMusic() {
  getMusicList(params)
    .then((res) => {
      musicList.value = res.data.records;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSizeChange(val: number) {
  params.pageSize = val;
  getMusic();
}

function handleCurrentChange(val: number) {
  params.pageNo = val;
  getMusic();
}

const handelAdd = () => {
  dialogTableVisible.value = true;
  visibleTitle.value = false;
  uploadRef.value.clearAll()
  uploadPicRef.value.clearAll()
  editData.form = {};
  FileList.value = [];
  ImgList.value = [];
};

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

const confirmAdd = () => {
  addMusic(editData.form)
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "Successfully modified!",
        });
      }
      dialogTableVisible.value = false;
      getMusic();
    })
    .catch((err) => {
      ElMessage({
        type: "error",
        message: "Fail to Add!",
      });
      console.log(err);
    });
};

const clearFileList = () => {
  uploadRef.value.clearAll();
  uploadPicRef.value.clearAll();
};

// 编辑
function handelEdit(data: any) {
  dialogTableVisible.value = true;
  visibleTitle.value = true;
  editData.form = data;
  // fileList格式必须要按照name,url的形式（可以参考element ui中文件格式），这里通过接口数据完成图片回显
  FileList.value = [{ name: data.musicUrl.substring(33), uid: data.id, url: data.musicUrl }];
  ImgList.value = [{ name: data.musicUrl.substring(33), uid: data.id, url: data.image }];
}
// 确认
const confirmEdit = () => {
  editMusic(editData.form)
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "Successfully modified!",
        });
      }
      dialogTableVisible.value = false;
      getMusic();
    })
    .catch((err) => {
      ElMessage({
        type: "error",
        message: "Fail to Edit!",
      });
      console.log(err);
    });
};

const cancelEdit = () => {
  dialogTableVisible.value = false;
};
// 处理批量选中的事件
const handleSelectionChange = (val: any) => {
  // 每次点击都对之前的数据进行清空
  multipleSelection.value = [];
  val.map((item: any, index: number) => {
    multipleSelection.value.push(item["id"] as never);
  });
  console.log(multipleSelection.value);
};

const batchRemove = () => {
  removeBatchMusic(multipleSelection.value)
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "Bulk deletion succeeded!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage({
        type: "error",
        message: err,
      });
    });
};

// 确认删除
const confirmEvent = (data: any) => {
  removeMusic(data.id)
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "successfully deleted!",
        });
      }
      getMusic();
    })
    .catch((err) => {
      console.log(err);
      ElMessage({
        type: "error",
        message: err,
      });
    });
};

const SongList = (id: number) => {
  router.push({ path: "/songList", query: {id: id} });
}

getMusic();
</script>

<style lang="scss">
.music-table {
  padding: 15px;
  .add_button {
    border-radius: 3px;
    margin-left: 15px;
    width: 150px;
  }
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
.img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.fileName {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
