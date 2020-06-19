import styled from 'styled-components';
import { Tabs } from 'antd';

const { TabPane } = Tabs

export const StyledTabs = styled(Tabs)`
  width: 100%;
  min-height: 400px;
  background-color: '#E25A53';
  border-radius: 25px 0px 0px 25px;
  border: #C2D7D0;
  border-style: solid;
  border-width: 5px;
  margin-top: 10px;
  
  }
`;

export const StyledTabsPane = styled(TabPane)`
  // padding: 20px;
  }
`;
