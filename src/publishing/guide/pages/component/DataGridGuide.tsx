import { useRef, useState } from "react";
import { type ColDef, type ColGroupDef } from "ag-grid-community";
import { DataGrid, Space, type DataGridHandle } from "@/publishing/components";
import { Button } from "@/publishing/components/common/Button";
import { Input } from "@/publishing/components/common/Input";
import { TextCellEditor, TextareaCellEditor, SelectCellEditor, DateCellEditor } from "@/publishing/components/DataGridCellEditors";
import CodeBlock from "../../layout/CodeBlock";

const HeaderGroupWithSearch = () => {
    const [value, setValue] = useState("");
    return (
        <Space size="sm">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClear={() => setValue("")}
            />
            <Button size="sm" variant="solid">환율 적용</Button>
        </Space>
    );
};

const sampleColumns: ColDef[] = [
    { field: "id", headerName: "ID", maxWidth: 80 },
    { field: "name", headerName: "이름" },
    { field: "artist", headerName: "아티스트" },
    { field: "type", headerName: "종류" },
    { field: "release", headerName: "출시일시" },
    { field: "genre", headerName: "장르" },
    { field: "price", headerName: "가격" },
    { field: "totalCount", headerName: "전체 수" },
    { field: "downloadCount", headerName: "다운로드 수" },
    { field: "listenCount", headerName: "청취 수" },
];

const sampleColumns2: ColDef[] = [
    { field: "id", headerName: "ID", maxWidth: 80 },
    { field: "name", headerName: "이름", sortable: true, resizable: true },
    { field: "artist", headerName: "아티스트", sortable: true },
    { field: "type", headerName: "종류" },
    { field: "release", headerName: "출시일시" },
    { field: "genre", headerName: "장르" },
    { field: "price", headerName: "가격" },
    { field: "totalCount", headerName: "전체 수" },
    { field: "downloadCount", headerName: "다운로드 수" },
    { field: "listenCount", headerName: "청취 수" },
];

const sampleComplexColumns: (ColDef | ColGroupDef)[] = [
    { field: "id", headerName: "ID" },
    {
        headerName: "Basic",
        headerGroupComponent: HeaderGroupWithSearch,
        children: [
            { field: "name", headerName: "이름" },
            { field: "artist", headerName: "아티스트" },
        ],
    },
    {
        headerName: "Extra",
        headerGroupComponent: HeaderGroupWithSearch,
        children: [
            { field: "type", headerName: "종류" },
            { field: "release", headerName: "출시일시" },
            { field: "genre", headerName: "장르" },
        ],
    },
    { field: "price", headerName: "가격" },
    {
        headerName: "Count",
        children: [
            { field: "totalCount", headerName: "전체 수", columnGroupShow: "closed" },
            { field: "downloadCount", headerName: "다운로드 수", columnGroupShow: "open" },
            { field: "listenCount", headerName: "청취 수", columnGroupShow: "open" },
        ],
    },
];

const sampleEditColumns: ColDef[] = [
    { field: "id", headerName: "ID", maxWidth: 80 },
    { field: "name", headerName: "이름", editable: true, cellEditor: TextCellEditor, cellEditorParams: { maxLength: 100 } },
    { field: "artist", headerName: "아티스트", editable: true, cellEditor: SelectCellEditor, cellEditorParams: { values: [{ value: "artist1", label: "Artist 1" }, { value: "Maronn5", label: "Maroon 5" }, { value: "Honne", label: "Honne" }] } },
    { field: "type", headerName: "종류", editable: true, cellEditor: TextareaCellEditor, cellEditorParams: { maxLength: 200 } },
    { field: "release", headerName: "출시일시", editable: true, cellEditor: DateCellEditor, cellEditorParams: { min: "2025-01-01", max: "2030-12-31" } },
    { field: "genre", headerName: "장르" },
    { field: "price", headerName: "가격" },
    { field: "totalCount", headerName: "전체 수" },
    { field: "downloadCount", headerName: "다운로드 수" },
    { field: "listenCount", headerName: "청취 수" },
];

