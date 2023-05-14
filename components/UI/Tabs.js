import { subColor } from "@/lib/colors";
import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import css from "styled-jsx/css";

const TabsComponent = ({ tabslist }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      {domLoaded && (
        <StyledTabs>
          <StyledTabList>
            {tabslist.map((tab, index) => (
              <StyledTab
                tabIndex="-1"
                active={activeTab === index ? "true" : "false"}
                onClick={() => setActiveTab(index)}
                key={index}
              >
                {tab.tabName}
              </StyledTab>
            ))}
          </StyledTabList>
          {tabslist.map((tab, index) => (
            <TabPanel key={index}>{tab.tabContent}</TabPanel>
          ))}
        </StyledTabs>
      )}
    </>
  );
};

const StyledTabs = styled(Tabs)`
  ul {
    padding: 0;
    border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.12);
    margin-top: 0;
    margin-bottom: 30px;
    transform: all linear 0.3s;
  }
`;

const StyledTab = styled(Tab)`
  display: inline-block;
  bottom: -1px;
  position: relative;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;

  ${(props) =>
    props.active === "true" &&
    css`
      border-bottom: 3px solid !important;
      border-color: ${subColor} !important;
      color: ${subColor} !important;
    `}

  ${(props) =>
    props.active === "false" &&
    css`
      border: none;
    `}
`;

const StyledTabList = styled(TabList)`
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 700;
`;

export default TabsComponent;
