import arrow from "../../assets/images/bouton2.png";
import styles from "./SampleNextArrow.module.scss";
export function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={`${styles.container}`}
      onClick={onClick}>
      <img src={arrow} className={`${styles.arrow}`} alt="" />
    </div>
  );
}