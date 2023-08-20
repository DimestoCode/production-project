import { ReactElement, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MainLayout.module.scss";

interface IMainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo<IMainLayoutProps>(
    ({ className, content, header, sidebar, toolbar }: IMainLayoutProps) => {
        return (
            <main className={classNames(classes.MainLayout, {}, [className])}>
                <section className={classes.sidebar}>{sidebar}</section>
                <section className={classes.content}>{content}</section>
                <section className={classes.rightbar}>
                    <div className={classes.header}>{header}</div>
                    <div className={classes.toolbar}>{toolbar}</div>
                </section>
            </main>
        );
    }
);
