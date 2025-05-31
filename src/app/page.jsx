import Lead from "@/components/Lead";
import styles from "./page.module.css";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="container">
        <Header />
        <Lead />
      </div>


    </div>
  );
}
