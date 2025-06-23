import Lead from "@/components/HomeContent/Lead";
import styles from "./page.module.css";
import SpecialLead from "@/components/HomeContent/SpecialLead";
import National from "@/components/HomeContent/National";
import International from "@/components/HomeContent/International";
import Sports from "@/components/HomeContent/Sports";
import { Suspense } from "react";
import SkeletonSection from "@/components/common/SkeletonSection";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className="page-bangla">
        <Suspense fallback={<SkeletonSection />}>
          <Lead />
          <div className="card-news-area">
            <SpecialLead />
          </div>
        </Suspense>
        {/* HOME CONTENT */}
        <Suspense fallback={<SkeletonSection />}>
          <National />
        </Suspense>
        <Suspense fallback={<SkeletonSection />}>
          <International />
        </Suspense>
        <Suspense fallback={<SkeletonSection />}>
          <Sports />
        </Suspense>
      </div>
    </main>
  );
}
