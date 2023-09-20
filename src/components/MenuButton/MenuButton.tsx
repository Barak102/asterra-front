import { Link } from 'react-router-dom';
import { MenuItemType } from '../../types/MenuItem';
import "./MenuButton.scss"
import { MenuItem, Typography } from '@mui/material';
type MenuButtonProps = {
  item: MenuItemType;
  children?: any;
};

const MenuButton = ({ item, children }: MenuButtonProps) => {
  return (
    <MenuItem onClick={() => {}}>
    <Typography textAlign="center">{item.name}</Typography>
  </MenuItem>
  );
};
export default MenuButton;
