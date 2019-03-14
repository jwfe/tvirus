import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';

import Layout from './layout';
import Index from './pages/index';
import SpecIntroduce from './pages/spec/introduce';
import CompInstall from './pages/component/install';
import Button from './pages/component/button';
import Icon from './pages/component/icon';
import Menu from './pages/component/menu';
import Breadcrumb from './pages/component/breadcrumb';
import Grid from './pages/component/grid';

import Input from './pages/component/input';
import Radio from './pages/component/radio';

import Pagination from './pages/component/pagination';
import Tabs from './pages/component/tabs';
import Table from './pages/component/table';

export default (
    <Router>
        <Layout>
            <Route path="/" exact component={Index} />
            {/* 设计语言 */}
            <Route path="/spec/introduce" component={SpecIntroduce} />

            {/* 组件 */}
            <Route path="/component/install" component={CompInstall} />
            <Route path="/component/button" component={Button} />
            <Route path="/component/icon" component={Icon} />

            <Route path="/component/menu" component={Menu} />
            <Route path="/component/breadcrumb" component={Breadcrumb} />
            <Route path="/component/grid" component={Grid} />
            
            <Route path="/component/input" component={Input} />
            <Route path="/component/radio" component={Radio} />

            <Route path="/component/pagination" component={Pagination} />
            <Route path="/component/tabs" component={Tabs} />
            <Route path="/component/table" component={Table} />
        </Layout>
    </Router>
)
