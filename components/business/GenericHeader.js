import React from 'react'
import { Menu, Row, Col } from 'antd';
import Link from 'next/link'

const GenericHeader = () => {
    return (
        <>
           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={18}>
                    <h1>
                        <Link href={'/'}>
                            YES CONVERTER
                        </Link>
                    </h1>
                </Col>
                {/* <Col className="gutter-row" span={6}>
                    <Menu mode="horizontal" style={{ backgroundColor: "inherit", borderBottom: "none" }} >

                        <Menu.Item >
                            <Link href={'/Login'}>
                                Login
                        </Link>
                        </Menu.Item>
                        <Menu.Item >
                            <Link href={'/Register'}>
                                Register
                     </Link>
                        </Menu.Item>
                        <Menu.Item >
                            <Link href={'/Categories'}>
                                Categories
                     </Link>
                        </Menu.Item>
                        <Menu.Item >
                            <Link href={'/About'}>
                                About
                              </Link>
                        </Menu.Item>
                    </Menu>
                </Col> */}
            </Row>
        </>
    )
}

export default GenericHeader
