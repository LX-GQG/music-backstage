/*
 * @Author: LX_DUG
 * @Date: 2022-11-25 17:36:42
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-11-29 22:24:15
 * @Description: description
 */
import { createStore, createLogger } from 'vuex'

import setting from '@/store/modules/setting';

export default createStore({
  modules: {
    setting,
  },
  plugins: [createLogger()]
})