// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Add from './pages/Add';

const routerConfig = [
  {
    path: '/home',
    layout: BasicLayout,
    component: Home,
  },
  {
    path: '/add',
    layout: BasicLayout,
    component: Add,
  },
  {
    path: '/upload',
    layout: BasicLayout,
    component: Upload,
  },
  {
    path: '/',
    layout: BasicLayout,
    component: Login,
  },
  {
    path: '/login',
    layout: BasicLayout,
    component: Login,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
