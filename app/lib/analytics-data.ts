import sql from "./db";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getLastFourMonthsIndexes() {
  const monthIndexes = [];
  const currentDate = new Date(); // Get the current date

  // Loop from the current month (i=0) to three months ago (i=3)
  for (let i = 0; i < 5; i++) {
    // Create a new Date object in each iteration to avoid modifying the original date for subsequent calculations
    const date = new Date(currentDate);
    // Set the month to the correct past month.
    // JavaScript's setMonth handles negative values by wrapping to the previous year.
    date.setMonth(date.getMonth() - i);

    // Get the zero-based month index
    const monthIndex = date.getMonth();

    // Add to the beginning of the array so the result is ordered chronologically (oldest to newest)
    // or to the end for reverse chronological order (newest to oldest)
    monthIndexes.unshift(monthIndex);
  }

  return monthIndexes;
}

function getIndex(arr: any, num: any) {
  const index = arr?.indexOf(num);
  return index;
}

export async function fethcDashboarChartData(region: any) {
  try {
    const groupDisbursment = await sql`SELECT 
    TO_CHAR(gs.month_start_date, 'MM') AS month,
    COALESCE(SUM(ot.amount), 0) AS total_amount,
    COALESCE(SUM(CEIL(CEIL(ot.amount / term + amount * (interest/4/100)) * term)), 0) as total_loan
FROM 
    GENERATE_SERIES(
        DATE_TRUNC('month', NOW() - INTERVAL '4 months'), 
        DATE_TRUNC('month', NOW()), 
        '1 month'::interval
    ) AS gs(month_start_date)
LEFT JOIN 
    loans ot ON DATE_TRUNC('month', ot.date) = gs.month_start_date
JOIN groups ON ot.groupid = groups.id JOIN regions ON regions.id
        = groups.region
WHERE regions.id = ANY(${region})
GROUP BY 
    gs.month_start_date
ORDER BY 
    gs.month_start_date`;

    const individualDisbursement = await sql`SELECT 
    TO_CHAR(gs.month_start_date, 'MM') AS month,
    COALESCE(SUM(ot.amount), 0) AS total_amount,
    COALESCE(SUM(CEIL(CEIL(ot.amount / term + amount * (interest/4/100)) * term)), 0) as total_loan
FROM 
    GENERATE_SERIES(
        DATE_TRUNC('month', NOW() - INTERVAL '4 months'), 
        DATE_TRUNC('month', NOW()), 
        '1 month'::interval
    ) AS gs(month_start_date)
LEFT JOIN 
    individuals_loans ot ON DATE_TRUNC('month', ot.created) = gs.month_start_date
JOIN individuals ON ot.loanee = individuals.id JOIN regions ON regions.id
        = individuals.region
WHERE regions.id = ANY(${region})
GROUP BY 
    gs.month_start_date
ORDER BY 
    gs.month_start_date`;

    const paid = await sql`SELECT 
    TO_CHAR(gs.month_start_date, 'MM') AS month,
    COALESCE(SUM(ot.transamount), 0) AS total_amount
   
FROM 
    GENERATE_SERIES(
        DATE_TRUNC('month', NOW() - INTERVAL '4 months'), 
        DATE_TRUNC('month', NOW()), 
        '1 month'::interval
    ) AS gs(month_start_date)
LEFT JOIN 
    mpesainvoice ot ON DATE_TRUNC('month', ot.transtime) = gs.month_start_date
JOIN groups
       ON ot.refnumber % groups.name JOIN regions ON regions.id =
      groups.region WHERE  SIMILARITY(groups.name, ot.refnumber) >= 0.7 AND
      regions.id = ANY(${region}) AND ot.cycle !=0
GROUP BY 
    gs.month_start_date
ORDER BY 
    gs.month_start_date`;

    const individual_paid = await sql`SELECT 
    TO_CHAR(gs.month_start_date, 'MM') AS month,
    COALESCE(SUM(ot.transamount), 0) AS total_amount
   
FROM 
    GENERATE_SERIES(
        DATE_TRUNC('month', NOW() - INTERVAL '4 months'), 
        DATE_TRUNC('month', NOW()), 
        '1 month'::interval
    ) AS gs(month_start_date)
LEFT JOIN 
    mpesainvoice ot ON DATE_TRUNC('month', ot.transtime) = gs.month_start_date
JOIN 
      individuals ON LOWER(individuals.idnumber::TEXT) % 
      ot.refnumber 
JOIN 
      regions ON regions.id = individuals.region 
WHERE 
      SIMILARITY(LOWER(individuals.idnumber::TEXT), LOWER(ot.refnumber))
      >= 0.7 AND regions.id = ANY(${region}) AND cycle !=0
GROUP BY 
    gs.month_start_date
ORDER BY 
    gs.month_start_date`;

    const last_five_months = getLastFourMonthsIndexes();
    const individuals_months = individualDisbursement.map(
      (item: any) => Number(item?.month) - 1,
    );
    const groups_months = groupDisbursment.map(
      (item: any) => Number(item?.month) - 1,
    );
    const paid_months = paid.map((item: any) => Number(item?.month) - 1);
    const paid_individuals_months = individual_paid.map(
      (item: any) => Number(item?.month) - 1,
    );

    const series = last_five_months.map((item: any, index: number) => {
      const includes_group = groups_months.includes(item);
      const includes_individual = individuals_months.includes(item);
      const includes_paid = paid_months.includes(item);
      const includes_individual_paid = paid_individuals_months.includes(item);
      const group_disbursed = includes_group
        ? groupDisbursment[getIndex(groups_months, item)]?.total_amount
        : 0;
      const individual_disbursed = includes_individual
        ? individualDisbursement[getIndex(individuals_months, item)]
            ?.total_amount
        : 0;
      const group_loan = includes_group
        ? groupDisbursment[getIndex(groups_months, item)]?.total_loan
        : 0;
      const individual_loan = includes_individual
        ? individualDisbursement[getIndex(individuals_months, item)]?.total_loan
        : 0;
      const paid_amount = includes_paid
        ? paid[getIndex(paid_months, item)]?.total_amount
        : 0;

      const paid_individual_amount = includes_individual_paid
        ? individual_paid[getIndex(paid_individuals_months, item)]?.total_amount
        : 0;
      return {
        month: months[item],

        disbursed: Number(group_disbursed) + Number(individual_disbursed),
        loan: Number(group_loan) + Number(individual_loan),
        paid: Number(paid_amount) + Number(paid_individual_amount),
      };
    });

    console.log(series);
    return series;
  } catch (error) {
    console.log(error);
  }
}
