import * as React from 'react';
import { Menu as AMenu } from 'antd';

export const Menu = () => {
  return (
    <AMenu mode="horizontal">
      <AMenu.Item>Home</AMenu.Item>
      <AMenu.Item>About</AMenu.Item>
      <AMenu.Item>Blog</AMenu.Item>
    </AMenu>
  );
};
