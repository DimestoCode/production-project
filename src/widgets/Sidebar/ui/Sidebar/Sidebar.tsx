import { lazy, memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { ToggleFeatures } from "@/shared/lib/features";

const DeprecateSidebar = lazy(() =>
    import("../DeprecatedSidebar/DeprecatedSidebar").then((mod) => ({ default: mod.DeprecateSidebar }))
);
const RedesignedSidebar = lazy(() =>
    import("../RedesignedSIdebar/RedesignedSidebar").then((mod) => ({ default: mod.RedesignedSidebar }))
);

interface ISideBarProps {
    className?: string;
}

export const Sidebar = memo(({ className = "" }: ISideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);
    const onToggle = () => setCollapsed((prev) => !prev);

    const renderedSidebarItems = useMemo(
        () => sidebarItemsList.map((item) => <SidebarItem collapsed={collapsed} item={item} key={item.path} />),
        [collapsed, sidebarItemsList]
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <DeprecateSidebar className={className} collapsed={collapsed} onToggle={onToggle}>
                    {renderedSidebarItems}
                </DeprecateSidebar>
            }
            on={
                <RedesignedSidebar className={className} collapsed={collapsed} onToggle={onToggle}>
                    {renderedSidebarItems}
                </RedesignedSidebar>
            }
        />
    );
});
