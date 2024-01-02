import arrow from "../../../../assets/images/bouton2.png";
import styles from "./SamplePrevArrow.module.scss";
export function SamplePrevArrow(props) {

  const { onClick } = props;
  return (
    <div
      className={`${styles.container}`}
      onClick={onClick}>
      <img src={arrow} className={`${styles.arrow}`} alt="flèche pour le carrousel" />
    </div>
  );
}
