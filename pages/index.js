import Head from 'next/head'
import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
import Content from '../components/basics/Content'
import Header from '../components/basics/Header'
import { Layout, Spin, Col, Row, Card, Input, Button,message } from 'antd';
import GenericHeader from '../components/business/GenericHeader'

export default function Home() {
  
  const [URL, setURL] = useState('')
  const [toggle, setToggle] = useState(false)
  let endpoint = ''
  const fetcher = url => fetch(url + `?URL=${URL}`).then(r => { return r.url })
  const { data, error } = useSWR(endpoint, fetcher)
  const onButtonClickMP4 = async () => {
    if(!URL){
      message.warning("URL Field can't be empty!")
    }
    else{
      endpoint = '/api/mp4downloader';
      fetcher(endpoint);
      setToggle(true);
      const result = await fetcher(endpoint)
      console.log(result)
      if (result) {
        window.location.href = result
      }
      if (error) console.log(error)
      if (!data) console.log('Loading MP4')
      setToggle(false);
    }
  }
  const onButtonClickMP3 = async () => {
    if(!URL){
      message.warning("URL Field can't be empty!")
    }
    else{
      endpoint = '/api/mp3downloader';
      setToggle(true);
      const result = await fetcher(endpoint)
      console.log(result)
      if (result) {
        console.log('I CAME HERE', toggle);
  
        window.location.href = result
      }
      if (error) console.log(error)
      if (!data) console.log('Loading MP3')
      setToggle(false);
    }
  }
  return (
    <>
      <Head>
        <title>Main Page</title>
        <link rel="manifest" href="manifest.webmanifest" />

        {/* <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="youtube-downloader" />
        <meta name="apple-mobile-web-app-title" content="youtube-downloader" />
        <meta name="theme-color" content="#000" />
        <meta name="msapplication-navbutton-color" content="#000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <link rel="icon" type="png" sizes="200*200" href="/yesmusic.png" />
        <link rel="apple-touch-icon" type="png" sizes="200*200" href="/yesmusic.png" /> */}
      </Head>
      <Layout>
        <Header>
          <GenericHeader />
        </Header>
        <Content>
          {toggle ?
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={24}>
                <div className="center">
                  <Spin className="center" tip="Converting..." />
                </div>
              </Col>
            </Row>
            : null}
          <br />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={24}>
              <div className="center">
                <Image src="/assets/yesconverter.png" alt="LOGO" width={200} height={200} />
              </div>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={24}>
              <Card title={"Please insert a valid video URL"} size="small" >
                <Input placeholder="Paste URL here" value={URL} onChange={({ target }) => setURL(target.value)} required />
                <br />
                <br />
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12}>
                    <Button type="primary" onClick={onButtonClickMP4} style={{ whiteSpace: "normal", height: "auto", width: "100%" }}>
                      Convert to MP4 and Download
                    </Button>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Button type="primary" onClick={onButtonClickMP3} style={{ whiteSpace: "normal", height: "auto", width: "100%" }}>
                      Convert to MP3 and Download
                   </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

        </Content>
      </Layout>
    </>
  )
}
