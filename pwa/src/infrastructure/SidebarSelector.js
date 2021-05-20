

import FingerprintIcon from '@material-ui/icons/Fingerprint';
import HomeIcon from '@material-ui/icons/Home';
import { React, useEffect, useState } from 'react';
import GroupsPermissions from './Routes';
import { HttpClient } from './HttpClient';
import UserManager from './userManager';
var _ = require('lodash');

function onlyUnique(value, index, self) {

    const existingItem = self.find(s => s.path === value.path);

    const indexExisting = self.indexOf(existingItem);

    return index === indexExisting;
}

function byOrder(a, b) {
    
    
    var result = a.order - b.order;
    
    return result;
}

export default function userSidebar() {

    const [sidebarItems, setSidebarItems] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        setLoading(true);

        UserManager.LoadUpdated(HttpClient).then(user => {
            const { groups } = user;
            if (groups && groups.length > 0) {
                for (var group of groups) {
                    const permissions = [...GroupsPermissions[group], ...GroupsPermissions["default"]];
                    if (!permissions) continue;
                    const items = permissions.filter(g => g.label);

                    setSidebarItems(sidebarItems => 
                        _.orderBy([...sidebarItems, ...items].filter(onlyUnique),['order']));
                }
            }
            setLoading(false);
        })

    }, [])



    return [loading, sidebarItems];

}