import styles from './Circle.module.css';
import {CircleProps} from "@/components/Circle/circleTypes";
import React from "react";


function Circle({ color }: CircleProps) {
    return (
        <span
            className={styles.colorCircle}
            style={{ backgroundColor: color }}>
        </span>);
}

export default React.memo(Circle);
