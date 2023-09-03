import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import i18n from "../../i18n";
import "./CyberpunkDropdown.css";

function CyberpunkDropdown() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);

  const handleLanguageChange = ({ key }) => {
    i18n.changeLanguage(key);
    dispatch({
      type: "SET_LANGUAGE",
      language: key,
    });
  };

  const menu = (
    <Menu onClick={handleLanguageChange}>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="zh">中文</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button className="cyberpunk-btn">
        {language === "en" ? "English" : "中文"} <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default CyberpunkDropdown;
