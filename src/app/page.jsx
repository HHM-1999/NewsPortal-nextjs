import Lead from "@/components/Lead";
import styles from "./page.module.css";
import SpecialLead from "@/components/SpecialLead";
import National from "@/components/National";
import International from "@/components/International";
import Sports from "@/components/sports";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className="page-bangla">
        <Lead />
        <div className="card-news-area">
          <SpecialLead />
        </div>
        {/* HOME CONTENT */}
        <National />
        <International />
        <Sports />
      </div>
    </main>
  );
}
