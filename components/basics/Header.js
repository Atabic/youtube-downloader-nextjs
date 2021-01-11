import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;
const PageHeader = (props) => {
    return (
        <Header>
            {props.children}
        </Header>
    )
}

export default PageHeader
