import Lead from "@/components/Lead";
import styles from "./page.module.css";
import Header from "@/components/Header";
import SpecialLead from "@/components/SpecialLead";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <div className="page-bangla">
        <Lead />
        <div className="card-news-area">
          <SpecialLead />
        </div>
      </div>

    </div>
  );
}
