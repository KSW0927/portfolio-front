import styled from './TableGrid.module.css'

type props = {
  total? : number;
  listCount? : number;
}

function TableCaption({ total, listCount }: props ) {
  return (
    <>
      <div className={styled.tableCaption}>
        <dl className={styled.total}>
          <dt>총</dt>
          <dd>{total}건</dd>
        </dl>
        <dl className={styled.listNum}>
          <dt>목록 표시 개수</dt>
          <dd>{listCount}개</dd>
        </dl>
      </div>
    </>
  );
}

export default TableCaption;
