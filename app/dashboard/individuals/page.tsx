import {
  fetchRegions,
  fetchIndividualPages,
  fetchIndividuals,
  fetchIndividualsById,
  fetchIndividualLoansPages,
  fetchFilteredIndividuals,
  fetchFilteredIndividualLoans,
  fetchIndividualsMaxCycle,
  fetchUserByEmail,
} from "@/app/lib/data/sun-data";
import IndividualsTab from "@/app/ui/individuals/tabs";
import { Cuboid } from "lucide-react";
import { getSession } from "@/app/lib/session";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    id?: string;
    loansquery?: string;
    loanspage?: string;
    loanSearchQuery?: string;
    indQuery?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.loansquery || "";
  const loansquery = searchParams?.query || "";
  const loanSearchQuery = searchParams?.loanSearchQuery || "";
  const indQuery = searchParams?.indQuery || "";
  const indiviudalId = searchParams?.id || "";
  const currentPage = Number(searchParams?.page) || 1;
  const loansCurrentPage = Number(searchParams?.loanspage) || 1;

  const user = await getSession();
  const isAdmin = user?.role === "admin";
  const curentUser: any = await fetchUserByEmail(user?.email);
  const regions = await fetchRegions();

  let regionArr: any = [];
  if (isAdmin) {
    regionArr = regions?.map((item: any) => item.id);
  }

  if (!isAdmin) {
    const filteredRegions = regions?.filter(
      (item: any) => item?.manager === curentUser[0].id,
    );

    regionArr = filteredRegions?.map((item: any) => item.id);
  }

  const totalPages = await fetchIndividualPages(query, regionArr, indQuery);
  const totalLoanPages = await fetchIndividualLoansPages(
    loansquery,
    regionArr,
    loanSearchQuery,
  );

  const loans = await fetchFilteredIndividualLoans(
    loansquery,
    loansCurrentPage,
    regionArr,
    loanSearchQuery,
  );

  const { individualLoanees, individual_loans } =
    await fetchFilteredIndividuals(currentPage, regionArr, indQuery);

  const individuals = await fetchIndividuals(regionArr);
  const individual = await fetchIndividualsById(indiviudalId);

  const maxCycle = await fetchIndividualsMaxCycle();

  return (
    <main className="pt-24">
      <h1 className={`mb-4 text-xl md:text-xl font-bold flex gap-2`}>
        <Cuboid className="h-6 w-6 text-green-500" /> Individual borrowers
        management
      </h1>
      <div className="w-full">
        <IndividualsTab
          regions={regions}
          query={query}
          currentPage={currentPage}
          totalPages={totalPages}
          individual={individual}
          individuals={individuals}
          loansQuery={loansquery}
          loansCurrentPage={loansCurrentPage}
          loansTotalPages={totalLoanPages}
          filtredIndividuals={individualLoanees}
          loans={loans}
          maxCycle={maxCycle}
          detailLoans={individual_loans}
          user={user}
        />
      </div>
    </main>
  );
}
