import Taro, { requirePlugin } from '@tarojs/taro';

const isWeapp = Taro.getEnv().toLowerCase() === 'weapp';
const wxPlugin = isWeapp && requirePlugin("loginPlugin");

const fieldObj = {
    'redirect': 'redirectTo',
    'navigate': 'navigateTo'
};

// 微信路由相关
const toH5 = (field) => ({ page, wxroute }) => {
    if(!wxPlugin || !page) return;
    const url = wxPlugin.formH5Url({ page: decodeURIComponent(page), wxroute });
    Taro[fieldObj[field]]({ url})
}

function redirectToH5({ page, wxroute }) {
    toH5('redirect')({ page, wxroute });
}

function navigateToH5({ page, wxroute }) {
    toH5('navigate')({ page, wxroute });
}


export { redirectToH5, navigateToH5 };