const sampleData = [
    { id: 1, name: "Moves Like", artist: "artist1", type: "Deluxe", release: "2022.01.01", genre: "Pop", price: "10", totalCount: "1453", downloadCount: "1000", listenCount: "453" },
    { id: 2, name: "Warm On", artist: "Maronn5", type: "Single", release: "2023.12.31", genre: "Pop,Rock", price: "100", totalCount: "1453", downloadCount: "100", listenCount: "345" },
    { id: 3, name: "Bush", artist: "Honne", type: "EP", release: "2024.09.29", genre: "Jazz", price: "10000", totalCount: "1453", downloadCount: "5030", listenCount: "23" },
    { id: 4, name: "Beautiful Lies", artist: "Daft Punk", type: "Single", release: "2026.03.25", genre: "Hiphop", price: "1000", totalCount: "1453", downloadCount: "5020", listenCount: "217" },
    { id: 5, name: "Dance Monkey", artist: "Tones and I", type: "Single", release: "2026.03.25", genre: "Hiphop", price: "10000", totalCount: "1453", downloadCount: "5020642", listenCount: "2178" },
    { id: 6, name: "Moves Like2", artist: "artist1", type: "Deluxe", release: "2022.01.01", genre: "Pop", price: "10", totalCount: "1453", downloadCount: "10", listenCount: "500" },
    { id: 7, name: "Warm On2", artist: "Maronn5", type: "Single", release: "2023.12.31", genre: "Pop,Rock", price: "100", totalCount: "1453", downloadCount: "100", listenCount: "3456" },
    { id: 8, name: "Bush2", artist: "Honne", type: "EP", release: "2024.09.29", genre: "Jazz", price: "10000", totalCount: "1453", downloadCount: "5030", listenCount: "2350" },
    { id: 9, name: "Beautiful Lies2", artist: "Daft Punk", type: "Single", release: "2026.03.25", genre: "Hiphop", price: "1000", totalCount: "1453", downloadCount: "502", listenCount: "2178" },
    { id: 10, name: "Dance Monkey2", artist: "Tones and I", type: "Single", release: "2026.03.25", genre: "Hiphop", price: "10000", totalCount: "1453", downloadCount: "5020", listenCount: "21" },
    { id: 11, name: "Moves Like", artist: "artist1", type: "Deluxe", release: "2022.01.01", genre: "Pop", price: "10", totalCount: "1453", downloadCount: "1000", listenCount: "453" },
    { id: 12, name: "Warm On", artist: "Maronn5", type: "Single", release: "2023.12.31", genre: "Pop,Rock", price: "100", totalCount: "1453", downloadCount: "100", listenCount: "345" },
    { id: 13, name: "Bush", artist: "Honne", type: "EP", release: "2024.09.29", genre: "Jazz", price: "10000", totalCount: "1453", downloadCount: "5030", listenCount: "23" },
    { id: 14, name: "Beautiful Lies", artist: "Daft Punk", type: "Single", release: "2026.03.25", genre: "Hiphop", price: "1000", totalCount: "1453", downloadCount: "5020", listenCount: "217" },
    { id: 15, name: "Dance Monkey", artist: "Tones and I", type: "Single", release: "2026.03.25", genre: "Hiphop", price: "10000", totalCount: "1453", downloadCount: "5020642", listenCount: "2178" },
];

