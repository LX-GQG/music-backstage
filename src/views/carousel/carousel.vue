<!--
 * @Author: LX_DUG
 * @Date: 2022-12-01 09:26:10
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-01-12 15:06:43
 * @Description: description
-->
<template>
  <div class="carousel-table">
    <el-table
      :data="carouselData"
      v-loading="tableLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Id" prop="id"></el-table-column>
      <el-table-column label="title" prop="title"></el-table-column>
      <el-table-column label="Img" prop="picture">
        <template #default="{ row }">
          <img class="carousel-img" :src="row.picture" alt="background" />
        </template>
      </el-table-column>
      <el-table-column label="Operations" width="170px">
        <template #default>
          <div class="operations">
            <div class="lx-button purple">
              Edit
            </div>
            <div class="lx-button blue">
              Detail
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="carouselData.length"
      :current-page="pageNo"
      :page-size="pageSize"
      @current-change="handleCureentChange"
      layout="prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { CarouselList } from "@/api/carousel";
import { reactive, ref } from "vue";

const carouselData = ref([]);
const tableLoading = ref(true);
const pageSize = ref(10);
const pageNo = ref(1);

const params = reactive({
  keyword: "",
  pageNo: 1,
  pageSize: 10,
});

const getCarousel = () => {
  CarouselList(params)
    .then((res) => {
      tableLoading.value = false;
      carouselData.value = res.data.records;
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleCurrentChange = (val: number) => {
    pageNo.value = val;
}

getCarousel();

</script>

<style lang="scss">
.carousel-table {
  // height: 100%;
  padding: 15px;
}
.carousel-img {
  width: 200px;
  height: 120px;
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
  .lx-button {
    padding: 3px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    border-radius: 5px;
  }
  .purple {
    color: #fff;
    background-color: #b37df1;
    border: 1px solid #b37df1;
  }
  .blue {
    color: #fff;
    background-color: #84d1fb;
    border: 1px solid #84d1fb;
  }
}
</style>
