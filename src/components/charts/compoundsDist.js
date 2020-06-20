import React, { useState, useEffect, useRef } from 'react'
import Chart from 'react-apexcharts';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { compounds } from '../../utils/utilitiesFuncs';

const CompoundsDist = ({ size, data, legend, total }) => {
  const screens = useBreakpoint()

  const options = { labels: ['שומן', 'חלבון', 'פחמימה'],
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 350
      },
      dynamicAnimation: {
        enabled: true,
        speed: 550
      }
    },
    colors: ['#E25A53', '#EFBC68', '#C2D7D0'],
    legend: { show: legend },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: total,
            total: {
              show: total,
              showAlways: total,
              label: `${data.calories} קלוריות`,
              color: 'black',
              fontSize: screens.lg ? '16px' : '10px',
              fontFamily: 'Varela Round, sans-serif',
              formatter: () => ''
            }
          }
        }
      }
    },
  }

  return (
    <div className="donut" style={{ paddingRight: '5em' }}>
      <Chart options={options} series={compounds.map((c) => Number(data[c]))} type="donut" width={size === 'small' ? 250 : (size === 'medium' ? 250 : 400)} />
    </div>
  )
}

export default CompoundsDist
