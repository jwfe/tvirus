import React from 'react';
import {render} from 'react-dom';

import router from './router';
import Track from './common/track';

const CONTAINER = document.getElementById('root');

if (!CONTAINER) {
    throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

render(router, CONTAINER);

new Track();
