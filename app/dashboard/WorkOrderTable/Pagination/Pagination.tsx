import React, { useMemo } from 'react';

import PaginationBtn from '@/app/dashboard/WorkOrderTable/Pagination/PaginationBtn';

interface WorkOrderPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => void;
  activeClass?: string;
  maxPaginationSize?: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  activeClass,
  maxPaginationSize = 7,
  canGoPrevious,
  canGoNext,
  handleNextPage,
  handlePreviousPage,
}: WorkOrderPaginationProps) => {
  if (maxPaginationSize % 2 === 0)
    throw new Error('maxPaginationSize should be odd number');
  let paginationArr: Array<{ label: string; page: number }> = [];

  if (maxPaginationSize >= totalPages) {
    for (let i = 0; i < totalPages; i++) {
      paginationArr[i] = { label: `${i + 1}`, page: i + 1 };
    }
  } else {
    paginationArr = Array.from({ length: maxPaginationSize });
    paginationArr[0] = { label: '1', page: 1 };
    paginationArr[paginationArr.length - 1] = {
      label: `${totalPages}`,
      page: totalPages,
    };

    const leftPivotPoint = maxPaginationSize - 2;
    const rightPivotPoint = totalPages - maxPaginationSize + 3;

    if (currentPage < leftPivotPoint) {
      // ... last 2 positions are filled with ..., totalPage number
      for (let i = 1; i <= maxPaginationSize - 3; i++) {
        paginationArr[i] = { label: `${i + 1}`, page: i + 1 };
      }
      paginationArr[paginationArr.length - 2] = {
        label: '...',
        page: Math.floor((totalPages + currentPage) / 2),
      };
    } else if (
      leftPivotPoint <= currentPage + 1 &&
      !(currentPage >= rightPivotPoint - 1)
    ) {
      paginationArr[1] = { label: '...', page: Math.ceil(currentPage / 2) };
      let pointer = Math.floor((maxPaginationSize - 4) / 2) * -1;
      for (let i = 2; i < maxPaginationSize - 2; i++) {
        // tops 2 positions are filled with 1, ... & last 2 positions is filled with ..., totalPage number
        const num = currentPage + 1 + pointer;
        paginationArr[i] = { label: `${num}`, page: num };
        pointer++;
      }
      paginationArr[paginationArr.length - 2] = {
        label: '...',
        page: Math.floor((totalPages + currentPage) / 2),
      };
    } else if (totalPages - (currentPage + 1) <= rightPivotPoint + 1) {
      paginationArr[1] = { label: '...', page: Math.ceil(currentPage / 2) };
      const startPoint = totalPages - maxPaginationSize;
      for (let i = 2; i <= maxPaginationSize - 2; i++) {
        // top 2 positions are filled with 1 & ... and last 2 positions is filled with last page
        paginationArr[i] = {
          label: `${startPoint + i + 1}`,
          page: startPoint + i + 1,
        };
      }
    }
  }

  return (
    <div className="join">
      <button
        className="btn join-item rounded-none border-slate-300 bg-white font-semibold text-slate-700"
        onClick={handlePreviousPage}
        disabled={!canGoPrevious}
      >
        «
      </button>
      {paginationArr.map((pageInfo, index) => (
        <PaginationBtn
          key={index}
          isActive={
            pageInfo.label !== '...' && pageInfo.page - 1 === currentPage
          }
          onClick={() => onPageChange(pageInfo.page - 1)}
          activeClass={activeClass}
        >
          {pageInfo.label}
        </PaginationBtn>
      ))}
      <button
        className="btn join-item rounded-none border-slate-300 bg-white font-semibold text-slate-700"
        onClick={handleNextPage}
        disabled={!canGoNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;

// CHAT GPT 3.5 code
/*
 let startPage =    - 3;
  let endPage = currentPage + 3;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, 7);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 6);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const renderPaginationButtons = () => {
    const buttons = [];

    if (startPage > 1) {
      buttons.push(
        <PaginationBtn activeClass={activeClass} isActive={0 === currentPage} key="first" onClick={() => onPageChange(0)}>1</PaginationBtn>,
        <PaginationBtn isActive={false} key="ellipsis1">...</PaginationBtn>
      );
    }

    pages.forEach(page => {
      buttons.push(
        <PaginationBtn
          key={page}
          onClick={() => onPageChange(page - 1)}
          isActive={(page - 1) === currentPage}
          activeClass={activeClass}
        >
          {page}
        </PaginationBtn>
      );
    });

    if (endPage < totalPages) {
      buttons.push(
        <PaginationBtn isActive={false} key="ellipsis2">...</PaginationBtn >,
        <PaginationBtn 
          isActive={(totalPages - 1) === currentPage} 
          activeClass={activeClass} 
          key="last" 
          onClick={() => onPageChange(totalPages - 1)}
        >
          {totalPages}
        </PaginationBtn>
      );
    }

    return buttons;
  };

  return (
    <>
      {renderPaginationButtons()}
    </>
  );
*/
