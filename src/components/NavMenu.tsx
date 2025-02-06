import { List, Divider } from '@mui/material';
import React from 'react'
import MenuListItemButton from './buttons/MenuListItemButton';
import { pouzivatel } from '@prisma/client';
import { LinkGroup } from './Header';


interface NavMenuProps {
    user?: pouzivatel;
    linkGroups: LinkGroup[];
}

export default function NavMenu(props: NavMenuProps) {
    return (
        <List>
            {props.linkGroups.map((linkG, index) => (
                <React.Fragment key={index}>
                    {linkG.title && <MenuListItemButton key={linkG.title.url} text={linkG.title.text} url={linkG.title.url} icon={linkG.title.icon} />}
                    {linkG.links.map(link => (
                        <MenuListItemButton key={link.url} text={link.text} paddingLeft={linkG.title ? 4 : 0} url={link.url} icon={link.icon} />
                    ))}
                    {linkG.addDivider && <Divider />}
                </React.Fragment >
            ))}
        </List>
    )
}