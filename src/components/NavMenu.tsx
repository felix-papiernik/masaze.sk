import { List, Divider } from '@mui/material';
import React from 'react'
import MenuListItemButton from './buttons/MenuListItemButton';
import { pouzivatel } from '@prisma/client';
import { LinkGroup } from './Header';


interface NavMenuProps {
    user: pouzivatel | null;
    linkGroups: LinkGroup[];
}

export default function NavMenu(props: NavMenuProps) {
    return (
        <List>
            {props.linkGroups.map(linkG => (
                <>
                    {linkG.title && <MenuListItemButton text={linkG.title.text} url={linkG.title.url} icon={linkG.title.icon} />}
                    {linkG.links.map(link => (
                        <MenuListItemButton text={link.text} paddingLeft={linkG.title ? 4 : 0} url={link.url} icon={link.icon} />
                    ))}
                    {linkG.addDivider && <Divider />}
                </>
            ))}
        </List>
    )
}