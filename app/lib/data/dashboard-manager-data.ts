import sql from "@/app/lib/db";

function getGrowthRate(current: any, previous: any) {
  const growth: any =
    previous > 0 && current > 0
      ? ((current - previous) / previous) * 100
      : previous === 0 && current > 0
        ? 100
        : 0;
  return Number(growth.toFixed(2));
}

export async function fetchDashboardManagerData(
  add: string,
  minus: string,
): Promise<any> {
  const timePeriod = add.endsWith("month") ? "month" : "year";
  try {
    let groupDisbursedPromise: any = [];
    let individualDisbursedPromise: any = [];
    let groupLoanPromise: any = [];
    let individualLoanPromise: any = [];
    let groupCollectedPromise: any = [];
    let individualCollectedPromise: any = [];
    let groupDisbursedLastMonthPromise: any = [];
    let individualDisbursedLastMonthPromise: any = [];
    let groupCollectedLastMonthPromise: any = [];
    let individualCollectedLastMonthPromise: any = [];

    groupDisbursedPromise = await sql`SELECT
        COALESCE(SUM(CASE WHEN loans.status = 'approved' OR loans.status = 'inactive' THEN loans.amount ELSE 0 END), 0) as sum,
        users.name as region_manager, users.id FROM users 
        LEFT JOIN regions ON regions.manager = users.id 
        LEFT JOIN groups ON groups.region = regions.id
        LEFT JOIN loans ON loans.groupid = groups.id   
        AND loans.date
        >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${minus}::interval AND loans.date <
        DATE_TRUNC(${timePeriod}, current_timestamp) + ${add}::interval GROUP BY users.name, users.id ORDER BY users.id`;

    individualDisbursedPromise = await sql`SELECT
        COALESCE(SUM(CASE WHEN individuals_loans.status = 'approved' 
        OR individuals_loans.status = 'inactive' THEN individuals_loans.amount ELSE 0 END), 0) as sum,
        users.name as region_manager, 
        users.id 
        FROM users 
        LEFT JOIN regions ON regions.manager = users.id 
        LEFT JOIN individuals ON individuals.region = regions.id
        LEFT JOIN individuals_loans ON individuals_loans.loanee = individuals.id   
        AND individuals_loans.created
        >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${minus}::interval AND individuals_loans.created <
        DATE_TRUNC(${timePeriod}, current_timestamp) + ${add}::interval GROUP BY users.name, users.id ORDER BY users.id`;

    groupLoanPromise = await sql`SELECT
        COALESCE(SUM(CEIL(CASE WHEN loans.status = 'approved' OR loans.status = 'inactive' 
        THEN amount ELSE 0 END/term + CASE WHEN loans.status = 'approved' OR loans.status = 'inactive'
        THEN amount ELSE 0 END * (interest/4/100)) * term ), 0) as sum,
        users.name as region_manager, users.id FROM users 
        LEFT JOIN regions ON regions.manager = users.id 
        LEFT JOIN groups ON groups.region = regions.id
        LEFT JOIN loans ON loans.groupid = groups.id   
        AND loans.date
        >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${minus}::interval AND loans.date <
        DATE_TRUNC(${timePeriod}, current_timestamp) + ${add}::interval GROUP BY users.name, users.id ORDER BY users.id`;

    individualLoanPromise = await sql`SELECT
        COALESCE(SUM(CEIL(CASE WHEN individuals_loans.status = 'approved' OR individuals_loans.status = 'inactive'
        THEN amount ELSE 0 END/term + CASE WHEN individuals_loans.status = 'approved' OR individuals_loans.status = 'inactive'
        THEN amount ELSE 0 END * (interest/4/100)) * term ), 0) AS sum,
        users.name as region_manager, users.id FROM users 
        LEFT JOIN regions ON regions.manager = users.id 
        LEFT JOIN individuals ON individuals.region = regions.id
        LEFT JOIN individuals_loans ON individuals_loans.loanee = individuals.id   
        AND individuals_loans.created
        >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${minus}::interval AND individuals_loans.created <
        DATE_TRUNC(${timePeriod}, current_timestamp) + ${add}::interval GROUP BY users.name, users.id ORDER BY users.id`;

    groupCollectedPromise = await sql`
      SELECT
        gp.id,
        gp.name,
        COALESCE(sums.total, 0) as sum
      FROM users gp
        LEFT JOIN LATERAL (
        SELECT SUM(CASE WHEN mpesainvoice.cycle <> 0
        THEN mpesainvoice.transamount ELSE 0 END) as total
        FROM regions
        JOIN groups ON groups.region = regions.id
        JOIN mpesainvoice ON mpesainvoice.refnumber % groups.name
        WHERE regions.manager = gp.id
        AND SIMILARITY(groups.name, refnumber) >= 0.7
        AND mpesainvoice.transtime
        >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${minus}::interval AND mpesainvoice.transtime <
        DATE_TRUNC(${timePeriod}, current_timestamp) + ${add}::interval
        ) sums ON true ORDER BY gp.id
    `;

    individualCollectedPromise = await sql`
      SELECT
        gp.id,
        gp.name,
        COALESCE(sums.total, 0) as sum
      FROM users gp
        LEFT JOIN LATERAL (
        SELECT SUM(CASE WHEN mpesainvoice.cycle <> 0
        THEN mpesainvoice.transamount ELSE 0 END) as total
        FROM regions
        JOIN individuals ON individuals.region = regions.id
        JOIN mpesainvoice ON mpesainvoice.refnumber = individuals.idnumber::TEXT
        WHERE regions.manager = gp.id
        AND SIMILARITY(individuals.idnumber::TEXT, mpesainvoice.refnumber) >= 0.7
        AND mpesainvoice.transtime
        >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${minus}::interval AND mpesainvoice.transtime <
        DATE_TRUNC(${timePeriod}, current_timestamp) + ${add}::interval
        ) sums ON true ORDER BY gp.id;
    `;

    //Last month
    if (add === "1 month") {
      groupDisbursedLastMonthPromise = await sql`SELECT
        COALESCE(SUM(CASE WHEN loans.status = 'approved' OR loans.status = 'inactive' THEN loans.amount ELSE 0 END), 0) as sum,
        users.name as region_manager, users.id FROM users 
        LEFT JOIN regions ON regions.manager = users.id 
        LEFT JOIN groups ON groups.region = regions.id
        LEFT JOIN loans ON loans.groupid = groups.id   
        AND loans.date
        >= DATE_TRUNC('month', current_timestamp) - ${add}::interval AND loans.date <
        DATE_TRUNC('month', current_timestamp)  GROUP BY users.name, users.id ORDER BY users.id`;

      individualDisbursedLastMonthPromise = await sql`SELECT
        COALESCE(SUM(CASE WHEN individuals_loans.status = 'approved' 
        OR individuals_loans.status = 'inactive' THEN individuals_loans.amount ELSE 0 END), 0) as sum,
        users.name as region_manager, 
        users.id 
        FROM users 
        LEFT JOIN regions ON regions.manager = users.id 
        LEFT JOIN individuals ON individuals.region = regions.id
        LEFT JOIN individuals_loans ON individuals_loans.loanee = individuals.id   
        AND individuals_loans.created
        >= DATE_TRUNC('month', current_timestamp) - ${add}::interval AND individuals_loans.created <
        DATE_TRUNC('month', current_timestamp)  GROUP BY users.name, users.id ORDER BY users.id`;

      groupCollectedLastMonthPromise = await sql`
        SELECT
          gp.id,
          gp.name,
          COALESCE(sums.total, 0) as sum
        FROM users gp
          LEFT JOIN LATERAL (
          SELECT SUM(CASE WHEN mpesainvoice.cycle <> 0
          THEN mpesainvoice.transamount ELSE 0 END) as total
          FROM regions
          JOIN groups ON groups.region = regions.id
          JOIN mpesainvoice ON mpesainvoice.refnumber % groups.name
          WHERE regions.manager = gp.id
          AND SIMILARITY(groups.name, refnumber) >= 0.7
          AND mpesainvoice.transtime
          >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${add}::interval AND mpesainvoice.transtime <
          DATE_TRUNC(${timePeriod}, current_timestamp)
          ) sums ON true ORDER BY gp.id
      `;

      individualCollectedLastMonthPromise = await sql`
        SELECT
          gp.id,
          gp.name,
          COALESCE(sums.total, 0) as sum
        FROM users gp
          LEFT JOIN LATERAL (
          SELECT SUM(CASE WHEN mpesainvoice.cycle <> 0
          THEN mpesainvoice.transamount ELSE 0 END) as total
          FROM regions
          JOIN individuals ON individuals.region = regions.id
          JOIN mpesainvoice ON mpesainvoice.refnumber % individuals.idnumber::TEXT
          WHERE regions.manager = gp.id
          AND SIMILARITY(individuals.idnumber::TEXT, mpesainvoice.refnumber) >= 0.7
          AND mpesainvoice.transtime
          >= DATE_TRUNC(${timePeriod}, current_timestamp) - ${add}::interval AND mpesainvoice.transtime <
          DATE_TRUNC(${timePeriod}, current_timestamp)
          ) sums ON true ORDER BY gp.id;
      `;
    }

    return Array.from(
      { length: groupDisbursedPromise.length },
      (_, index: number) => {
        const group_payment = Number(groupCollectedPromise[index]?.sum);
        const individuals_paid = Number(individualCollectedPromise[index]?.sum);
        const individual_paid_las_month = Number(
          individualCollectedLastMonthPromise[index]?.sum,
        );
        const manager = String(
          groupDisbursedPromise[index].region_manager,
        ).toUpperCase();
        const disbursed =
          Number(groupDisbursedPromise[index]?.sum) +
          Number(individualDisbursedPromise[index]?.sum);
        const loan =
          Number(groupLoanPromise[index]?.sum) +
          Number(individualLoanPromise[index]?.sum);
        const paid =
          Number(groupCollectedPromise[index]?.sum) +
          Number(individualCollectedPromise[index]?.sum);
        const interest =
          Number(groupLoanPromise[index]?.sum) +
          Number(individualLoanPromise[index]?.sum) -
          (Number(groupDisbursedPromise[index]?.sum) +
            Number(individualDisbursedPromise[index]?.sum));
        const disbursement_last_month =
          groupDisbursedLastMonthPromise?.length > 0
            ? Number(groupDisbursedLastMonthPromise[index]?.sum) +
              Number(individualDisbursedLastMonthPromise[index]?.sum)
            : 0;
        const paid_last_month =
          groupDisbursedLastMonthPromise?.length > 0
            ? Number(groupCollectedLastMonthPromise[index]?.sum) +
              Number(individualCollectedLastMonthPromise[index]?.sum)
            : 0;
        const paid_growth =
          groupDisbursedLastMonthPromise.length > 0
            ? getGrowthRate(paid, paid_last_month)
            : 0;
        const disbursement_growth =
          groupDisbursedLastMonthPromise.length > 0
            ? getGrowthRate(disbursed, disbursement_last_month)
            : 0;
        const is_growth = groupDisbursedLastMonthPromise.length > 0;

        const user_id = groupDisbursedPromise[index].id;
        return {
          user_id,
          manager,
          disbursed,
          loan,
          paid,
          interest,
          disbursement_last_month,
          paid_last_month,
          paid_growth,
          disbursement_growth,
          is_growth,
          group_payment,
          individuals_paid,
          individual_paid_las_month,
        };
      },
    );
  } catch (error) {
    console.error(error);
  }
}
