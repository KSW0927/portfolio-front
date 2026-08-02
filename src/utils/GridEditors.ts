/**
 * Grid 에디터 공통 - Tabulator
 * 기본 제공 :
 * - Input : {title:"Example", field:"example", editor:"input", editorParams: { mask:"AAA-999", selectContent:true, search:true, elementAttributes:{maxlength:"10"}}}
 * - Textarea : {title:"Example", field:"example", editor:"textarea", editorParams: { mask:"AAA-999", selectContent:true, verticalNavigation:"editor", shiftEnterSubmit:true, elementAttributes:{maxlength:"10"}}}
 * - Number : {title:"Example", field:"example", editor:"number", editorParams: { mask:"999", selectContent:true, verticalNavigation:"table", min:0, max:100, step:10, elementAttributes:{maxlength:"10"}}}
 * - Range : {title:"Example", field:"example", editor:"range", editorParams: { min:0, max:100, step:10, elementAttributes:{maxlength:"10"}}}
 * - Checkbox : {title:"Example", field:"example", editor:"tickCross", editorParams: { trueValue:"car", falseValue:"bike", tristate:true, indeterminateValue:"n/a", elementAttributes:{maxlength:"10"} }}
 * - Star Rating : {title:"Example", field:"example", editor:"star", editorParams: { elementAttributes:{maxlength:"10"} }}
 * - Progress Bar : {title:"Example", field:"example", editor:"progress", editorParams: { min:0, max:100, elementAttributes:{title:"slide bar to choose option"} }}
 * - Date(이용 시 luxon.js 라이브러리 추가 필요, 미사용 예정) : {title:"Example", field:"example", editor:"date", editorParams: { min:"2026.01.01", max:"2026.12.31", format:"yyyy.MM.dd", verticalNavigation:"table", elementAttributes:{title:"slide bar to choose option"} }}
 * - Time(이용 시 luxon.js 라이브러리 추가 필요, 미사용 예정) : {title:"Example", field:"example", editor:"time", editorParams: { format:"hh:mm:ss", verticalNavigation:"table", elementAttributes:{title:"slide bar to choose option"} }}
 * - Date Time(이용 시 luxon.js 라이브러리 추가 필요, 미사용 예정) : {title:"Example", field:"example", editor:"datetime", editorParams: { format:"yyyy.MM.dd HH:mm:ss", verticalNavigation:"table", elementAttributes:{title:"slide bar to choose option"} }}
 * - List(Select/Autocomplate) : {title:"Example", field:"example", editor:"list", editorParams: {
 *      values:["red", "green", "orange"],
 *      valuesURL: "https://example.com",
 *      valueLookup: "actvie",
 *      valuesLookupField: "color",
 *      clearable: true,
 *      sort: "asc",
 *      defaultValue: "Steve Johnson",
 *      emptyValue:null,
 *      maxWidth:true,
 *      placeholderLoading:"Loading List...",
 *      placeholderEmpty:"No Results Found",
 *      multiselect:true,
 *      autocomplate:true,
 *      allowEmpty: true,
 *      listOnEmpty: true,
 *      verticalNavigation:"hybrid",
 *      elementAttributes:{maxlength:"10"}
 *   }}
 * - Adaptable : {title:"Example", field:"example", editor:"adaptable"}
 */



