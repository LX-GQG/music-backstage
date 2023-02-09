/*
 * @Author: LX_DUG
 * @Date: 2022-11-29 16:56:20
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-11-29 23:48:29
 * @Description: description
 */
const state = () => ({
  site: {
    isCollapse: false,
  }
});

const getters = {
  getCollapse: (state: { site: { isCollapse: any; }; }) => {
    return state.site.isCollapse;
  },
};

const mutations = {
    changeCollapse(state: { isCollapse: any; }, status: any) {
        state.isCollapse = status
    }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations
};