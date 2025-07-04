import { Table, TableBody } from "../../ui/table"
import { NotDataRow } from "../NotDataRow"
import { DamageTableHeader } from "./DamageTableHeader"

export const DamageTable = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <DamageTableHeader />
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            <NotDataRow colSpan={5} message="No hay tickets registrados" />
          </TableBody>
        </Table>
      </div>
    </div>
  )
}