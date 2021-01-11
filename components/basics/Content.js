import React from 'react'
import { Layout } from 'antd';
const {  Content } = Layout;
const PageContent = (props) => {
    return (
        <Content style={{minHeight:"100%"}}>
            {props.children}
        </Content>
    )
}

export default PageContent
