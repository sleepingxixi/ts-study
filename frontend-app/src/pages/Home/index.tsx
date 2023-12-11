import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import { EChartsOption } from 'echarts';
import moment from 'moment'
import ReactECharts from 'echarts-for-react';
import request from '../../request'
import './index.css'


export default () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<responseResult.isLogin>(true);
    const [courseData, setCourseData] = useState<EChartsOption>({});
    useEffect(() => {
        request.get('/api/isLogin').then(res => {
            setIsLogin(res.data);
        })
        showData();
    }, [])

    const clickLogout = () => {
        request.get('/api/logout').then(res => {
            if (res.data) {
                navigate('/logout')
            } else {
                message.error("退出登录失败")
            }
        })
    }

    const getData = () => {
        request.get('/api/getData').then(res => {
            if (res.data) {
                message.success("获取数据成功")
            } else {
                message.error("获取数据失败")
            }
        })
    }

    const showData = () => {
        request.get('/api/showData').then(res => {
            if (res.data) {
                const titleList: any[] = [];
                const times: any[] = [];
                const dataMap: { [key: string]: number[] } = {};
                const data: responseResult.showData = res.data || {};
                for (let i in data) {
                    const item = data[i];
                    item.forEach((d) => {
                        if (titleList.indexOf(d.title) === -1) {
                            titleList.push(d.title);
                        }
                        dataMap[d.title] ? dataMap[d.title].push(d.count) : dataMap[d.title] = [d.count]
                    })

                    times.push(moment(Number(i)).format('MM-DD HH:mm'))

                }
                const result: any[] = [];
                titleList.forEach((i) => {
                    result.push({
                        name: i,
                        type: 'line',
                        data: dataMap[i]
                    })
                })
                setCourseData({
                    title: {
                        text: '课程统计数据'
                    },
                    legend: {
                        data: titleList
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: times
                    },
                    series: result
                })
            }

        })
    }

    const getOption: () => EChartsOption = () => {
        return {
            title: {
                text: 'Stacked Line'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                }
            ],
            ...courseData
        }
    }


    if (isLogin) {
        return <>
            <div className='home-container'>
                <Button type="primary" onClick={getData}>获取数据</Button>
                <Button onClick={clickLogout}>退出登录</Button>
            </div>
            <div className='view-container'>
                <ReactECharts option={getOption()} />
            </div>
        </>
    } else {
        return <Navigate to="/login" />
    }

}