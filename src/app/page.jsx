import Lead from "@/components/Lead";
import styles from "./page.module.css";
import SpecialLead from "@/components/SpecialLead";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="page-bangla">
        <Lead />
        <div className="card-news-area">
          <SpecialLead />
        </div>
      </div>
    </div>
  );
}
