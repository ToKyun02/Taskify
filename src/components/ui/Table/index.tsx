import { ColgroupHTMLAttributes, ColHTMLAttributes, createContext, HTMLAttributes, PropsWithChildren, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, useContext } from 'react';
import { cn } from '@/utils/helper';

interface TableContextProps {
  responsive: boolean;
}
const TableContext = createContext<TableContextProps | null>(null);

const useTable = () => {
  const ctx = useContext(TableContext);

  if (!ctx) {
    throw new Error('table context는 table provider 내부에서 사용해주세요');
  }
  return ctx;
};

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  responsive?: boolean;
}

export function Table({ responsive = false, className, children, ...props }: TableProps) {
  return (
    <TableContext.Provider value={{ responsive }}>
      <table className={cn('w-full table-fixed', className)} {...props}>
        {children}
      </table>
    </TableContext.Provider>
  );
}

export function TableColGroup({ className, children, ...props }: PropsWithChildren<ColgroupHTMLAttributes<HTMLTableColElement>>) {
  const { responsive } = useTable();

  return (
    <colgroup className={cn(responsive && 'hidden md:table-column-group', className)} {...props}>
      {children}
    </colgroup>
  );
}

export function TableCol({ className, ...props }: ColHTMLAttributes<HTMLTableColElement>) {
  return <col className={cn(className)} {...props} />;
}

export function TableHead({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  const { responsive } = useTable();

  return (
    <thead className={cn(responsive && 'hidden md:table-header-group', className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return (
    <tbody className={cn('divide-y divide-gray-300', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableHeadCell({ className, children, ...props }: PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>) {
  return (
    <th className={cn('text-left font-normal text-gray-40', className)} {...props}>
      {children}
    </th>
  );
}

export function TableRow({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) {
  const { responsive } = useTable();

  return (
    <tr className={cn(responsive && 'block py-4 md:table-row md:py-0', className)} {...props}>
      {children}
    </tr>
  );
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  label?: string;
}

export function TableCell({ className, label, children, ...props }: TableCellProps) {
  const { responsive } = useTable();

  return (
    <td className={cn('break-words py-5', responsive && 'flex w-full py-2 md:table-cell md:py-5', className)} {...props}>
      {responsive && label && <span className='block w-[4em] font-normal text-gray-40 md:hidden'>{label}</span>}
      {children}
    </td>
  );
}
