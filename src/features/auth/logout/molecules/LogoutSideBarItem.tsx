import { Component } from 'solid-js';
import IconLogout from '../../../../atoms/Icons/Stroke/IconLogout';
import SideBarItem from '../../../../molecules/SideBarItem';
import { logout } from './handlers';

type LogoutSideBarItemProps = {
    user: any;
    getExpanded: any;
};

const LogoutSideBarItem: Component<LogoutSideBarItemProps> = ( props ) => (
    <SideBarItem
        name="a_logout"
        icon={IconLogout}
        isLoading={false}
        onClick={logout( { user: props.user } )}
        getShowSubitems={false}
        routes=""
        showItem={true}
        isLink={false}
        path=""
        getExpanded={props.getExpanded}
    />
);

export default LogoutSideBarItem;
