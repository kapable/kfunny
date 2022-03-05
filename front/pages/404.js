import Link from 'next/link';
import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
export default function Custom404() {
    return (
        <div className='main-404-div'>
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