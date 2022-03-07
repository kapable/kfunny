import Link from 'next/link';
import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Head from 'next/head';
export default function Custom404() {
    return (
        <div className='main-404-div'>
            <Head>
                <title>케이퍼니</title>
                <link rel='main-url' href='https://niair.xyz' />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://niair.xyz' />
                <meta property="og:title" content='케이퍼니'/>
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content='케이퍼니' />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://niair.xyz/login"/>
                <meta property="twitter:title" content='케이퍼니'/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content='케이퍼니' />
            </Head>
            <h3>존재하지 않는 페이지입니다 ㅠㅠ</h3>
            <Link href={`/`}>
                <a>
                    <Button type="primary" className='main-404-button'>
                        <RollbackOutlined />
                        메인으로 돌아가기
                    </Button>
                </a>
            </Link>
        </div>
    );
};