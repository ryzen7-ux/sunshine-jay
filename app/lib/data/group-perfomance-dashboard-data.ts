import sql from "@/app/lib/db";

export async function fetchGroupDisbursement(regions: any): Promise<void> {
  try {
    const disbursement: any = await sql`SELECT 
            gp.name,
            COALESCE(SUM(CASE WHEN loans.cycle = groupz.max_cycle  AND (loans.status = 'approved'
            OR loans.status = 'inactive') THEN loans.amount ELSE 0 END), 0) AS latest_disbursement,
            COALESCE(SUM(CASE WHEN loans.cycle <> 0  AND (loans.status = 'approved'
            OR loans.status = 'inactive') THEN loans.amount ELSE 0 END), 0) AS total_disbursement
            FROM groups gp
            LEFT JOIN  (SELECT COALESCE(MAX(loans.cycle), 0) AS max_cycle, 
            groups.id AS group_id
            FROM groups 
            JOIN loans ON loans.groupid = groups.id
            GROUP BY group_id
            ) groupz 
            ON groupz.group_id = gp.id
            LEFT JOIN loans ON loans.groupid = groupz.group_id
            WHERE gp.region = ANY(${regions})
            GROUP BY gp.name, groupz.max_cycle
            ORDER BY total_disbursement DESC
             
    `;

    return disbursement;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchGroupPaid(regions: any): Promise<void> {
  try {
    const groupCollectedPromise: any = await sql`
      SELECT
        gp.id,
        gp.name,
        sums.max_cycle,
        COALESCE(SUM(CASE WHEN mpesainvoice.cycle <> 0 
        THEN mpesainvoice.transamount ELSE 0 END), 0) as total_paid,
        COALESCE(SUM(CASE WHEN mpesainvoice.cycle <> 0 AND mpesainvoice.cycle = sums.max_cycle 
        THEN mpesainvoice.transamount ELSE 0 END), 0) AS latest_paid
      FROM groups gp
        LEFT JOIN  (
        SELECT 
        MAX(loans.cycle) AS max_cycle,
        groups.id
        FROM groups
        JOIN loans ON loans.groupid = groups.id
        GROUP BY  groups.id
        ) sums ON gp.id = sums.id
      LEFT JOIN mpesainvoice ON mpesainvoice.refnumber % gp.name
      AND SIMILARITY(mpesainvoice.refnumber, gp.name) >= 0.7
      WHERE gp.region = ANY(${regions})
      GROUP BY gp.id,gp.name, max_cycle
      ORDER BY total_paid DESC
    `;

    return groupCollectedPromise;
  } catch (error) {
    console.error(error);
  }
}
