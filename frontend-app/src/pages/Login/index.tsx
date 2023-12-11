import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import request from '../../request'
import qs from 'qs';
import { Navigate } from 'react-router-dom'
import './index.css'

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    const onFinish = (values: any) => {
        console.log('Success:', values);
        request.post('/api/login',
            qs.stringify({ password: values.password })
            ,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }

            }).then((res) => {
                setLoginSuccess(res?.data || false);
                if (!res?.data) {
                    message.error('登录失败')
                } else {
                    message.success('登录成功')
                }
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return loginSuccess ? <Navigate to="/"></Navigate> :
        (<div className='loginContainer'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
        )
};

export default Login;