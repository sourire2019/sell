// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import NotFound from './pages/NotFound';

import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page4 from './pages/Page4';

const routerConfig = [
  {
    path: '/',
    layout: BasicLayout,
    component: Page4,
  },
  {
    path: '/page5',
    layout: BasicLayout,
    component: Page5,
  },
  {
    path: '/page6',
    layout: BasicLayout,
    component: Page6,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
