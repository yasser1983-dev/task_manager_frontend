import styles from './Circle.module.css';
import {CircleProps} from "@/components/Circle/circleTypes";


export default function TaskCard({ color }: CircleProps) {
    return (
        <span
            className={styles.colorCircle}
            style={{ backgroundColor: color }}>
        </span>);
}