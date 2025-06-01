import Header from "@/components/Header";
import postApi from "../../../lib/postApi";
import ArchiveClient from "./ArchiveClient";
import getApi from "../../../lib/getApi";

export const metadata = {
  title: "আর্কাইভস",
  description: `আর্কাইভস`,
  robots: `আর্কাইভস :: বার্তা ২৪ ` ? "index, follow" : "noindex, nofollow",
  openGraph: {
    title: `আর্কাইভস :: বার্তা ২৪ `,
    keywords: `আর্কাইভস`,
    description: `আর্কাইভস`,
    image: `${process.env.NEXT_LAZY_IMAGE}`,
    url: `https://barta24.com/archieves`,
    site_name: "Barta24",
    type: "website",
  },
};

const limit = 12;
const offset = 0;

const defaultFormData = {
  start_date: "",
  end_date: "",
  category_id: "",
  limit,
  offset,
  keywords: "",
};

async function getCategories() {
  const res = await  getApi("category");
  const data = res.categories
  return data || [];
}

const Archieve = async () => {
  const list = await postApi("archive", defaultFormData);
  const archivedata = list.data || [];

  const categories = await getCategories();

  return (
    <div className="container">
      <Header />
      <h1 className="text-center">Archieve page</h1>

      <ArchiveClient initialData={archivedata} initialCatList={categories} />
    </div>
  );
};

export default Archieve;
