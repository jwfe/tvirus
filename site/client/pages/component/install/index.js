import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import {Row, Col} from '@grid';

export default class Introduce extends Component{
    render() {
        return (
            <Layout {...this.props}>
                <Row gutter="20">
                    <Col span="12">12</Col>
                    <Col span="12">12</Col>
                </Row>     
            </Layout>
        )
    }
}