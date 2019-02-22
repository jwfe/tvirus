import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';

import Layout from './layout';
import Index from './pages/index';
import SpecIntroduce from './pages/spec/introduce';
import CompIntroduce from './pages/component/introduce';
import Button from './pages/component/button';

export default (
    <Router>
        <Layout>
            <Route path="/" exact component={Index} />
            {/* 设计语言 */}
            <Route path="/spec/introduce" component={SpecIntroduce} />

            {/* 组件 */}
            <Route path="/component/introduce" component={CompIntroduce} />
            <Route path="/component/button" component={Button} />
        </Layout>
    </Router>
)