export default function DataGridGuide() {
    const gridRef = useRef<DataGridHandle>(null);
    const gridSortRef = useRef<DataGridHandle>(null);
    const gridPageRef = useRef<DataGridHandle>(null);
    const gridComplexRef = useRef<DataGridHandle>(null);
    const gridNumberRef = useRef<DataGridHandle>(null);
    const gridCheckRef = useRef<DataGridHandle>(null);
    const gridEditRef = useRef<DataGridHandle>(null);

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">DataGrid (데이터 그리드)</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        AG Grid를 기반으로 커스텀된 공통 데이터 그리드 컴포넌트입니다.
                        상단 총 건수, 페이지 사이즈 선택, 커스텀 렌더러 등 다양한 기능을 지원합니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">1. 기본 그리드 (Basic)</h3>
                        <div className="comp-preview">
                            <DataGrid tref={gridRef} columns={sampleColumns} rowData={sampleData} totalExtras={[{ title: "안읽음", value: "00", unit: "건" }]} />
                        </div>
                        <CodeBlock isComponent={true} code={`<DataGrid columns={columns} rowData={data} totalExtras={[{ title: "안읽음", value: "00", unit: "건" }]} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">2. 정렬 그리드 (Sortable / Resizable)</h3>
                        <p className="guide-desc">컬럼 정의(<code>ColDef</code>)에 <code>sortable: true, resizable: true</code> 속성을 추가한 케이스입니다.</p>
                        <div className="comp-preview">
                            <DataGrid tref={gridSortRef} columns={sampleColumns2} rowData={sampleData} />
                        </div>
                        <CodeBlock isComponent={true} code={`const columns = [
  { field: "name", sortable: true, resizable: true },
  { field: "artist", sortable: true },
];

<DataGrid columns={columns} rowData={data} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">3. 페이징 그리드 (Paging)</h3>
                        <div className="comp-preview">
                            <DataGrid tref={gridPageRef} columns={sampleColumns} rowData={sampleData} pageSize={10} />
                        </div>
                        <CodeBlock isComponent={true} code={`<DataGrid columns={columns} rowData={data} pageSize={10} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">4. 다중 헤더 그리드 (Complex)</h3>
                        <div className="comp-preview">
                            <DataGrid tref={gridComplexRef} columns={sampleComplexColumns} rowData={sampleData} />
                        </div>
                        <CodeBlock isComponent={true} code={`const columns = [
  { field: "id", headerName: "ID" },
  {
    headerName: "Basic",
    children: [
      { field: "name", headerName: "이름" },
      { field: "artist", headerName: "아티스트" },
    ],
  },
];

<DataGrid columns={columns} rowData={data} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">5. 행번호 그리드 (Row Numbers)</h3>
                        <div className="comp-preview">
                            <DataGrid tref={gridNumberRef} columns={sampleColumns} rowData={sampleData} isRowNumber={true} />
                        </div>
                        <CodeBlock isComponent={true} code={`<DataGrid columns={columns} rowData={data} isRowNumber={true} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">6. 체크박스 그리드 (Row Selection)</h3>
                        <div className="comp-preview">
                            <DataGrid tref={gridCheckRef} columns={sampleColumns} rowData={sampleData} isRowSelection={true} />
                        </div>
                        <CodeBlock isComponent={true} code={`<DataGrid columns={columns} rowData={data} isRowSelection={true} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">7. Edit 그리드 (Editable)</h3>
                        <p className="guide-desc">셀을 클릭하여 직접 데이터를 수정할 수 있는 에디터 모드입니다. (Text, Select, Date 등)</p>
                        <div className="comp-preview">
                            <DataGrid tref={gridEditRef} columns={sampleEditColumns} rowData={sampleData} />
                        </div>
                        <CodeBlock isComponent={true} code={`const columns = [
  { field: "name", editable: true, cellEditor: TextCellEditor, cellEditorParams: { maxLength: 100 } },
  // values: 문자열 배열 또는 { value, label } 객체 배열 모두 사용 가능
  { field: "artist", editable: true, cellEditor: SelectCellEditor, cellEditorParams: { values: [{ value: "A", label: "Artist A" }, { value: "B", label: "Artist B" }] } },
  { field: "release", editable: true, cellEditor: DateCellEditor, cellEditorParams: { min: "2025-01-01", max: "2030-12-31" } },
  { field: "type", editable: true, cellEditor: TextareaCellEditor, cellEditorParams: { maxLength: 200 } },
];

<DataGrid columns={columns} rowData={data} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">8. 무한 스크롤 그리드 (Infinite Scroll)</h3>
                        <p className="guide-desc">상단 건수/페이지 사이즈 선택, 하단 페이지네이션 없이 고정 높이 영역 안에서 스크롤로 모든 데이터를 탐색합니다.</p>
                        <div className="comp-preview">
                            <DataGrid columns={sampleColumns} rowData={sampleData} infiniteScroll={true} />
                        </div>
                        <CodeBlock isComponent={true} code={`<DataGrid columns={columns} rowData={data} infiniteScroll={true} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Prop</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>columns</code></td>
                                        <td className="guide-td"><code>(ColDef | ColGroupDef)[]</code></td>
                                        <td className="guide-td"><strong>Required</strong></td>
                                        <td className="guide-td">그리드의 컬럼 설정 배열입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>rowData</code></td>
                                        <td className="guide-td"><code>any[]</code></td>
                                        <td className="guide-td"><code>[]</code></td>
                                        <td className="guide-td">그리드에 출력할 데이터 배열입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>pageSize</code></td>
                                        <td className="guide-td"><code>number</code></td>
                                        <td className="guide-td"><code>10</code></td>
                                        <td className="guide-td">페이지당 표시할 목록 개수 (10 / 20 / 50 선택 가능).</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>isRowSelection</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">체크박스를 통한 다중 선택 모드 사용 여부.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>isRowNumber</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">좌측 행 번호 노출 여부.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>totalCount</code></td>
                                        <td className="guide-td"><code>number</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">상단에 노출될 전체 건수. 미입력 시 rowData 길이로 자동 표시됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>totalLabel</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">총 건수 앞에 표시할 접두 텍스트. (예: "게시글" → "게시글 총 00건")</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>topRightButtons</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">상단 우측에 렌더링할 커스텀 버튼 영역입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>rowDragManaged</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">드래그 앤 드롭으로 행 순서를 변경할 수 있게 합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>infiniteScroll</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">상단 헤더(건수/페이지 사이즈)와 하단 페이지네이션을 숨기고, 고정 높이 영역에서 스크롤로 전체 데이터를 표시합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>showHeader</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>infiniteScroll</code> 모드에서도 총 건수 및 페이지 사이즈 헤더를 표시합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>footerData</code></td>
                                        <td className="guide-td"><code>unknown[]</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">그리드 하단에 고정(pinned) 표시할 footer 행 데이터 배열입니다. (예: 합계 행)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>initialSort</code></td>
                                        <td className="guide-td"><code>{`{ column: string; dir: "asc" | "desc" }[]`}</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">그리드 초기 정렬 상태를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>getRowClass</code></td>
                                        <td className="guide-td"><code>(params: RowClassParams) =&gt; string | string[]</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">각 행에 커스텀 CSS 클래스를 동적으로 적용하는 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onRowDragEnd</code></td>
                                        <td className="guide-td"><code>(rows: unknown[]) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><code>rowDragManaged</code> 사용 시 드래그로 행 순서 변경 후 재정렬된 전체 데이터를 전달하는 콜백입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
